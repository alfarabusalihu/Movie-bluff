import React from 'react';
import { Box } from '@mui/material';
import MovieCard from './MovieCard';
import MovieCardSkeleton from './MovieCardSkeleton';

/**
 * MovieGrid renders a responsive CSS Grid layout across 3 main screen tiers:
 * - Mobile (<600px): 2 columns
 * - Tablet/Medium (600px - 1200px): 3 to 4 columns
 * - Desktop (>1200px): 5 columns
 */
export const MovieGrid = ({
  movies = [],
  isLoading = false,
  skeletonCount = 10,
  isFavoriteFunc,
  onToggleFavorite,
}) => {
  const gridSx = {
    display: 'grid',
    gridTemplateColumns: {
      xs: 'repeat(2, 1fr)',
      sm: 'repeat(3, 1fr)',
      md: 'repeat(4, 1fr)',
      lg: 'repeat(5, 1fr)',
    },
    gap: { xs: 2, sm: 2.5, md: 3 },
    width: '100%',
  };

  if (isLoading && movies.length === 0) {
    return (
      <Box sx={gridSx}>
        {Array.from({ length: skeletonCount }).map((_, idx) => (
          <MovieCardSkeleton key={`skeleton-${idx}`} />
        ))}
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={gridSx}>
        {movies.map((movie) => {
          const isFav = isFavoriteFunc ? isFavoriteFunc(movie.id) : false;
          return (
            <MovieCard
              key={movie.id}
              movie={movie}
              isFavorite={isFav}
              onToggleFavorite={onToggleFavorite}
            />
          );
        })}

        {/* Append skeletons at bottom if loading next page */}
        {isLoading &&
          Array.from({ length: 5 }).map((_, idx) => (
            <MovieCardSkeleton key={`append-skeleton-${idx}`} />
          ))}
      </Box>
    </Box>
  );
};

export default MovieGrid;
