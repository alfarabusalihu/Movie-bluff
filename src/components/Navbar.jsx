import React from 'react';
import { NavLink as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Container,
  useTheme,
  Tooltip,
  Avatar,
  TextField,
  InputAdornment,
} from '@mui/material';
import MovieFilterIcon from '@mui/icons-material/MovieFilter';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { useAuth } from '../context/AuthContext';
import { useSearch } from '../context/SearchContext';

export const Navbar = ({ toggleTheme, currentThemeMode = 'dark' }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const { searchInput, setSearchInput, clearSearch } = useSearch();

  const handleAccountClick = () => {
    if (isAuthenticated) {
      logout();
    } else {
      navigate('/login');
    }
  };

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
    if (location.pathname !== '/') {
      navigate('/');
    }
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: theme.palette.mode === 'dark' 
          ? 'rgba(15, 18, 29, 0.85)' 
          : 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(12px)',
        borderBottom: 'none',
        zIndex: (t) => t.zIndex.drawer + 1,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between', py: 1, gap: 1.5 }}>
          {/* Logo & Branding */}
          <Box
            component={RouterLink}
            to="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              color: 'text.primary',
              gap: 1.25,
              flexShrink: 0,
              '&:hover': {
                '& .logo-icon': { transform: 'scale(1.1) rotate(-5deg)' },
              },
            }}
          >
            <Box
              className="logo-icon"
              sx={{
                width: 38,
                height: 38,
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #e50914 0%, #ff5252 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                boxShadow: '0 4px 14px rgba(229, 9, 20, 0.4)',
                transition: 'transform 0.3s ease',
              }}
            >
              <MovieFilterIcon fontSize="small" />
            </Box>
            <Typography
              variant="h6"
              noWrap
              sx={{
                fontWeight: 800,
                letterSpacing: '-0.03em',
                background: 'linear-gradient(90deg, #e50914 0%, #ff6b6b 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: { xs: '1.1rem', sm: '1.35rem' },
                display: { xs: 'none', sm: 'block' },
              }}
            >
              MovieExplorer
            </Typography>
          </Box>

          {/* Compact Header Search Bar (Center/Right) */}
          <Box
            sx={{
              maxWidth: { xs: 170, sm: 260, md: 320 },
              width: '100%',
              mx: 'auto',
            }}
          >
            <TextField
              size="small"
              fullWidth
              placeholder="Search movies..."
              value={searchInput}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                  </InputAdornment>
                ),
                endAdornment: searchInput ? (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={clearSearch} edge="end">
                      <ClearIcon sx={{ fontSize: 16 }} />
                    </IconButton>
                  </InputAdornment>
                ) : null,
                sx: {
                  borderRadius: 3,
                  fontSize: '0.875rem',
                  height: 36,
                  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.04)',
                  '& fieldset': {
                    borderColor: 'transparent',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(229, 9, 20, 0.4) !important',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'primary.main !important',
                  },
                },
              }}
            />
          </Box>

          {/* Far Right: ONLY Two Icons (Theme Button & Sign In Icon) + Favorites shortcut */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexShrink: 0 }}>
            {/* Favorites Watchlist Shortcut */}
            <Tooltip title="Favorites Watchlist">
              <IconButton
                component={RouterLink}
                to="/favorites"
                size="small"
                sx={{
                  color: 'text.primary',
                  borderRadius: '10px',
                  border: `1px solid ${theme.palette.divider}`,
                  p: 0.9,
                  '&:hover': {
                    backgroundColor: theme.palette.mode === 'dark'
                      ? 'rgba(229, 9, 20, 0.15)'
                      : 'rgba(229, 9, 20, 0.08)',
                    color: 'primary.main',
                  },
                }}
              >
                <FavoriteIcon fontSize="small" />
              </IconButton>
            </Tooltip>

            {/* Icon 1: Theme Switcher Toggle */}
            <Tooltip title={`Switch to ${currentThemeMode === 'dark' ? 'Light' : 'Dark'} mode`}>
              <IconButton
                onClick={toggleTheme}
                size="small"
                sx={{
                  color: 'text.primary',
                  borderRadius: '10px',
                  border: `1px solid ${theme.palette.divider}`,
                  p: 0.9,
                  '&:hover': {
                    backgroundColor: theme.palette.mode === 'dark'
                      ? 'rgba(255, 255, 255, 0.08)'
                      : 'rgba(0, 0, 0, 0.05)',
                  },
                }}
                aria-label="toggle light or dark theme"
              >
                {currentThemeMode === 'dark' ? (
                  <Brightness7Icon sx={{ color: '#ffb74d', fontSize: 20 }} />
                ) : (
                  <Brightness4Icon sx={{ color: '#5c6bc0', fontSize: 20 }} />
                )}
              </IconButton>
            </Tooltip>

            {/* Icon 2: Sign In / User Profile Icon */}
            <Tooltip title={isAuthenticated ? `Logged in as ${user.username} (Click to Logout)` : 'Sign In'}>
              <IconButton
                onClick={handleAccountClick}
                size="small"
                sx={{
                  color: isAuthenticated ? 'primary.main' : 'text.primary',
                  borderRadius: '10px',
                  border: `1px solid ${theme.palette.divider}`,
                  p: 0.9,
                  backgroundColor: isAuthenticated
                    ? (theme.palette.mode === 'dark' ? 'rgba(229, 9, 20, 0.15)' : 'rgba(229, 9, 20, 0.08)')
                    : 'transparent',
                  '&:hover': {
                    backgroundColor: theme.palette.mode === 'dark'
                      ? 'rgba(255, 255, 255, 0.08)'
                      : 'rgba(0, 0, 0, 0.05)',
                  },
                }}
                aria-label={isAuthenticated ? 'logout user' : 'sign in page'}
              >
                {isAuthenticated ? (
                  <Avatar sx={{ bgcolor: 'primary.main', width: 22, height: 22, fontSize: '0.7rem', fontWeight: 800 }}>
                    {user.username.charAt(0).toUpperCase()}
                  </Avatar>
                ) : (
                  <AccountCircleIcon sx={{ fontSize: 20 }} />
                )}
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
