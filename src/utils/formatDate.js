/**
 * Formats a release date string (YYYY-MM-DD) into a human readable format.
 * @param {string|null} dateString - e.g. "2023-11-15"
 * @param {boolean} yearOnly - If true, returns only the 4-digit year.
 * @returns {string} Formatted date or "N/A"
 */
export const formatDate = (dateString, yearOnly = false) => {
  if (!dateString) return 'N/A';
  
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return 'N/A';

  if (yearOnly) {
    return date.getFullYear().toString();
  }

  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

/**
 * Formats movie runtime in minutes to "Xh Ym".
 * @param {number|null} minutes 
 * @returns {string} e.g. "2h 15m" or "N/A"
 */
export const formatRuntime = (minutes) => {
  if (!minutes || typeof minutes !== 'number' || minutes <= 0) return 'N/A';
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hrs === 0) return `${mins}m`;
  if (mins === 0) return `${hrs}h`;
  return `${hrs}h ${mins}m`;
};
