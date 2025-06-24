import { API_CONFIG, API_KEY } from '../constants/constants';

/**
 * Weather API Service Class
 * Implements Singleton pattern and follows OOP principles
 */
class WeatherAPIService {
  constructor() {
    if (WeatherAPIService.instance) {
      return WeatherAPIService.instance;
    }
    
    this.baseUrl = API_CONFIG.BASE_URL;
    this.apiKey = API_KEY;
    this.cache = new Map();
    this.cacheTimeout = 1000; // 5 minutes
    
    WeatherAPIService.instance = this;
    return this;
  }

  /**
   * Private method to build URL with parameters
   * @param {string} endpoint 
   * @param {object} params 
   * @returns {string}
   */
  _buildUrl(endpoint, params = {}) {
    const url = new URL(this.baseUrl + endpoint);
    
    // Add API key
    url.searchParams.append('key', this.apiKey);
    
    // Add other parameters
    Object.entries({ ...API_CONFIG.DEFAULT_PARAMS, ...params }).forEach(([key, value]) => {
      url.searchParams.append(key, value);
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
}

// Export singleton instance
export default new WeatherAPIService();
