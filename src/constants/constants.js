export const APP_CONFIG = {
  NAME: 'Weather Reporter',
  VERSION: '1.0.0',
  REFRESH_INTERVAL: 300000, // 5 minutes
};

export const API_CONFIG = {
  BASE_URL: '/api/weather',
  ENDPOINTS: {
    CURRENT: '?endpoint=current',
    FORECAST: '?endpoint=forecast',
    SEARCH: '?endpoint=search'
  },
  DEFAULT_PARAMS: {
    aqi: 'no'
  }
};

// API key is now handled securely on the server side
export const API_KEY = null;

export const DEFAULT_LOCATION = 'Colombo';

