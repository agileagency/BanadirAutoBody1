/**
 * Banadir Main Integration Service
 * 
 * This service provides methods to interact with the Banadir Main centralized system,
 * including authentication, data synchronization, and API calls.
 */

import { INTEGRATION_CONFIG, getEndpointUrl } from './banadirMainConfig';

/**
 * Types for the Banadir Main integration
 */
export interface AuthCredentials {
  token: string;
  refreshToken: string;
  expiresAt: number;
}

export interface AppointmentData {
  id?: string;
  customerId: string;
  serviceType: string;
  date: string;
  time: string;
  notes?: string;
  status?: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}

export interface CustomerData {
  id?: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  vehicles?: VehicleData[];
}

export interface VehicleData {
  id?: string;
  make: string;
  model: string;
  year: number;
  vin?: string;
  licensePlate?: string;
}

export interface ServiceRecord {
  id: string;
  vehicleId: string;
  serviceDate: string;
  serviceType: string;
  description: string;
  cost: number;
  parts?: string[];
  technician?: string;
}

// Create custom fetcher for Banadir Main API
const fetchFromMainSystem = async <T>(
  url: string, 
  options: RequestInit = {}
): Promise<T> => {
  const response = await fetch(url, options);
  
  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`);
  }
  
  return response.json() as Promise<T>;
};

/**
 * Main service class for interacting with Banadir Main
 */
class BanadirMainService {
  private authToken: string | null = null;
  private authExpiration: number = 0;

  /**
   * Initialize the service with an optional auth token
   */
  constructor(initialToken?: string) {
    if (initialToken) {
      this.authToken = initialToken;
      // Set a temporary expiration 1 hour from now
      this.authExpiration = Date.now() + 3600000;
    }

    // Try to load token from localStorage
    this.loadAuthFromStorage();
  }

  /**
   * Load authentication info from localStorage if available
   */
  private loadAuthFromStorage(): void {
    try {
      const storedAuth = localStorage.getItem('banadir_main_auth');
      if (storedAuth) {
        const parsedAuth: AuthCredentials = JSON.parse(storedAuth);
        if (parsedAuth.expiresAt > Date.now()) {
          this.authToken = parsedAuth.token;
          this.authExpiration = parsedAuth.expiresAt;
        } else {
          // Token expired, remove it
          localStorage.removeItem('banadir_main_auth');
        }
      }
    } catch (error) {
      console.error('Error loading auth from storage:', error);
    }
  }

  /**
   * Save authentication info to localStorage
   */
  private saveAuthToStorage(auth: AuthCredentials): void {
    try {
      localStorage.setItem('banadir_main_auth', JSON.stringify(auth));
    } catch (error) {
      console.error('Error saving auth to storage:', error);
    }
  }

  /**
   * Check if the user is authenticated with the main system
   */
  isAuthenticated(): boolean {
    return !!this.authToken && this.authExpiration > Date.now();
  }

  /**
   * Authenticate with the Banadir Main system
   */
  async authenticate(username: string, password: string): Promise<boolean> {
    try {
      const authData = await fetchFromMainSystem<AuthCredentials>(getEndpointUrl('auth'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          username, 
          password, 
          applicationId: INTEGRATION_CONFIG.applicationId 
        })
      });

      if (authData && authData.token) {
        this.authToken = authData.token;
        this.authExpiration = authData.expiresAt;
        this.saveAuthToStorage(authData);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Authentication error:', error);
      return false;
    }
  }

  /**
   * Create or update a customer in the central system
   */
  async syncCustomer(customerData: CustomerData): Promise<CustomerData | null> {
    if (!this.isAuthenticated()) {
      throw new Error('Authentication required');
    }

    try {
      return await fetchFromMainSystem<CustomerData>(getEndpointUrl('customers'), {
        method: customerData.id ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.authToken}`
        },
        body: JSON.stringify(customerData)
      });
    } catch (error) {
      console.error('Error syncing customer:', error);
      return null;
    }
  }

  /**
   * Create a new appointment in the central system
   */
  async createAppointment(appointment: AppointmentData): Promise<AppointmentData | null> {
    if (!this.isAuthenticated()) {
      throw new Error('Authentication required');
    }

    try {
      return await fetchFromMainSystem<AppointmentData>(getEndpointUrl('appointments'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.authToken}`
        },
        body: JSON.stringify(appointment)
      });
    } catch (error) {
      console.error('Error creating appointment:', error);
      return null;
    }
  }

  /**
   * Get customer service history from the central system
   */
  async getServiceHistory(customerId: string): Promise<ServiceRecord[]> {
    if (!this.isAuthenticated()) {
      throw new Error('Authentication required');
    }

    try {
      return await fetchFromMainSystem<ServiceRecord[]>(
        `${getEndpointUrl('serviceHistory')}/${customerId}`, 
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${this.authToken}`
          }
        }
      );
    } catch (error) {
      console.error('Error fetching service history:', error);
      return [];
    }
  }

  /**
   * Sync all local data with the central system
   */
  async syncAll(): Promise<boolean> {
    if (!this.isAuthenticated()) {
      throw new Error('Authentication required');
    }

    try {
      await fetchFromMainSystem(getEndpointUrl('sync'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.authToken}`
        }
      });
      
      return true;
    } catch (error) {
      console.error('Error syncing data:', error);
      return false;
    }
  }
  
  /**
   * Log out from the centralized system
   */
  logout(): void {
    this.authToken = null;
    this.authExpiration = 0;
    localStorage.removeItem('banadir_main_auth');
  }
}

// Export a singleton instance
export const banadirMain = new BanadirMainService();