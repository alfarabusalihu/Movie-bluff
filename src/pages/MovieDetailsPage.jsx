import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Grid,
  Chip,
  Button,
  IconButton,
  Avatar,
  Paper,
  Divider,
  Stack,
  Skeleton,
  Tooltip,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import StarIcon from '@mui/icons-material/Star';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import MovieIcon from '@mui/icons-material/Movie';
import { movieService } from '../services/movieService';
import { useFavorites } from '../context/FavoritesContext';
import { getImageUrl, getBackdropUrl, getProfileUrl } from '../utils/imageUrl';
import { formatDate, formatRuntime } from '../utils/formatDate';
import { formatRating } from '../utils/formatRating';
import ErrorState from '../components/ErrorState';
import MovieGrid from '../components/MovieGrid';

export const MovieDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();

  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDetails = useCallback(async () => {
    if (!id || isNaN(Number(id))) {
      setError('Invalid Movie ID specified.');
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = await movieService.getMovieDetails(id);
      setMovie(data);
    } catch (err) {
      setError(err.message || 'Failed to load movie details.');
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchDetails();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [fetchDetails]);

  if (isLoading) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 4, mb: 4 }} />
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Skeleton variant="rectangular" height={500} sx={{ borderRadius: 3 }} />
          </Grid>
          <Grid item xs={12} md={8}>
            <Skeleton variant="text" width="60%" height={40} />
            <Skeleton variant="text" width="40%" height={24} sx={{ my: 2 }} />
            <Skeleton variant="rectangular" height={150} sx={{ borderRadius: 2, my: 2 }} />
          </Grid>
        </Grid>
      </Container>
    );
  }

  if (error || !movie) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{ mb: 3, fontWeight: 600 }}
        >
          Back
        </Button>
        <ErrorState
          title="Movie Details Unavailable"
          message={error || 'Could not find details for the requested movie.'}
          onRetry={fetchDetails}
        />
      </Container>
    );
  }

  const {
    title,
    poster_path,
    backdrop_path,
    overview,
    release_date,
    runtime,
    vote_average,
    vote_count,
    genres = [],
    credits,
    videos,
    recommendations,
  } = movie;

  const backdropUrl = getBackdropUrl(backdrop_path, 'w1280');
  const posterUrl = getImageUrl(poster_path, 'w500');
  const releaseYear = formatDate(release_date, true);
  const formattedDate = formatDate(release_date);
  const formattedRuntime = formatRuntime(runtime);
  const ratingText = formatRating(vote_average);
  const isFav = isFavorite(movie.id);

  // Find trailer video
  const trailerVideo = videos?.results?.find(
    (v) => (v.type === 'Trailer' || v.type === 'Teaser') && v.site === 'YouTube'
  );

  const castList = credits?.cast?.slice(0, 10) || [];
  const recommendedMovies = recommendations?.results?.slice(0, 4) || [];

  return (
    <Box sx={{ pb: 8 }}>
      {/* Hero Backdrop Header with Absolute Top-Left Back Button */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          minHeight: { xs: 280, sm: 380, md: 440 },
          backgroundImage: backdropUrl ? `url(${backdropUrl})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center 20%',
          backgroundColor: '#0a0d14',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: (theme) =>
              theme.palette.mode === 'dark'
                ? 'linear-gradient(to bottom, rgba(15,18,29,0.45) 0%, rgba(15,18,29,0.95) 85%, #0f121d 100%)'
                : 'linear-gradient(to bottom, rgba(244,246,249,0.45) 0%, rgba(244,246,249,0.95) 85%, #f4f6f9 100%)',
          },
        }}
      >
        {/* Top-Left Floating Back Button */}
        <Box sx={{ position: 'absolute', top: { xs: 16, sm: 24 }, left: { xs: 16, sm: 32 }, zIndex: 10 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
            variant="contained"
            sx={{
              backgroundColor: 'rgba(0,0,0,0.65)',
              backdropFilter: 'blur(10px)',
              color: '#ffffff',
              fontWeight: 700,
              borderRadius: 2.5,
              px: 2.5,
              py: 1,
              border: '1px solid rgba(255,255,255,0.2)',
              boxShadow: '0 4px 16px rgba(0,0,0,0.35)',
              textTransform: 'none',
              fontSize: '0.95rem',
              '&:hover': {
                backgroundColor: 'rgba(0,0,0,0.85)',
                transform: 'translateY(-1px)',
              },
            }}
          >
            Back
          </Button>
        </Box>
      </Box>

      {/* Main Details Section */}
      <Container maxWidth="xl" sx={{ mt: { xs: -8, md: -14 }, position: 'relative', zIndex: 3 }}>
        <Grid container spacing={{ xs: 3, md: 4 }}>
          {/* Poster Column - Fixed 2:3 Aspect Ratio Container */}
          <Grid item xs={12} sm={4} md={3.5}>
            <Paper
              elevation={0}
              sx={{
                position: 'relative',
                width: '100%',
                aspectRatio: '2 / 3',
                borderRadius: 4,
                overflow: 'hidden',
                border: (t) => `1px solid ${t.palette.divider}`,
                boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                backgroundColor: '#12151e',
              }}
            >
              <Box
                component="img"
                src={posterUrl}
                alt={`Poster for ${title}`}
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </Paper>
          </Grid>

          {/* Metadata Column */}
          <Grid item xs={12} sm={8} md={8.5}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {/* Title & Favorite Button */}
              <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 2 }}>
                <Typography variant="h3" component="h1" fontWeight={900} color="text.primary">
                  {title} {releaseYear !== 'N/A' && `(${releaseYear})`}
                </Typography>
                <Tooltip title={isFav ? 'Remove from Favorites' : 'Add to Favorites'}>
                  <IconButton
                    onClick={() => toggleFavorite(movie)}
                    aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
                    sx={{
                      backgroundColor: isFav ? 'rgba(229, 9, 20, 0.15)' : 'rgba(255, 255, 255, 0.08)',
                      color: isFav ? 'primary.main' : 'text.primary',
                      p: 1.5,
                      borderRadius: 3,
                      border: (t) => `1px solid ${t.palette.divider}`,
                      '&:hover': {
                        backgroundColor: 'rgba(229, 9, 20, 0.25)',
                      },
                    }}
                  >
                    {isFav ? <FavoriteIcon fontSize="large" /> : <FavoriteBorderIcon fontSize="large" />}
                  </IconButton>
                </Tooltip>
              </Box>

              {/* Genres */}
              <Stack direction="row" spacing={1} useFlexGap sx={{ my: 0.5, flexWrap: 'wrap' }}>
                {genres.map((g) => (
                  <Chip
                    key={g.id}
                    label={g.name}
                    variant="outlined"
                    size="small"
                    sx={{ fontWeight: 600, borderRadius: 2 }}
                  />
                ))}
              </Stack>

              {/* Rating, Date, Runtime stats bar */}
              <Stack direction="row" spacing={{ xs: 2, sm: 4 }} alignItems="center" sx={{ my: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                  <StarIcon sx={{ color: '#f59e0b', fontSize: 24 }} />
                  <Typography variant="h6" fontWeight={800} color="text.primary">
                    {ratingText}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    / 10 ({vote_count?.toLocaleString() || 0} votes)
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                  <CalendarTodayIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                  <Typography variant="body1" fontWeight={600} color="text.primary">
                    {formattedDate}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                  <AccessTimeIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                  <Typography variant="body1" fontWeight={600} color="text.primary">
                    {formattedRuntime}
                  </Typography>
                </Box>
              </Stack>

              <Divider sx={{ my: 1 }} />

              {/* Overview */}
              <Box>
                <Typography variant="h6" fontWeight={700} gutterBottom color="text.primary">
                  Overview
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7, fontSize: '1.05rem' }}>
                  {overview || 'No synopsis is available for this movie.'}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Official Trailer Section (Full Width Theater Player) */}
        {trailerVideo && (
          <Box sx={{ mt: 5 }}>
            <Typography
              variant="h5"
              fontWeight={800}
              gutterBottom
              color="text.primary"
              sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}
            >
              <MovieIcon color="primary" /> Official Trailer
            </Typography>
            <Paper
              elevation={0}
              sx={{
                position: 'relative',
                width: '100%',
                maxWidth: 960,
                aspectRatio: '16 / 9',
                borderRadius: 3.5,
                overflow: 'hidden',
                border: (t) => `1px solid ${t.palette.divider}`,
                backgroundColor: '#000',
                boxShadow: '0 16px 40px rgba(0,0,0,0.4)',
              }}
            >
              <iframe
                title={`${title} Official Trailer`}
                src={`https://www.youtube.com/embed/${trailerVideo.key}?enablejsapi=1&rel=0`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 0,
                }}
              />
            </Paper>
          </Box>
        )}

        {/* Top Cast Section (2 Compact Columns on Mobile, 6 Columns on Desktop) */}
        {castList.length > 0 && (
          <Box sx={{ mt: 5 }}>
            <Typography variant="h5" fontWeight={800} gutterBottom color="text.primary" sx={{ mb: 2 }}>
              Top Cast
            </Typography>
            <Grid container spacing={{ xs: 1.5, sm: 2 }}>
              {castList.map((actor) => (
                <Grid item key={actor.id} xs={6} sm={4} md={3} lg={2}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: { xs: 1, sm: 1.25 },
                      display: 'flex',
                      alignItems: 'center',
                      gap: { xs: 1, sm: 1.25 },
                      borderRadius: 2.5,
                      border: (t) => `1px solid ${t.palette.divider}`,
                      backgroundColor: (t) => (t.palette.mode === 'dark' ? '#181c2b' : '#ffffff'),
                      transition: 'transform 0.2s ease, boxShadow 0.2s ease',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                      },
                    }}
                  >
                    <Avatar
                      src={getProfileUrl(actor.profile_path, 'w185')}
                      alt={actor.name}
                      sx={{ width: { xs: 34, sm: 42 }, height: { xs: 34, sm: 42 } }}
                    />
                    <Box sx={{ overflow: 'hidden' }}>
                      <Typography
                        variant="subtitle2"
                        fontWeight={700}
                        noWrap
                        color="text.primary"
                        sx={{ fontSize: { xs: '0.75rem', sm: '0.85rem' } }}
                      >
                        {actor.name}
                      </Typography>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        noWrap
                        display="block"
                        sx={{ fontSize: { xs: '0.675rem', sm: '0.75rem' } }}
                      >
                        {actor.character}
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* Recommended Movies Section */}
        {recommendedMovies.length > 0 && (
          <Box sx={{ mt: 5 }}>
            <Typography variant="h5" fontWeight={800} gutterBottom color="text.primary" sx={{ mb: 2 }}>
              You Might Also Like
            </Typography>
            <MovieGrid
              movies={recommendedMovies}
              isFavoriteFunc={isFavorite}
              onToggleFavorite={toggleFavorite}
            />
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default MovieDetailsPage;
