import { getWeatherIcon, LARGE_ICON_PROPS } from '../utils/iconUtils';
import './LoadingSpinner.css';

const LoadingSpinner = ({ 
  message = 'Loading...', 
  className = '',
  size = 'medium'
}) => {
  return (
    <div className={`loading-spinner loading-spinner--${size}${className ? ` ${className}` : ''}`}>
      <div className="loading-spinner__icon">
        {getWeatherIcon('loading', { 
          ...LARGE_ICON_PROPS, 
          size: size === 'large' ? 32 : size === 'small' ? 16 : 24,
          className: 'loading-spinner__rotating-icon'
        })}
      </div>
      {message && (
        <p className="loading-spinner__message">{message}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;
