import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CustomThemeProvider, useThemeContext } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { MovieProvider } from './context/MovieContext';
import { SearchProvider } from './context/SearchContext';
import AppLayout from './components/AppLayout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import MovieDetailsPage from './pages/MovieDetailsPage';
import FavoritesPage from './pages/FavoritesPage';
import NotFoundPage from './pages/NotFoundPage';

const AppRoutes = () => {
  const { mode, toggleTheme } = useThemeContext();

  return (
    <Routes>
      <Route path="/" element={<AppLayout toggleTheme={toggleTheme} currentThemeMode={mode} />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="movie/:id" element={<MovieDetailsPage />} />
        <Route path="favorites" element={<FavoritesPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

function App() {
  return (
    <CustomThemeProvider>
      <BrowserRouter>
        <AuthProvider>
          <FavoritesProvider>
            <MovieProvider>
              <SearchProvider>
                <AppRoutes />
              </SearchProvider>
            </MovieProvider>
          </FavoritesProvider>
        </AuthProvider>
      </BrowserRouter>
    </CustomThemeProvider>
  );
}

export default App;
