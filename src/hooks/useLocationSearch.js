import { useState, useCallback, useRef } from 'react';
import WeatherAPIService from '../services/WeatherAPIService';

/**
 * Custom hook for location search functionality
 */
export const useLocationSearch = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const debounceRef = useRef(null);

  const searchLocations = useCallback(async (query) => {
    // Clear previous debounce
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // Clear results if query is too short
    if (!query || query.trim().length < 2) {
      setSearchResults([]);
      setSearchError(null);
      return;
    }

    // Debounce the search
    debounceRef.current = setTimeout(async () => {
      try {
        setIsSearching(true);
        setSearchError(null);
        
        const results = await WeatherAPIService.searchLocations(query);
        setSearchResults(results);
      } catch (error) {
        setSearchError(error.message || 'Failed to search locations');
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 300); // 300ms debounce delay
  }, []);

  const clearSearch = useCallback(() => {
    setSearchResults([]);
    setSearchError(null);
    setIsSearching(false);
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
  }, []);

  return {
    searchResults,
    isSearching,
    searchError,
    searchLocations,
    clearSearch
  };
};
