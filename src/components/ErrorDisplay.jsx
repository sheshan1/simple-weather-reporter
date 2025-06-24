import React from 'react';
import { getWeatherIcon, LARGE_ICON_PROPS } from '../utils/iconUtils';
import './ErrorDisplay.css';

const ErrorDisplay = ({ 
  error = 'Something went wrong', 
  onRetry,
  className = '',
  title = 'Oops!' 
}) => {
  return (
    <div className={`error-display${className ? ` ${className}` : ''}`}>
      <div className="error-display__icon">
        {getWeatherIcon('error', { ...LARGE_ICON_PROPS, color: '#e17055', size: 48 })}
      </div>
      
      <h3 className="error-display__title">{title}</h3>
      
      <p className="error-display__message">
        {error}
      </p>
      
      {onRetry && (
        <button 
          className="error-display__retry-button"
          onClick={onRetry}
          type="button"
        >
          {getWeatherIcon('refresh', { size: 16, color: 'white' })}
          <span style={{ marginLeft: '0.5rem' }}>Try Again</span>
        </button>
      )}
    </div>
  );
};

export default ErrorDisplay;
