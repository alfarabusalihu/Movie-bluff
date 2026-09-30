import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import AuthRequiredModal from '../components/AuthRequiredModal';

const FavoritesContext = createContext({
  favorites: [],
  addFavorite: () => {},
  removeFavorite: () => {},
  toggleFavorite: () => {},
  isFavorite: () => false,
  promptAuthModal: () => {},
});

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);

  // Storage key is user-specific if logged in
  const getStorageKey = useCallback(() => {
    if (user && user.username) {
      return `favoriteMovies_${user.username}`;
    }
    return 'favoriteMovies_guest';
  }, [user]);

  const [favorites, setFavorites] = useState([]);

  // Load user favorites whenever user changes
  useEffect(() => {
    if (!isAuthenticated) {
      setFavorites([]);
      return;
    }
    try {
      const key = getStorageKey();
      const stored = localStorage.getItem(key);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setFavorites(parsed);
          return;
        }
      }
    } catch (err) {
      console.warn('Failed to parse favorites from localStorage:', err);
    }
    setFavorites([]);
  }, [isAuthenticated, getStorageKey]);

  // Sync to localStorage when favorites change for logged-in user
  useEffect(() => {
    if (!isAuthenticated) return;
    try {
      const key = getStorageKey();
      localStorage.setItem(key, JSON.stringify(favorites));
    } catch (err) {
      console.warn('Failed to save favorites to localStorage:', err);
    }
  }, [favorites, isAuthenticated, getStorageKey]);

  const isFavorite = useCallback(
    (movieId) => {
      if (!isAuthenticated || !movieId) return false;
      return favorites.some((fav) => String(fav.id) === String(movieId));
    },
    [favorites, isAuthenticated]
  );

  const toggleFavorite = useCallback(
    (movie) => {
      if (!isAuthenticated) {
        // Guest attempting to favorite -> trigger auth modal
        setAuthModalOpen(true);
        return false;
      }
      if (!movie || !movie.id) return false;

      setFavorites((prev) => {
        const exists = prev.some((item) => String(item.id) === String(movie.id));
        if (exists) {
          return prev.filter((item) => String(item.id) !== String(movie.id));
        }
        return [...prev, movie];
      });
      return true;
    },
    [isAuthenticated]
  );

  const addFavorite = useCallback(
    (movie) => {
      if (!isAuthenticated) {
        setAuthModalOpen(true);
        return;
      }
      if (!movie || !movie.id) return;
      setFavorites((prev) => {
        if (prev.some((item) => String(item.id) === String(movie.id))) {
          return prev;
        }
        return [...prev, movie];
      });
    },
    [isAuthenticated]
  );

  const removeFavorite = useCallback(
    (movieId) => {
      if (!isAuthenticated || !movieId) return;
      setFavorites((prev) => prev.filter((item) => String(item.id) !== String(movieId)));
    },
    [isAuthenticated]
  );

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        toggleFavorite,
        isFavorite,
        promptAuthModal: () => setAuthModalOpen(true),
      }}
    >
      {children}
      <AuthRequiredModal
        open={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />
    </FavoritesContext.Provider>
  );
};

export default FavoritesContext;
