import { WeatherCard, LoadingSpinner, ErrorDisplay } from './components';
import { useWeatherData } from './hooks/useWeatherData';
import { APP_CONFIG } from './constants/constants';
import './App.css';

function App() {
  const { 
    weatherData, 
    loading, 
    error, 
    refreshWeatherData 
  } = useWeatherData();

  return (
    <div className="app">
      <div className="app__container">
        <header className="app__header">
          <h1 className="app__title">{APP_CONFIG.NAME}</h1>
          <p className="app__subtitle">Current Weather in Colombo</p>
        </header>

        <main className="app__main">
          {loading && (
            <LoadingSpinner 
              message="Fetching latest weather data..." 
              size="large"
            />
          )}

          {error && (
            <ErrorDisplay 
              error={error}
              onRetry={refreshWeatherData}
            />
          )}

          {!loading && !error && weatherData && (
            <WeatherCard weatherData={weatherData} />
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
