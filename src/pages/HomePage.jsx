import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Container, Typography, Box, Button, Chip, Stack } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SearchIcon from '@mui/icons-material/Search';
import SearchBar from '../components/SearchBar';
import MovieGrid from '../components/MovieGrid';
import MovieFilters from '../components/MovieFilters';
import Marquee from '../components/Marquee';
import HeroSection from '../components/HeroSection';
import ErrorState from '../components/ErrorState';
import EmptyState from '../components/EmptyState';
import { movieService } from '../services/movieService';
import { useFavorites } from '../context/FavoritesContext';
import { useMovieContext } from '../context/MovieContext';
import { useSearch } from '../context/SearchContext';
import { useDebounce } from '../hooks/useDebounce';

export const HomePage = () => {
  // Favorites & Movie Contexts
  const { isFavorite, toggleFavorite } = useFavorites();
  const { genres } = useMovieContext();
  const { searchInput, setSearchInput, clearSearch, setLastSavedQuery } = useSearch();

  // Debounced search query
  const debouncedQuery = useDebounce(searchInput, 450);

  // Filters State
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMinRating, setSelectedMinRating] = useState('');

  // Movies list & Pagination State
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState(null);

  // Identity check for preventing stale async requests
  const requestIdRef = useRef(0);


  // Sync non-empty search query to localStorage
  useEffect(() => {
    if (debouncedQuery && debouncedQuery.trim()) {
      setLastSavedQuery(debouncedQuery.trim());
    }
  }, [debouncedQuery, setLastSavedQuery]);

  // Main movie fetch logic
  const fetchMovies = useCallback(
    async (targetPage = 1, append = false) => {
      const currentReqId = ++requestIdRef.current;
      
      if (append) {
        setIsLoadingMore(true);
      } else {
        setIsLoading(true);
        setError(null);
      }

      try {
        let responseData;
        const activeQuery = debouncedQuery.trim();
        const hasFilters = Boolean(selectedGenre || selectedYear || selectedMinRating);

        if (activeQuery) {
          // Perform search
          responseData = await movieService.searchMovies(activeQuery, targetPage);
        } else if (hasFilters) {
          // Discover with filters
          responseData = await movieService.discoverMovies({
            genreId: selectedGenre,
            year: selectedYear,
            minRating: selectedMinRating,
            page: targetPage,
          });
        } else {
          // Default: Trending movies
          responseData = await movieService.getTrending(targetPage);
        }

        // Stale request protection
        if (currentReqId !== requestIdRef.current) return;

        const newResults = responseData?.results || [];

        setMovies((prevMovies) => {
          if (append) {
            // Filter out any duplicate movie IDs
            const existingIds = new Set(prevMovies.map((m) => m.id));
            const uniqueAdditions = newResults.filter((m) => !existingIds.has(m.id));
            return [...prevMovies, ...uniqueAdditions];
          }
          return newResults;
        });

        setPage(responseData?.page || 1);
        setTotalPages(responseData?.total_pages || 1);
      } catch (err) {
        if (currentReqId === requestIdRef.current) {
          setError(err.message || 'Unable to fetch movies right now.');
        }
      } finally {
        if (currentReqId === requestIdRef.current) {
          setIsLoading(false);
          setIsLoadingMore(false);
        }
      }
    },
    [debouncedQuery, selectedGenre, selectedYear, selectedMinRating]
  );

  // Trigger fetch when search query or filters change
  useEffect(() => {
    setPage(1);
    fetchMovies(1, false);
  }, [fetchMovies]);

  // Load More Handler
  const handleLoadMore = () => {
    if (page < totalPages && !isLoadingMore) {
      const nextPage = page + 1;
      fetchMovies(nextPage, true);
    }
  };

  // Clear search & filters handler
  const handleClearSearchAndFilters = () => {
    setSearchInput('');
    setSelectedGenre('');
    setSelectedYear('');
    setSelectedMinRating('');
  };

  const isSearchActive = Boolean(debouncedQuery.trim());
  const hasActiveFilters = Boolean(selectedGenre || selectedYear || selectedMinRating);

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 3, md: 5 } }}>
      {/* Interactive Hero Section with Video Trailer & Search Bar */}
      <HeroSection
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        onSearch={() => fetchMovies(1, false)}
        onClear={() => setSearchInput('')}
        movies={movies}
      />

      {/* Auto-scrolling Trending Marquee Banner */}
      {!isLoading && movies.length > 0 && <Marquee movies={movies} />}

      {/* Filter Options */}
      <MovieFilters
        genres={genres}
        selectedGenre={selectedGenre}
        selectedYear={selectedYear}
        selectedMinRating={selectedMinRating}
        onGenreChange={setSelectedGenre}
        onYearChange={setSelectedYear}
        onMinRatingChange={setSelectedMinRating}
        onClearFilters={() => {
          setSelectedGenre('');
          setSelectedYear('');
          setSelectedMinRating('');
        }}
      />

      {/* Results Header Title */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Stack direction="row" spacing={1.5} alignItems="center">
          {isSearchActive ? (
            <SearchIcon color="primary" />
          ) : (
            <TrendingUpIcon color="primary" />
          )}
          <Typography variant="h5" fontWeight={800} color="text.primary">
            {isSearchActive
              ? `Search Results for "${debouncedQuery.trim()}"`
              : hasActiveFilters
              ? 'Filtered Discover Results'
              : 'Trending Movies This Week'}
          </Typography>
        </Stack>

        {!isLoading && movies.length > 0 && (
          <Chip
            label={`${movies.length} ${movies.length === 1 ? 'Movie' : 'Movies'}`}
            variant="outlined"
            size="small"
            sx={{ fontWeight: 600 }}
          />
        )}
      </Box>

      {/* Main Grid View */}
      {error ? (
        <ErrorState
          title="Error Loading Movies"
          message={error}
          onRetry={() => fetchMovies(1, false)}
        />
      ) : !isLoading && movies.length === 0 ? (
        <EmptyState
          title={isSearchActive ? 'No Matching Movies Found' : 'No Results'}
          message={
            isSearchActive
              ? `We couldn't find any titles matching "${debouncedQuery}". Check your spelling or clear filters.`
              : 'No movies match the selected criteria.'
          }
          actionLabel="Clear Search & Filters"
          onAction={handleClearSearchAndFilters}
        />
      ) : (
        <>
          <MovieGrid
            movies={movies}
            isLoading={isLoading}
            isFavoriteFunc={isFavorite}
            onToggleFavorite={toggleFavorite}
          />

          {/* Pagination / Load More Button */}
          {page < totalPages && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6, mb: 2 }}>
              <Button
                variant="contained"
                size="large"
                disabled={isLoadingMore || isLoading}
                onClick={handleLoadMore}
                endIcon={<ExpandMoreIcon />}
                sx={{
                  py: 1.5,
                  px: 4,
                  fontWeight: 700,
                  fontSize: '1rem',
                  borderRadius: 3,
                  boxShadow: '0 8px 24px rgba(229, 9, 20, 0.3)',
                }}
              >
                {isLoadingMore ? 'Loading More Movies...' : 'Load More Movies'}
              </Button>
            </Box>
          )}
        </>
      )}
    </Container>
  );
};

export default HomePage;
