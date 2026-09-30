import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Chip, useTheme } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { getImageUrl } from '../utils/imageUrl';
import { formatRating } from '../utils/formatRating';

export const Marquee = ({ movies = [] }) => {
  const navigate = useNavigate();
  const theme = useTheme();

  if (!movies || movies.length === 0) return null;

  // Duplicate items for continuous seamless horizontal ticker
  const marqueeItems = [...movies.slice(0, 12), ...movies.slice(0, 12)];

  return (
    <Box
      sx={{
        width: '100%',
        mb: 4,
        position: 'relative',
        // No borders on the outer container
        border: 'none',
        outline: 'none',
        background: 'transparent',
        // Ample vertical padding so scaled hover cards & shadows are never clipped
        py: 2,
      }}
    >
      {/* Scrolling Marquee Track Container */}
      <Box
        sx={{
          overflow: 'hidden',
          width: '100%',
          position: 'relative',
          py: 1.5, // headroom for scale hover & drop shadows
          '&:hover .marquee-track': {
            animationPlayState: 'paused',
          },
        }}
      >
        <Box
          className="marquee-track"
          sx={{
            display: 'flex',
            gap: 2.5,
            width: 'max-content',
            // Slowed down animation speed (65 seconds for ultra-smooth gliding)
            animation: 'marqueeScroll 65s linear infinite',
            '@keyframes marqueeScroll': {
              '0%': { transform: 'translateX(0%)' },
              '100%': { transform: 'translateX(-50%)' },
            },
          }}
        >
          {marqueeItems.map((movie, idx) => {
            const posterUrl = getImageUrl(movie.poster_path, 'w185');
            const ratingText = formatRating(movie.vote_average);
            const releaseYear = movie.release_date ? movie.release_date.substring(0, 4) : '';

            return (
              <Box
                key={`marquee-${movie.id}-${idx}`}
                onClick={() => navigate(`/movie/${movie.id}`)}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  p: 1,
                  pr: 2.5,
                  borderRadius: 3,
                  backgroundColor: theme.palette.mode === 'dark'
                    ? 'rgba(22, 27, 42, 0.85)'
                    : 'rgba(255, 255, 255, 0.95)',
                  // Clean subtle card styling without harsh container borders
                  boxShadow: theme.palette.mode === 'dark'
                    ? '0 4px 16px rgba(0, 0, 0, 0.4)'
                    : '0 4px 16px rgba(0, 0, 0, 0.06)',
                  cursor: 'pointer',
                  flexShrink: 0,
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                  '&:hover': {
                    // Hover scale fits perfectly inside the track padding without clipping
                    transform: 'translateY(-3px) scale(1.03)',
                    boxShadow: theme.palette.mode === 'dark'
                      ? '0 12px 28px rgba(0, 0, 0, 0.7), 0 0 16px rgba(229, 9, 20, 0.3)'
                      : '0 12px 28px rgba(0, 0, 0, 0.12)',
                  },
                }}
              >
                {/* Poster Thumbnail */}
                <Box
                  component="img"
                  src={posterUrl}
                  alt={movie.title}
                  sx={{
                    width: 44,
                    height: 62,
                    borderRadius: 2,
                    objectFit: 'cover',
                    backgroundColor: '#12151e',
                    flexShrink: 0,
                  }}
                />

                {/* Movie Details */}
                <Box sx={{ maxWidth: 160 }}>
                  <Typography
                    variant="subtitle2"
                    fontWeight={700}
                    noWrap
                    sx={{ fontSize: '0.875rem', lineHeight: 1.25, mb: 0.5 }}
                  >
                    {movie.title}
                  </Typography>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Chip
                      icon={<StarIcon sx={{ fontSize: '12px !important', color: '#ffb74d !important' }} />}
                      label={ratingText}
                      size="small"
                      sx={{
                        height: 20,
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        backgroundColor: 'rgba(255, 183, 77, 0.15)',
                        color: theme.palette.mode === 'dark' ? '#ffb74d' : '#d97706',
                        px: 0.2,
                        border: 'none',
                      }}
                    />
                    {releaseYear && (
                      <Typography variant="caption" color="text.secondary" fontWeight={600}>
                        {releaseYear}
                      </Typography>
                    )}
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default Marquee;
