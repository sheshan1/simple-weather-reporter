export const APP_CONFIG = {
  NAME: 'Weather Reporter',
  VERSION: '1.0.0',
  REFRESH_INTERVAL: 300000, // 5 minutes
};

export const API_CONFIG = {
  BASE_URL: 'https://api.weatherapi.com/v1',
  ENDPOINTS: {
    CURRENT: '/current.json'
  },
  DEFAULT_PARAMS: {
    aqi: 'no'
  }
};

export const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

export const DEFAULT_LOCATION = 'Colombo';

