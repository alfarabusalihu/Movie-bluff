import React, { createContext, useContext, useState, useEffect } from 'react';
import { movieService } from '../services/movieService';

const MovieContext = createContext({
  genres: [],
  genresMap: {},
  isGenresLoaded: false,
});

export const useMovieContext = () => useContext(MovieContext);

/**
 * MovieContext provides globally shared data like the genres list
 * to avoid fetching it on every page component mount.
 */
export const MovieProvider = ({ children }) => {
  const [genres, setGenres] = useState([]);
  const [isGenresLoaded, setIsGenresLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchGenres = async () => {
      try {
        const data = await movieService.getGenres();
        if (isMounted && data?.genres) {
          setGenres(data.genres);
          setIsGenresLoaded(true);
        }
      } catch (err) {
        console.warn('MovieContext: Could not load genres.', err.message);
      }
    };

    fetchGenres();
    return () => {
      isMounted = false;
    };
  }, []);

  // Build a quick lookup map: { 28: 'Action', 35: 'Comedy', ... }
  const genresMap = genres.reduce((acc, g) => {
    acc[g.id] = g.name;
    return acc;
  }, {});

  return (
    <MovieContext.Provider value={{ genres, genresMap, isGenresLoaded }}>
      {children}
    </MovieContext.Provider>
  );
};
