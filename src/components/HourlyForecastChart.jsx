import React, { useState, useEffect, useRef } from 'react';
import { formatIconUrl } from '../utils/weatherUtils';
import { getWeatherIcon, DEFAULT_ICON_PROPS } from '../utils/iconUtils';
import './HourlyForecastChart.css';

const HourlyForecastChart = ({ forecastData, className = '' }) => {
  // All hooks at the top level - BEFORE any conditional logic
  const [selectedDay, setSelectedDay] = useState(0);
  const [currentHourIndex, setCurrentHourIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const scrollTimeoutRef = useRef(null);
  const containerRef = useRef(null);

  // Get computed values first
  const forecastDays = forecastData?.forecast?.forecastday || [];
  const currentTime = new Date();
  const currentHourOfDay = currentTime.getHours();

  // Get day labels function
  const getDayLabel = (dayIndex) => {
    if (!forecastDays[dayIndex]) return 'N/A';
    const date = new Date(forecastDays[dayIndex].date);
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  };

  // Get hours for selected day function
  const getHoursForDay = (dayIndex) => {
    const day = forecastDays[dayIndex];
    if (!day?.hour) return [];

    // For today, show only remaining hours
    if (dayIndex === 0) {
      return day.hour.filter((hour) => {
        const hourTime = new Date(hour.time);
        return hourTime.getHours() >= currentHourOfDay;
      });
    }

    // For other days, show ALL 24 hours
    return day.hour;
  };

  const selectedDayHours = getHoursForDay(selectedDay);

  // All useEffect hooks must be here, before any early returns
  useEffect(() => {
    setCurrentHourIndex(0);
  }, [selectedDay]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isAnimating || !isHovered) return;
      
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        setIsAnimating(true);
        setCurrentHourIndex(prev => prev > 0 ? prev - 1 : prev);
        setTimeout(() => setIsAnimating(false), 400);
      } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        setIsAnimating(true);
        setCurrentHourIndex(prev => 
          prev < selectedDayHours.length - 1 ? prev + 1 : prev
        );
        setTimeout(() => setIsAnimating(false), 400);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAnimating, selectedDayHours.length, isHovered]);

  // Global wheel event listener to capture scroll when hovering
  useEffect(() => {
    const handleGlobalWheel = (e) => {
      if (!isHovered || isAnimating || selectedDayHours.length === 0) return;
      
      // Check if the scroll event is within our component
      const container = containerRef.current;
      if (!container) return;
      
      const rect = container.getBoundingClientRect();
      const isWithinComponent = 
        e.clientX >= rect.left && 
        e.clientX <= rect.right && 
        e.clientY >= rect.top && 
        e.clientY <= rect.bottom;
      
      if (!isWithinComponent) return;
      
      e.preventDefault();
      e.stopPropagation();
      
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      setIsAnimating(true);

      if (e.deltaY > 0) {
        setCurrentHourIndex(prev => 
          prev < selectedDayHours.length - 1 ? prev + 1 : prev
        );
      } else {
        setCurrentHourIndex(prev => prev > 0 ? prev - 1 : prev);
      }

      scrollTimeoutRef.current = setTimeout(() => {
        setIsAnimating(false);
      }, 400);
    };

    // Add passive: false to allow preventDefault
    document.addEventListener('wheel', handleGlobalWheel, { passive: false });
    return () => document.removeEventListener('wheel', handleGlobalWheel);
  }, [isHovered, isAnimating, selectedDayHours.length]);

  // Event handlers
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientY);
  };

  const handleTouchMove = (e) => {
    if (!touchStart || isAnimating) return;
    
    const touchEnd = e.touches[0].clientY;
    const diff = touchStart - touchEnd;
    
    if (Math.abs(diff) > 50) {
      setIsAnimating(true);
      
      if (diff > 0) {
        setCurrentHourIndex(prev => 
          prev < selectedDayHours.length - 1 ? prev + 1 : prev
        );
      } else {
        setCurrentHourIndex(prev => prev > 0 ? prev - 1 : prev);
      }
      
      setTouchStart(null);
      
      setTimeout(() => {
        setIsAnimating(false);
      }, 400);
    }
  };

  // NOW we can do early returns after all hooks
  if (!forecastData?.forecast?.forecastday) {
    return null;
  }

  if (selectedDayHours.length === 0) {
    return (
      <div className={`hourly-forecast ${className}`}>
        <div className="hourly-forecast__header">
          <h3 className="hourly-forecast__title">
            {getWeatherIcon('forecast', { ...DEFAULT_ICON_PROPS, size: 18 })}
            Hourly Forecast
          </h3>
          <div className="hourly-forecast__day-tabs">
            {forecastDays.map((day, index) => (
              <button
                key={index}
                className={`hourly-forecast__day-tab ${selectedDay === index ? 'hourly-forecast__day-tab--active' : ''}`}
                onClick={() => setSelectedDay(index)}
              >
                {getDayLabel(index)}
              </button>
            ))}
          </div>
        </div>
        <div className="hourly-forecast__empty">
          <p>No forecast data available for this day</p>
        </div>
      </div>
    );
  }

  const currentHour = selectedDayHours[currentHourIndex];
  const nextHour = selectedDayHours[currentHourIndex + 1];
  const prevHour = selectedDayHours[currentHourIndex - 1];

  return (
    <div className={`hourly-forecast ${className}`}>
      <div className="hourly-forecast__header">
        <h3 className="hourly-forecast__title">
          {getWeatherIcon('forecast', { ...DEFAULT_ICON_PROPS, size: 18 })}
          Hourly Forecast
        </h3>
        
        <div className="hourly-forecast__day-tabs">
          {forecastDays.map((day, index) => (
            <button
              key={index}
              className={`hourly-forecast__day-tab ${selectedDay === index ? 'hourly-forecast__day-tab--active' : ''}`}
              onClick={() => setSelectedDay(index)}
            >
              {getDayLabel(index)}
            </button>
          ))}
        </div>
      </div>

      <div 
        ref={containerRef}
        className="hourly-forecast__scroll-container"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        tabIndex={0}
      >
        <div className="hourly-forecast__card-stack">
          {prevHour && (
            <div className="hourly-forecast__card hourly-forecast__card--prev">
              <HourCard hour={prevHour} />
            </div>
          )}

          <div 
            className={`hourly-forecast__card hourly-forecast__card--current ${isAnimating ? 'hourly-forecast__card--animating' : ''}`}
          >
            <HourCard hour={currentHour} isMain={true} />
          </div>

          {nextHour && (
            <div className="hourly-forecast__card hourly-forecast__card--next">
              <HourCard hour={nextHour} />
            </div>
          )}
        </div>

        <div className="hourly-forecast__navigation-arrows">
          {currentHourIndex > 0 && (
            <button 
              className="hourly-forecast__nav-button hourly-forecast__nav-button--up"
              onClick={() => {
                if (!isAnimating) {
                  setIsAnimating(true);
                  setCurrentHourIndex(prev => prev - 1);
                  setTimeout(() => setIsAnimating(false), 400);
                }
              }}
              disabled={isAnimating}
            >
              {getWeatherIcon('up', { size: 14 })}
            </button>
          )}
          
          {currentHourIndex < selectedDayHours.length - 1 && (
            <button 
              className="hourly-forecast__nav-button hourly-forecast__nav-button--down"
              onClick={() => {
                if (!isAnimating) {
                  setIsAnimating(true);
                  setCurrentHourIndex(prev => prev + 1);
                  setTimeout(() => setIsAnimating(false), 400);
                }
              }}
              disabled={isAnimating}
            >
              {getWeatherIcon('down', { size: 14 })}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Hour Card Component
const HourCard = ({ hour, isMain = false }) => {
  const time = new Date(hour.time);
  const timeString = time.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    hour12: true 
  });

  const iconUrl = formatIconUrl(hour.condition.icon);

  return (
    <div className={`hour-card ${isMain ? 'hour-card--main' : ''}`}>
      <div className="hour-card__time">
        {timeString}
      </div>
      
      <div className="hour-card__weather">
        <img 
          src={iconUrl} 
          alt={hour.condition.text}
          className="hour-card__icon"
        />
        <div className="hour-card__condition">
          {hour.condition.text}
        </div>
      </div>
      
      <div className="hour-card__temperature">
        <span className="hour-card__temp-main">{Math.round(hour.temp_c)}°</span>
        <span className="hour-card__temp-feels">Feels {Math.round(hour.feelslike_c)}°</span>
      </div>
      
      <div className="hour-card__details">
        <div className="hour-card__detail">
          {getWeatherIcon('humidity', { size: 14, color: '#74b9ff' })}
          <span>{hour.humidity}%</span>
        </div>
        <div className="hour-card__detail">
          {getWeatherIcon('wind', { size: 14, color: '#a29bfe' })}
          <span>{Math.round(hour.wind_kph)} km/h</span>
        </div>
        <div className="hour-card__detail">
          {getWeatherIcon('rain', { size: 14, color: '#00b894' })}
          <span>{hour.chance_of_rain}%</span>
        </div>
      </div>
      
      {hour.precip_mm > 0 && (
        <div className="hour-card__precipitation">
          <span className="hour-card__precip-amount">{hour.precip_mm} mm</span>
        </div>
      )}
    </div>
  );
};

export default HourlyForecastChart;
