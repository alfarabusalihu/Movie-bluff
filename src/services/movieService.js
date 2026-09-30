import tmdbClient from './tmdbClient';

/**
 * Movie API Service encapsulating all TMDb endpoints.
 */
export const movieService = {
  /**
   * Fetch weekly trending movies.
   * @param {number} page 
   * @returns {Promise<{results: Array, page: number, total_pages: number, total_results: number}>}
   */
  getTrending: async (page = 1) => {
    const response = await tmdbClient.get('/trending/movie/week', {
      params: { page },
    });
    return response.data;
  },

  /**
   * Search movies by query term.
   * @param {string} query 
   * @param {number} page 
   * @returns {Promise<{results: Array, page: number, total_pages: number, total_results: number}>}
   */
  searchMovies: async (query, page = 1) => {
    if (!query || !query.trim()) {
      return { results: [], page: 1, total_pages: 0, total_results: 0 };
    }
    const response = await tmdbClient.get('/search/movie', {
      params: {
        query: query.trim(),
        page,
        include_adult: false,
      },
    });
    return response.data;
  },

  /**
   * Get detailed information for a specific movie, including credits & videos.
   * @param {number|string} movieId 
   * @returns {Promise<Object>}
   */
  getMovieDetails: async (movieId) => {
    const response = await tmdbClient.get(`/movie/${movieId}`, {
      params: {
        append_to_response: 'credits,videos,recommendations',
      },
    });
    return response.data;
  },

  /**
   * Get credits (cast & crew) for a movie.
   * @param {number|string} movieId 
   * @returns {Promise<{cast: Array, crew: Array}>}
   */
  getMovieCredits: async (movieId) => {
    const response = await tmdbClient.get(`/movie/${movieId}/credits`);
    return response.data;
  },

  /**
   * Get videos (trailers, teasers) for a movie.
   * @param {number|string} movieId 
   * @returns {Promise<{results: Array}>}
   */
  getMovieVideos: async (movieId) => {
    const response = await tmdbClient.get(`/movie/${movieId}/videos`);
    return response.data;
  },

  /**
   * Get list of official movie genres.
   * @returns {Promise<{genres: Array}>}
   */
  getGenres: async () => {
    const response = await tmdbClient.get('/genre/movie/list');
    return response.data;
  },

  /**
   * Discover movies with filters (genre, year, min rating).
   * @param {Object} filters - { genreId, year, minRating, page, sortBy }
   * @returns {Promise<{results: Array, page: number, total_pages: number, total_results: number}>}
   */
  discoverMovies: async ({ genreId, year, minRating, page = 1, sortBy = 'popularity.desc' } = {}) => {
    const params = {
      page,
      sort_by: sortBy,
      include_adult: false,
    };

    if (genreId) {
      params.with_genres = genreId;
    }
    if (year) {
      params.primary_release_year = year;
    }
    if (minRating) {
      params['vote_average.gte'] = minRating;
      params['vote_count.gte'] = 50; // Ensure meaningful rating results
    }

    const response = await tmdbClient.get('/discover/movie', { params });
    return response.data;
  },
};

export default movieService;
