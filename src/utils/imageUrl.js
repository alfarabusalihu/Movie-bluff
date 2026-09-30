/**
 * Utility functions for TMDb Image URLs with fallbacks.
 */

const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/';

// SVG placeholder for missing posters
export const POSTER_PLACEHOLDER = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="500" height="750" viewBox="0 0 500 750" fill="%231a1d29"><rect width="500" height="750" fill="%2312151e"/><path d="M210 320 L290 320 L290 400 L210 400 Z" fill="%232a2f42"/><circle cx="250" cy="350" r="20" fill="%234f566b"/><text x="50%" y="460" font-family="sans-serif" font-size="22" fill="%237e89a3" text-anchor="middle">No Poster Available</text></svg>`;

export const PROFILE_PLACEHOLDER = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="450" viewBox="0 0 300 450" fill="%231a1d29"><rect width="300" height="450" fill="%2312151e"/><circle cx="150" cy="180" r="50" fill="%232a2f42"/><path d="M80 340 C80 260 220 260 220 340 Z" fill="%232a2f42"/><text x="50%" y="390" font-family="sans-serif" font-size="16" fill="%237e89a3" text-anchor="middle">No Photo</text></svg>`;

/**
 * Get full poster URL or fallback.
 * @param {string|null} path - Poster path from TMDb API.
 * @param {string} size - TMDb poster size (e.g., 'w92', 'w154', 'w185', 'w342', 'w500', 'w780', 'original').
 * @returns {string} Image URL.
 */
export const getImageUrl = (path, size = 'w500') => {
  if (!path) return POSTER_PLACEHOLDER;
  return `${TMDB_IMAGE_BASE_URL}${size}${path}`;
};

/**
 * Get full backdrop URL or null.
 * @param {string|null} path - Backdrop path from TMDb API.
 * @param {string} size - TMDb backdrop size (e.g., 'w300', 'w780', 'w1280', 'original').
 * @returns {string|null} Backdrop image URL or null.
 */
export const getBackdropUrl = (path, size = 'w1280') => {
  if (!path) return null;
  return `${TMDB_IMAGE_BASE_URL}${size}${path}`;
};

/**
 * Get profile image URL for cast/crew.
 * @param {string|null} path - Profile path from TMDb API.
 * @param {string} size - Size (e.g., 'w185', 'h632', 'original').
 * @returns {string} Image URL or profile placeholder.
 */
export const getProfileUrl = (path, size = 'w185') => {
  if (!path) return PROFILE_PLACEHOLDER;
  return `${TMDB_IMAGE_BASE_URL}${size}${path}`;
};
