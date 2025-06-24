import { 
  WiHumidity,           // Humidity icon
  WiStrongWind,         // Wind icon  
  WiDaySunny,           // UV/Sun icon
} from 'react-icons/wi';

import { 
  FiEye,                // Visibility icon
  FiSearch,             // Search icon
  FiX,                  // Close icon
} from 'react-icons/fi';

import { 
  BiError               // Error icon
} from 'react-icons/bi';

import { 
  AiOutlineLoading3Quarters, // Loading icon
} from 'react-icons/ai';

import { 
  IoRefreshOutline,     // Refresh icon
  IoLocationOutline     // Location icon
} from 'react-icons/io5';

/**
 * Weather Icon Mapping
 */
const WEATHER_ICONS = {
  humidity: WiHumidity,
  wind: WiStrongWind,
  uv: WiDaySunny,
  visibility: FiEye,
  error: BiError,
  loading: AiOutlineLoading3Quarters,
  refresh: IoRefreshOutline,
  search: FiSearch,
  close: FiX,
  location: IoLocationOutline
};

/**
 * Get weather icon component by type
 * @param {string} type - Icon type
 * @param {object} props - Icon props
 * @returns {JSX.Element}
 */
export const getWeatherIcon = (type, props = {}) => {
  const IconComponent = WEATHER_ICONS[type];
  
  if (!IconComponent) {
    console.warn(`Weather icon "${type}" not found`);
    return null;
  }
  
  return <IconComponent {...props} />;
};

/**
 * Default icon props for consistent styling
 */
export const DEFAULT_ICON_PROPS = {
  size: 20,
  color: '#74b9ff'
};

export const LARGE_ICON_PROPS = {
  size: 24,
  color: '#74b9ff'
};