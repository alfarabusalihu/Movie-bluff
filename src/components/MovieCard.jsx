import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardMedia,
  Typography,
  Box,
  Chip,
  IconButton,
  Tooltip,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { getImageUrl } from '../utils/imageUrl';
import { formatDate } from '../utils/formatDate';
import { formatRating, getRatingColorCategory } from '../utils/formatRating';

export const MovieCard = ({ movie, isFavorite = false, onToggleFavorite }) => {
  const navigate = useNavigate();

  if (!movie) return null;

  const { id, title, poster_path, release_date, vote_average } = movie;
  const ratingText = formatRating(vote_average);
  const ratingCategory = getRatingColorCategory(vote_average);
  const releaseYear = formatDate(release_date, true);
  const posterUrl = getImageUrl(poster_path, 'w500');

  const handleCardClick = () => {
    navigate(`/movie/${id}`);
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    if (onToggleFavorite) {
      onToggleFavorite(movie);
    }
  };

  const getRatingChipColor = () => {
    if (ratingCategory === 'high') return { bg: '#10b981', color: '#ffffff' };
    if (ratingCategory === 'medium') return { bg: '#f59e0b', color: '#ffffff' };
    if (ratingCategory === 'low') return { bg: '#ef4444', color: '#ffffff' };
    return { bg: '#6b7280', color: '#ffffff' };
  };

  const chipColor = getRatingChipColor();

  return (
    <Card
      elevation={0}
      onClick={handleCardClick}
      tabIndex={0}
      role="button"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardClick();
        }
      }}
      aria-label={`View details for ${title}`}
      sx={{
        width: '100%',
        aspectRatio: '2 / 3',
        position: 'relative',
        cursor: 'pointer',
        borderRadius: 3.5,
        overflow: 'hidden',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        backgroundColor: '#0d1017',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)',
        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease, border-color 0.3s ease',
        '&:hover, &:focus-visible': {
          transform: 'translateY(-8px) scale(1.02)',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6), 0 0 24px rgba(229, 9, 20, 0.35)',
          borderColor: 'primary.main',
          outline: 'none',
          '& .card-poster-img': {
            transform: 'scale(1.08)',
          },
          '& .card-overlay-scrim': {
            background: 'linear-gradient(to top, rgba(0, 0, 0, 0.98) 0%, rgba(0, 0, 0, 0.8) 60%, rgba(0,0,0,0.15) 100%)',
          },
        },
      }}
    >
      {/* Full-Bleed Poster Image (Fills the entire card height & width) */}
      <CardMedia
        component="img"
        image={posterUrl}
        alt={title ? `Poster for ${title}` : 'Movie poster'}
        loading="lazy"
        className="card-poster-img"
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      />

      {/* Dark Gradient Scrim Overlay for Crystal Clear Text Contrast */}
      <Box
        className="card-overlay-scrim"
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(to top, rgba(10, 12, 18, 0.95) 0%, rgba(10, 12, 18, 0.65) 55%, rgba(10, 12, 18, 0.05) 100%)',
          zIndex: 1,
          transition: 'background 0.3s ease',
        }}
      />

      {/* Top-Right Favorite Button Overlay */}
      {onToggleFavorite && (
        <Tooltip title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}>
          <IconButton
            onClick={handleFavoriteClick}
            aria-label={isFavorite ? `Remove ${title} from favorites` : `Add ${title} to favorites`}
            sx={{
              position: 'absolute',
              top: 12,
              right: 12,
              backgroundColor: 'rgba(0, 0, 0, 0.65)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: isFavorite ? '#e50914' : '#ffffff',
              zIndex: 3,
              transition: 'transform 0.2s ease, background-color 0.2s ease',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.85)',
                transform: 'scale(1.15)',
              },
            }}
          >
            {isFavorite ? <FavoriteIcon fontSize="small" /> : <FavoriteBorderIcon fontSize="small" />}
          </IconButton>
        </Tooltip>
      )}

      {/* Card Content Overlay (Title, Rating, Release Year over the image bottom) */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          p: { xs: 1.5, sm: 2 },
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}
      >
        {/* Title text directly over image */}
        <Typography
          variant="subtitle1"
          fontWeight={800}
          component="h2"
          sx={{
            color: '#ffffff',
            fontSize: { xs: '0.9rem', sm: '1rem' },
            lineHeight: 1.25,
            height: '2.5em',
            maxHeight: '2.5em',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            mb: 1,
            textShadow: '0 2px 4px rgba(0,0,0,0.8)',
          }}
        >
          {title}
        </Typography>

        {/* Bottom Row: Rating Badge & Release Year */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <Chip
            icon={<StarIcon sx={{ fontSize: '13px !important', color: `${chipColor.color} !important` }} />}
            label={ratingText}
            size="small"
            sx={{
              backgroundColor: chipColor.bg,
              color: chipColor.color,
              fontWeight: 700,
              fontSize: '0.725rem',
              height: 22,
              backdropFilter: 'blur(4px)',
              boxShadow: '0 2px 6px rgba(0,0,0,0.4)',
            }}
          />

          <Typography
            variant="caption"
            sx={{
              color: 'rgba(255, 255, 255, 0.85)',
              fontWeight: 600,
              fontSize: '0.75rem',
              textShadow: '0 1px 3px rgba(0,0,0,0.8)',
            }}
          >
            {releaseYear}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};

export default MovieCard;
