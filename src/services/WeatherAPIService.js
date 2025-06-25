import { API_CONFIG } from '../constants/constants';

/**
 * Weather API Service Class
 * Implements Singleton pattern and follows OOP principles
 * Now uses secure proxy endpoints instead of direct API calls
 */
class WeatherAPIService {
  constructor() {
    if (WeatherAPIService.instance) {
      return WeatherAPIService.instance;
    }
    
    this.baseUrl = API_CONFIG.BASE_URL;
    this.cache = new Map();
    this.cacheTimeout = 300000; // 5 minutes
    
    WeatherAPIService.instance = this;
    return this;
  }

  /**
   * Private method to build URL with parameters for proxy endpoints
   * @param {string} endpoint 
   * @param {object} params 
   * @returns {string}
   */
  _buildUrl(endpoint, params = {}) {
    const url = new URL(this.baseUrl + endpoint, window.location.origin);
    
    // Add parameters (API key is handled by the proxy)
    Object.entries({ ...API_CONFIG.DEFAULT_PARAMS, ...params }).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, value);
      }
    });
    
    return url.toString();
  }

  /**
   * Private method to check cache
   * @param {string} cacheKey 
   * @returns {object|null}
   */
  _getFromCache(cacheKey) {
    const cached = this.cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.data;
    }
    return null;
  }

  /**
   * Private method to set cache
   * @param {string} cacheKey 
   * @param {object} data 
   */
  _setCache(cacheKey, data) {
    this.cache.set(cacheKey, {
      data,
      timestamp: Date.now()
    });
  }

  /**
   * Private method to make HTTP requests
   * @param {string} url 
   * @returns {Promise<object>}
   */
  async _makeRequest(url) {
    const response = await fetch(url);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error?.message || 
        `HTTPS ${response.status}: ${response.statusText}`
      );
    }
    
    return response.json();
  }

  /**
   * Get current weather for a location
   * @param {string} location 
   * @returns {Promise<object>}
   */
  async getCurrentWeather(location) {
    const cacheKey = `current_${location}`;
    
    // Check cache first
    const cachedData = this._getFromCache(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    try {
      const url = this._buildUrl(API_CONFIG.ENDPOINTS.CURRENT, { q: location });
      const data = await this._makeRequest(url);
      
      // Cache the result
      this._setCache(cacheKey, data);
      
      return data;
    } catch (error) {
      console.error('Weather API Error:', error);
      throw error;
    }
  }

  /**
   * Get weather forecast for a location
   * @param {string} location 
   * @param {number} days Number of forecast days (1-14)
   * @returns {Promise<object>}
   */
  async getForecast(location, days = 7) {
    const cacheKey = `forecast_${location}_${days}`;
    
    // Check cache first
    const cachedData = this._getFromCache(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    try {
      const url = this._buildUrl(API_CONFIG.ENDPOINTS.FORECAST, { 
        q: location, 
        days: days 
      });
      const data = await this._makeRequest(url);
      
      // Cache the result
      this._setCache(cacheKey, data);
      
      return data;
    } catch (error) {
      console.error('Weather Forecast API Error:', error);
      throw error;
    }
  }

  /**
   * Search for locations
   * @param {string} query 
   * @returns {Promise<Array>}
   */
  async searchLocations(query) {
    if (!query || query.trim().length < 2) {
      return [];
    }

    try {
      const url = this._buildUrl(API_CONFIG.ENDPOINTS.SEARCH, { q: query.trim() });
      const data = await this._makeRequest(url);
      
      return data || [];
    } catch (error) {
      console.error('Location Search Error:', error);
      throw error;
    }
  }
}

// Export singleton instance
const weatherAPIService = new WeatherAPIService();
export default weatherAPIService;
