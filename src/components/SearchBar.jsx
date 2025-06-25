import { useState, useRef, useEffect } from 'react';
import { useLocationSearch } from '../hooks/useLocationSearch';
import { getWeatherIcon, DEFAULT_ICON_PROPS } from '../utils/iconUtils';
import './SearchBar.css';

const SearchBar = ({ onLocationSelect, className = '' }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchInputRef = useRef(null);
  const suggestionsRef = useRef(null);

  const {
    searchResults,
    isSearching,
    searchError,
    searchLocations,
    clearSearch
  } = useLocationSearch();

  // Handle input change and trigger search
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    searchLocations(value);
    setShowSuggestions(true);
  };

  // Handle location selection
  const handleLocationSelect = (location) => {
    setSearchQuery(`${location.name}, ${location.country}`);
    setShowSuggestions(false);
    clearSearch();
    onLocationSelect(location);
  };

  // Handle clear search
  const handleClearSearch = () => {
    setSearchQuery('');
    setShowSuggestions(false);
    clearSearch();
    searchInputRef.current?.focus();
  };

  // Handle key navigation
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setShowSuggestions(false);
      searchInputRef.current?.blur();
    }
  };

  // Handle clicks outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target) &&
        !searchInputRef.current?.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`search-bar${className ? ` ${className}` : ''}`}>
      <div className="search-bar__input-container">
        <div className="search-bar__input-wrapper">
          <span className="search-bar__search-icon">
            {getWeatherIcon('search', { ...DEFAULT_ICON_PROPS, size: 18 })}
          </span>
          
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => searchQuery && setShowSuggestions(true)}
            placeholder="Search for a city..."
            className="search-bar__input"
            autoComplete="off"
          />

          {searchQuery && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="search-bar__clear-button"
              aria-label="Clear search"
            >
              {getWeatherIcon('close', { ...DEFAULT_ICON_PROPS, size: 16 })}
            </button>
          )}
        </div>

        {isSearching && (
          <div className="search-bar__loading">
            {getWeatherIcon('loading', { 
              ...DEFAULT_ICON_PROPS, 
              size: 16, 
              className: 'search-bar__loading-icon' 
            })}
          </div>
        )}
      </div>

      {/* Search Results Dropdown */}
      {showSuggestions && (searchResults.length > 0 || searchError) && (
        <div ref={suggestionsRef} className="search-bar__suggestions">
          {searchError && (
            <div className="search-bar__error">
              {getWeatherIcon('error', { ...DEFAULT_ICON_PROPS, size: 16 })}
              <span>{searchError}</span>
            </div>
          )}

          {searchResults.length > 0 && (
            <ul className="search-bar__results">
              {searchResults.map((location, index) => (
                <li key={`${location.id}-${index}`} className="search-bar__result-item">
                  <button
                    type="button"
                    onClick={() => handleLocationSelect(location)}
                    className="search-bar__result-button"
                  >
                    <span className="search-bar__result-icon">
                      {getWeatherIcon('location', { ...DEFAULT_ICON_PROPS, size: 16 })}
                    </span>
                    <div className="search-bar__result-content">
                      <span className="search-bar__result-name">
                        {location.name}
                      </span>
                      <span className="search-bar__result-country">
                        {location.region ? `${location.region}, ` : ''}{location.country}
                      </span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}

          {searchResults.length === 0 && !searchError && searchQuery.length >= 2 && !isSearching && (
            <div className="search-bar__no-results">
              {getWeatherIcon('search', { ...DEFAULT_ICON_PROPS, size: 16 })}
              <span>No locations found for "{searchQuery}"</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
