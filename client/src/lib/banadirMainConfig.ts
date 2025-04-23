/**
 * Banadir Main Integration Configuration
 * 
 * This file contains configuration settings for connecting to the Banadir Main
 * centralized system. Update the API_BASE_URL to point to the correct environment.
 */

// Base URL for the Banadir Main centralized system API
export const MAIN_SYSTEM_API_URL = process.env.NODE_ENV === 'production'
  ? 'https://api.banadirmain.com/v1'
  : 'https://staging-api.banadirmain.com/v1';

// Integration settings
export const INTEGRATION_CONFIG = {
  // Unique identifier for this application within the Banadir Main ecosystem
  applicationId: 'auto-repair-site',
  
  // Integration version
  version: '1.0.0',
  
  // Default endpoints
  endpoints: {
    auth: '/auth',
    customers: '/customers',
    appointments: '/appointments',
    serviceHistory: '/service-history',
    inventory: '/inventory',
    sync: '/sync'
  },
  
  // Default request timeout in milliseconds
  requestTimeout: 10000,
  
  // Feature flags for integration
  features: {
    sharedAuth: true,
    centralizedAppointments: true,
    serviceHistorySync: true,
    inventoryCheck: false,
    customerPortalAccess: true
  }
};

// Utility functions for building API URLs
export const getEndpointUrl = (endpoint: keyof typeof INTEGRATION_CONFIG.endpoints): string => {
  return `${MAIN_SYSTEM_API_URL}${INTEGRATION_CONFIG.endpoints[endpoint]}`;
};