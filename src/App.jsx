import { WeatherCard, LoadingSpinner, ErrorDisplay, SearchBar, HourlyForecastChart, DailyForecastSummary } from './components';
import { useWeatherData } from './hooks/useWeatherData';
import { APP_CONFIG } from './constants/constants';
import './App.css';

function App() {
  const { 
    weatherData, 
    forecastData,
    loading, 
    error, 
    currentLocation,
    refreshWeatherData,
    changeLocation
  } = useWeatherData();

  // Handle location selection from search
  const handleLocationSelect = (location) => {
    // Create location query string that the API expects
    const locationQuery = `${location.name}, ${location.country}`;
    changeLocation(locationQuery);
  };

  return (
    <div className="app">
      <div className="app__container">
        <header className="app__header">
          <h1 className="app__title">{APP_CONFIG.NAME}</h1>
          <p className="app__subtitle">
            Current Weather in {weatherData?.location?.name || currentLocation}
          </p>
        </header>

        <div className="app__search-section">
          <SearchBar onLocationSelect={handleLocationSelect} />
        </div>

        <main className="app__main">
          {loading && (
            <div className="app__loading">
              <LoadingSpinner 
                message="Fetching latest weather data..." 
                size="large"
              />
            </div>
          )}

          {error && (
            <div className="app__error">
              <ErrorDisplay 
                error={error}
                onRetry={refreshWeatherData}
              />
            </div>
          )}

          {!loading && !error && weatherData && (
            <div className="app__weather-content">
              <div className="app__weather-card">
                <WeatherCard weatherData={weatherData} />
              </div>
              <div className="app__daily-forecast">
                <DailyForecastSummary forecastData={forecastData} />
              </div>
              <div className="app__hourly-forecast">
                <HourlyForecastChart forecastData={forecastData} />
              </div>
            </div>
          )}
        </main>

        <footer className="app__footer">
          <p className="app__footer-text">
            Powered by{' '}
            <a 
              href="https://www.weatherapi.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="app__footer-link"
            >
              WeatherAPI.com
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
