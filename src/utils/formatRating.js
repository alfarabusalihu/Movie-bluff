/**
 * Formats a TMDb vote average rating to 1 decimal place.
 * @param {number|null} rating - TMDb vote_average (0-10)
 * @returns {string} e.g. "8.2" or "NR" (No Rating)
 */
export const formatRating = (rating) => {
  if (rating === null || rating === undefined || rating === 0) {
    return 'NR';
  }
  const num = Number(rating);
  if (isNaN(num)) return 'NR';
  return num.toFixed(1);
};

/**
 * Returns a color palette descriptor based on the rating score.
 * @param {number|null} rating 
 * @returns {'high' | 'medium' | 'low' | 'none'}
 */
export const getRatingColorCategory = (rating) => {
  if (!rating || rating === 0) return 'none';
  if (rating >= 7.0) return 'high';
  if (rating >= 5.0) return 'medium';
  return 'low';
};
