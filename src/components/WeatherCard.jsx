import React from 'react';
import { 
  formatWindSpeed, 
  formatDateTime, 
  getUVDescription, 
  formatHumidity, 
  formatIconUrl 
} from '../utils/weatherUtils';
import { getWeatherIcon, DEFAULT_ICON_PROPS } from '../utils/iconUtils';
import './WeatherCard.css';

const WeatherCard = ({ weatherData, className = '' }) => {
  if (!weatherData) {
    return null;
  }

  const { location, current } = weatherData;

  return (
    <div className={`weather-card${className ? ` ${className}` : ''}`}>
      <div className="weather-card__header">
        <div className="weather-card__location">
          <h2 className="weather-card__city">
            {location.name}, {location.country}
          </h2>
          <p className="weather-card__last-updated">
            Last updated: {formatDateTime(current.last_updated)}
          </p>
        </div>
      </div>

      <div className="weather-card__main">
        <div className="weather-card__temperature">
          <span className="weather-card__temp-value">
            {Math.round(current.temp_c)}°C
          </span>
          <span className="weather-card__temp-fahrenheit">
            ({Math.round(current.temp_f)}°F)
          </span>
          <span className="weather-card__feels-like">
            Feels like {Math.round(current.feelslike_c)}°C
          </span>
        </div>
        
        <div className="weather-card__condition">
          <img 
            src={formatIconUrl(current.condition.icon)} 
            alt={current.condition.text}
            className="weather-card__icon"
          />
          <p className="weather-card__condition-text">
            {current.condition.text}
          </p>
        </div>
      </div>

      <div className="weather-card__details">
        <WeatherDetailItem 
          label="Humidity" 
          value={formatHumidity(current.humidity)}
          iconType="humidity"
        />
        <WeatherDetailItem 
          label="Wind Speed" 
          value={formatWindSpeed(current.wind_kph, current.wind_dir)}
          iconType="wind"
        />
        <WeatherDetailItem 
          label="UV Index" 
          value={`${current.uv} (${getUVDescription(current.uv)})`}
          iconType="uv"
        />
        <WeatherDetailItem 
          label="Visibility" 
          value={`${current.vis_km} km`}
          iconType="visibility"
        />
      </div>
    </div>
  );
};

/**
 * Weather Detail Item Component
 * Component for displaying weather metrics
 */
const WeatherDetailItem = ({ label, value, iconType }) => (
  <div className="weather-detail-item">
    <div className="weather-detail-item__header">
      <span className="weather-detail-item__icon">
        {getWeatherIcon(iconType, DEFAULT_ICON_PROPS)}
      </span>
      <span className="weather-detail-item__label">{label}</span>
    </div>
    <span className="weather-detail-item__value">{value}</span>
  </div>
);

export default WeatherCard;
