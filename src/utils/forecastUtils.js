/**
 * Get day label for the hour
 * @param {object} hourData 
 * @returns {string}
 */
export const getDayLabel = (hourData) => {
  if (hourData.isToday) return 'Today';
  if (hourData.isTomorrow) return 'Tomorrow';
  if (hourData.isDayAfter) {
    const date = new Date(hourData.time);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  }
  return '';
};
