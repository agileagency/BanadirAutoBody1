/**
 * Banadir Main System Integration
 * 
 * This module provides server-side integration with the Banadir Main centralized system.
 * It handles data synchronization between the local database and the main system.
 */

import { db } from './db';
import { eq, and, desc } from 'drizzle-orm';
import { 
  contactSubmissions, 
  users, 
  mainAppointments, 
  mainServiceHistory, 
  systemConfig 
} from '../shared/schema';
import type { 
  ContactSubmission, 
  User, 
  MainAppointment, 
  MainServiceHistory 
} from '../shared/schema';
import fetch from 'node-fetch';

// Default configuration
const DEFAULT_CONFIG = {
  apiUrl: 'https://api.banadirmain.com/v1',
  apiVersion: '1.0.0',
  applicationId: 'auto-repair-site',
  syncInterval: 30, // minutes
  featuresEnabled: true
};

/**
 * Get system configuration from database
 */
async function getSystemConfig(key: string): Promise<string | null> {
  try {
    const [config] = await db
      .select({ value: systemConfig.configValue })
      .from(systemConfig)
      .where(eq(systemConfig.configKey, key));
    
    return config?.value || null;
  } catch (error) {
    console.error(`Error fetching config for ${key}:`, error);
    return null;
  }
}

/**
 * Set system configuration in database
 */
async function setSystemConfig(key: string, value: string): Promise<void> {
  try {
    await db
      .insert(systemConfig)
      .values({
        configKey: key,
        configValue: value,
        lastUpdated: new Date()
      })
      .onConflictDoUpdate({
        target: systemConfig.configKey,
        set: {
          configValue: value,
          lastUpdated: new Date()
        }
      });
  } catch (error) {
    console.error(`Error setting config for ${key}:`, error);
  }
}

/**
 * Get the configured API URL for the main system
 */
async function getApiUrl(): Promise<string> {
  const url = await getSystemConfig('main_system_api_url');
  return url || DEFAULT_CONFIG.apiUrl;
}

/**
 * Get the full URL for a specific API endpoint
 */
async function getEndpointUrl(endpoint: string): Promise<string> {
  const baseUrl = await getApiUrl();
  return `${baseUrl}${endpoint}`;
}

/**
 * Check if integration features are enabled
 */
async function isIntegrationEnabled(): Promise<boolean> {
  const enabled = await getSystemConfig('main_system_features_enabled');
  return enabled === 'true' || DEFAULT_CONFIG.featuresEnabled;
}

/**
 * Fetch data from the Banadir Main system API
 */
async function fetchFromMainSystem<T>(
  endpoint: string,
  options: any = {}
): Promise<T> {
  const url = await getEndpointUrl(endpoint);
  const response = await fetch(url, options);
  
  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`);
  }
  
  return response.json() as Promise<T>;
}

/**
 * Synchronize contact submissions with Banadir Main
 */
export async function syncContactSubmissions(): Promise<number> {
  if (!await isIntegrationEnabled()) {
    return 0;
  }
  
  try {
    // Get submissions that haven't been synced
    const submissions = await db
      .select()
      .from(contactSubmissions)
      .where(eq(contactSubmissions.syncedWithMain, false))
      .limit(100);
    
    if (submissions.length === 0) {
      return 0;
    }
    
    // Get API credentials
    const apiKey = await getSystemConfig('main_system_api_key');
    if (!apiKey) {
      throw new Error('API key not configured for Banadir Main');
    }
    
    let syncCount = 0;
    for (const submission of submissions) {
      try {
        // Format data for main system
        const submissionData = {
          name: submission.name,
          email: submission.email,
          phone: submission.phone,
          service: submission.service,
          vehicle: submission.vehicle,
          message: submission.message || '',
          insuranceHelp: submission.insuranceHelp,
          createdAt: submission.createdAt.toISOString(),
          source: 'website'
        };
        
        // Send to main system
        const response = await fetchFromMainSystem<{ id: string }>('/leads', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify(submissionData)
        });
        
        // Update local record with main system ID
        if (response && response.id) {
          await db
            .update(contactSubmissions)
            .set({
              syncedWithMain: true,
              mainSystemId: response.id
            })
            .where(eq(contactSubmissions.id, submission.id));
          
          syncCount++;
        }
      } catch (error) {
        console.error(`Error syncing submission ${submission.id}:`, error);
      }
    }
    
    return syncCount;
  } catch (error) {
    console.error('Error in syncContactSubmissions:', error);
    return 0;
  }
}

/**
 * Retrieve appointments from Banadir Main
 */
export async function fetchAppointments(): Promise<number> {
  if (!await isIntegrationEnabled()) {
    return 0;
  }
  
  try {
    // Get the last sync timestamp
    const lastSyncConfig = await getSystemConfig('last_appointment_sync');
    const lastSync = lastSyncConfig ? new Date(lastSyncConfig) : new Date(0);
    
    // Get API credentials
    const apiKey = await getSystemConfig('main_system_api_key');
    if (!apiKey) {
      throw new Error('API key not configured for Banadir Main');
    }
    
    // Fetch appointments from main system
    const appointments = await fetchFromMainSystem<any[]>('/appointments', {
      headers: {
        'Authorization': `Bearer ${apiKey}`
      }
    });
    
    if (!appointments || !Array.isArray(appointments)) {
      return 0;
    }
    
    let importCount = 0;
    for (const appointment of appointments) {
      try {
        // Check if we already have this appointment
        const [existingAppointment] = await db
          .select()
          .from(mainAppointments)
          .where(eq(mainAppointments.mainAppointmentId, appointment.id));
        
        if (existingAppointment) {
          // Update existing appointment
          await db
            .update(mainAppointments)
            .set({
              customerName: appointment.customer.name,
              customerPhone: appointment.customer.phone,
              appointmentDate: new Date(appointment.date),
              serviceType: appointment.serviceType,
              vehicleInfo: appointment.vehicle,
              notes: appointment.notes,
              status: appointment.status,
              lastSynced: new Date()
            })
            .where(eq(mainAppointments.mainAppointmentId, appointment.id));
        } else {
          // Insert new appointment
          await db
            .insert(mainAppointments)
            .values({
              mainAppointmentId: appointment.id,
              customerName: appointment.customer.name,
              customerPhone: appointment.customer.phone,
              appointmentDate: new Date(appointment.date),
              serviceType: appointment.serviceType,
              vehicleInfo: appointment.vehicle,
              notes: appointment.notes,
              status: appointment.status,
              lastSynced: new Date()
            });
        }
        
        importCount++;
      } catch (error) {
        console.error(`Error processing appointment ${appointment.id}:`, error);
      }
    }
    
    // Update last sync timestamp
    await setSystemConfig('last_appointment_sync', new Date().toISOString());
    
    return importCount;
  } catch (error) {
    console.error('Error in fetchAppointments:', error);
    return 0;
  }
}

/**
 * Run a complete sync with Banadir Main
 */
export async function runCompleteSync(): Promise<{
  contactsSync: number;
  appointmentsSync: number;
}> {
  const contactsSync = await syncContactSubmissions();
  const appointmentsSync = await fetchAppointments();
  
  return {
    contactsSync,
    appointmentsSync
  };
}

/**
 * Initialize the Banadir Main integration
 */
export async function initializeBanadirMain(): Promise<void> {
  try {
    // Create default configuration if it doesn't exist
    const configs = [
      { key: 'main_system_api_url', value: DEFAULT_CONFIG.apiUrl },
      { key: 'main_system_api_version', value: DEFAULT_CONFIG.apiVersion },
      { key: 'main_system_app_id', value: DEFAULT_CONFIG.applicationId },
      { key: 'main_system_sync_interval', value: String(DEFAULT_CONFIG.syncInterval) },
      { key: 'main_system_features_enabled', value: String(DEFAULT_CONFIG.featuresEnabled) }
    ];
    
    for (const config of configs) {
      const existingValue = await getSystemConfig(config.key);
      if (!existingValue) {
        await setSystemConfig(config.key, config.value);
      }
    }
    
    console.log('Banadir Main integration initialized successfully');
  } catch (error) {
    console.error('Error initializing Banadir Main integration:', error);
  }
}