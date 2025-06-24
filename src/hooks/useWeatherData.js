import { useState, useEffect, useCallback } from 'react';
import WeatherAPIService from '../services/WeatherAPIService';
import { DEFAULT_LOCATION } from '../constants/constants';
import { retryWithBackoff } from '../utils/helpers';

/**
 * Custom hook for managing weather data
 * Implements proper separation of concerns and state management
 * @param {string} initialLocation 
 * @returns {object}
 */
export const useWeatherData = (initialLocation = DEFAULT_LOCATION) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(initialLocation);


  // Fetch weather data with retry logic
  const fetchWeatherData = useCallback(async (targetLocation = currentLocation) => {
    try {
      setLoading(true);
      setError(null);

      const data = await retryWithBackoff(
        () => WeatherAPIService.getCurrentWeather(targetLocation),
        3,
        1000
      );

      setWeatherData(data);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err.message || 'Failed to fetch weather data');
      console.error('Weather fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [currentLocation]);

  // Refresh weather data
  const refreshWeatherData = useCallback(() => {
    fetchWeatherData();
  }, [fetchWeatherData]);

  // Change location and fetch weather data
  const changeLocation = useCallback((locationQuery) => {
    setCurrentLocation(locationQuery);
    fetchWeatherData(locationQuery);
  }, [fetchWeatherData]);

  // Initial data fetch
  useEffect(() => {
    fetchWeatherData();
  }, [fetchWeatherData]);

  // Auto-refresh data every 5 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      if (!loading && !error) {
        fetchWeatherData();
      }
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(interval);
  }, [fetchWeatherData, loading, error]);

  return {
    weatherData,
    loading,
    error,
    lastUpdated,
    currentLocation,
    refreshWeatherData,
    fetchWeatherData,
    changeLocation
  };
};
