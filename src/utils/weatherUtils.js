/**
 * Format wind speed with direction
 * @param {number} kph 
 * @param {string} direction 
 * @returns {string}
 */
export const formatWindSpeed = (kph, direction) => {
  return `${Math.round(kph)} km/h ${direction}`;
};

/**
 * Format date and time
 * @param {string} dateString 
 * @returns {string}
 */
export const formatDateTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

/**
 * Get UV Index description
 * @param {number} uvIndex 
 * @returns {string}
 */
export const getUVDescription = (uvIndex) => {
  if (uvIndex <= 2) return 'Low';
  if (uvIndex <= 5) return 'Moderate';
  if (uvIndex <= 7) return 'High';
  if (uvIndex <= 10) return 'Very High';
  return 'Extreme';
};

/**
 * Format humidity percentage
 * @param {number} humidity 
 * @returns {string}
 */
export const formatHumidity = (humidity) => {
  return `${Math.round(humidity)}%`;
};

/**
 * Convert weather icon URL to HTTPS
 * @param {string} iconUrl 
 * @returns {string}
 */
export const formatIconUrl = (iconUrl) => {
  return iconUrl.startsWith('//') ? `https:${iconUrl}` : iconUrl;
};
