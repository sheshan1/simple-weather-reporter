import React from 'react';
import { formatIconUrl } from '../utils/weatherUtils';
import { getWeatherIcon, DEFAULT_ICON_PROPS } from '../utils/iconUtils';
import './DailyForecastSummary.css';

const DailyForecastSummary = ({ forecastData, className = '' }) => {
  if (!forecastData?.forecast?.forecastday) {
    return null;
  }

  const forecastDays = forecastData.forecast.forecastday;

  const getDayLabel = (dateString, index) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  };

  return (
    <div className={`daily-forecast-summary ${className}`}>
      <h3 className="daily-forecast-summary__title">
        {getWeatherIcon('forecast', { ...DEFAULT_ICON_PROPS, size: 18 })}
        7-Day Forecast
      </h3>
      
      <div className="daily-forecast-summary__days">
        {forecastDays.map((day, index) => (
          <DayCard 
            key={day.date}
            day={day}
            label={getDayLabel(day.date, index)}
            isToday={index === 0}
          />
        ))}
      </div>
    </div>
  );
};

const DayCard = ({ day, label, isToday }) => {
  return (
    <div className={`day-card ${isToday ? 'day-card--today' : ''}`}>
      <div className="day-card__day">
        {label}
      </div>
      
      <div className="day-card__weather">
        <img 
          src={formatIconUrl(day.day.condition.icon)}
          alt={day.day.condition.text}
          className="day-card__icon"
          title={day.day.condition.text}
        />
        
        <div className="day-card__temps">
          <span className="day-card__high">{Math.round(day.day.maxtemp_c)}°</span>
          <span className="day-card__low">{Math.round(day.day.mintemp_c)}°</span>
        </div>
      </div>
      
      {day.day.daily_chance_of_rain > 10 && (
        <div className="day-card__rain">
          {getWeatherIcon('rain', { size: 12, color: '#4A90E2' })}
          <span>{day.day.daily_chance_of_rain}%</span>
        </div>
      )}
    </div>
  );
};

export default DailyForecastSummary;
