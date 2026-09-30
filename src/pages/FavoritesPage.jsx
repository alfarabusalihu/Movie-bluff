import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Chip, Button, Paper } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useFavorites } from '../context/FavoritesContext';
import { useAuth } from '../context/AuthContext';
import MovieGrid from '../components/MovieGrid';
import EmptyState from '../components/EmptyState';

export const FavoritesPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const { favorites, isFavorite, toggleFavorite } = useFavorites();

  // Non-authenticated Guest View
  if (!isAuthenticated) {
    return (
      <Container maxWidth="sm" sx={{ py: { xs: 8, md: 12 } }}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 4, sm: 6 },
            borderRadius: 4,
            textAlign: 'center',
            border: (t) => `1px solid ${t.palette.divider}`,
            backgroundColor: (t) => (t.palette.mode === 'dark' ? '#181c2b' : '#ffffff'),
            boxShadow: (t) =>
              t.palette.mode === 'dark' ? '0 16px 36px rgba(0,0,0,0.5)' : '0 16px 36px rgba(0,0,0,0.06)',
          }}
        >
          <Box
            sx={{
              width: 68,
              height: 68,
              borderRadius: '50%',
              backgroundColor: 'rgba(229, 9, 20, 0.12)',
              color: 'primary.main',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 2,
            }}
          >
            <LockOutlinedIcon sx={{ fontSize: 36 }} />
          </Box>
          <Typography variant="h4" fontWeight={800} gutterBottom color="text.primary">
            Sign In to Access Favorites
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4, lineHeight: 1.6 }}>
            Your personal movie watchlist is reserved for registered members. Please sign in or create an account to start saving your top films.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/login')}
            sx={{
              py: 1.5,
              px: 4,
              fontWeight: 700,
              fontSize: '1rem',
              borderRadius: 3,
              boxShadow: '0 8px 24px rgba(229, 9, 20, 0.4)',
            }}
          >
            Sign In Now
          </Button>
        </Paper>
      </Container>
    );
  }

  // Authenticated Member View
  return (
    <Container maxWidth="xl" sx={{ py: { xs: 3, md: 5 } }}>
      {/* Header Section */}
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: 3,
              backgroundColor: 'rgba(229, 9, 20, 0.12)',
              color: 'primary.main',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <FavoriteIcon fontSize="medium" />
          </Box>
          <Box>
            <Typography variant="h4" component="h1" fontWeight={800} color="text.primary">
              {user?.username}'s Saved Favorites
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Personalized watchlist saved for {user?.username}.
            </Typography>
          </Box>
        </Box>

        {favorites.length > 0 && (
          <Chip
            label={`${favorites.length} ${favorites.length === 1 ? 'Favorite' : 'Favorites'}`}
            color="primary"
            variant="outlined"
            sx={{ fontWeight: 700 }}
          />
        )}
      </Box>

      {/* Favorites List or Empty State */}
      {favorites.length === 0 ? (
        <EmptyState
          title="Your Watchlist is Empty"
          message="You haven't saved any movies to your favorites list yet. Click the heart icon on any movie card to save it here."
          actionLabel="Explore Trending Movies"
          onAction={() => navigate('/')}
        />
      ) : (
        <MovieGrid
          movies={favorites}
          isFavoriteFunc={isFavorite}
          onToggleFavorite={toggleFavorite}
        />
      )}
    </Container>
  );
};

export default FavoritesPage;
