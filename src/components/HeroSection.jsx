import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Container, useTheme, Skeleton, Paper } from '@mui/material';
import { movieService } from '../services/movieService';
import { getBackdropUrl } from '../utils/imageUrl';

// High quality, reliable fallback YouTube movie trailers
const FALLBACK_TRAILERS = [
  { key: 'WayL9tucgw8', title: 'Dune: Part Two' },
  { key: 'L3oOldViIgY', title: 'Spider-Man: No Way Home' },
  { key: 'YoHD9XEInc0', title: 'Inception' },
  { key: 'd9MyW72ELq0', title: 'Avatar: The Way of Water' },
];

export const HeroSection = ({ movies = [] }) => {
  const theme = useTheme();
  const heroRef = useRef(null);
  const iframeRef = useRef(null);

  const [trailerKey, setTrailerKey] = useState(FALLBACK_TRAILERS[0].key);
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [isLoadingTrailer, setIsLoadingTrailer] = useState(true);

  // Load a random movie trailer on mount or when movies arrive
  useEffect(() => {
    let isMounted = true;

    const selectMovieTrailer = async () => {
      try {
        setIsLoadingTrailer(true);
        let list = movies;

        if (!list || list.length === 0) {
          const trendingData = await movieService.getTrending(1);
          list = trendingData?.results || [];
        }

        if (list && list.length > 0) {
          const candidates = [...list].sort(() => 0.5 - Math.random()).slice(0, 4);

          for (const movieItem of candidates) {
            try {
              const detailsData = await movieService.getMovieDetails(movieItem.id);
              const vList = detailsData?.videos?.results || [];

              const trailer =
                vList.find((v) => v.type === 'Trailer' && v.site === 'YouTube') ||
                vList.find((v) => v.site === 'YouTube');

              if (trailer?.key) {
                if (isMounted) {
                  setFeaturedMovie(movieItem);
                  setTrailerKey(trailer.key);
                  setIsLoadingTrailer(false);
                }
                return;
              }
            } catch (itemErr) {
              console.warn('Skipping trailer candidate:', itemErr);
            }
          }

          if (isMounted && list[0]) {
            setFeaturedMovie(list[0]);
          }
        }

        if (isMounted) {
          const fallback = FALLBACK_TRAILERS[Math.floor(Math.random() * FALLBACK_TRAILERS.length)];
          setTrailerKey(fallback.key);
        }
      } catch (err) {
        console.warn('Failed to load hero background trailer:', err);
      } finally {
        if (isMounted) setIsLoadingTrailer(false);
      }
    };

    selectMovieTrailer();

    return () => {
      isMounted = false;
    };
  }, [movies.length > 0 ? movies : null]);

  // IntersectionObserver to auto-pause video when scrolled out of view
  useEffect(() => {
    let hasIntersectedOnce = false;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!iframeRef.current || !iframeRef.current.contentWindow) return;
          try {
            if (!entry.isIntersecting && hasIntersectedOnce) {
              iframeRef.current.contentWindow.postMessage(
                JSON.stringify({ event: 'command', func: 'pauseVideo', args: '' }),
                '*'
              );
            } else if (entry.isIntersecting) {
              hasIntersectedOnce = true;
              iframeRef.current.contentWindow.postMessage(
                JSON.stringify({ event: 'command', func: 'playVideo', args: '' }),
                '*'
              );
            }
          } catch (e) {
            // Ignore cross-origin warnings
          }
        });
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const backdropUrl = featuredMovie ? getBackdropUrl(featuredMovie.backdrop_path, 'w780') : '';
  const displayTitle = featuredMovie ? featuredMovie.title : 'Featured Blockbuster';

  return (
    <Box
      ref={heroRef}
      sx={{
        position: 'relative',
        width: '100%',
        mb: { xs: 3, sm: 5 },
        py: { xs: 1, sm: 3 },
        border: 'none',
        outline: 'none',
        boxShadow: 'none',
        backgroundColor: 'transparent',
      }}
    >
      <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3 } }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: { xs: 3, md: 4 },
            width: '100%',
          }}
        >
          {/* Headline & Description (On TOP in mobile, LEFT in desktop) */}
          <Box
            sx={{
              flex: { xs: '1 1 100%', md: '0 0 45%' },
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              textAlign: { xs: 'center', md: 'left' },
            }}
          >
            <Typography
              variant="h3"
              component="h1"
              fontWeight={900}
              gutterBottom
              sx={{
                background: 'linear-gradient(135deg, #e50914 0%, #ff5252 50%, #00d2ff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-0.03em',
                fontSize: { xs: '1.85rem', sm: '2.4rem', md: '3rem' },
                lineHeight: 1.15,
                mb: 2,
              }}
            >
              Discover Millions of Movies
            </Typography>

            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{
                fontSize: { xs: '0.95rem', sm: '1.05rem' },
                lineHeight: 1.65,
                maxWidth: 520,
                mx: { xs: 'auto', md: 0 },
              }}
            >
              Explore current trending blockbusters, watch live trailers in real-time, filter by genre or rating, and curate your personal watchlist.
            </Typography>
          </Box>

          {/* Embedded Trailer Video Container (BELOW text in mobile, RIGHT in desktop) */}
          <Box
            sx={{
              flex: { xs: '1 1 100%', md: '0 0 52%' },
              width: '100%',
            }}
          >
            <Paper
              elevation={0}
              sx={{
                position: 'relative',
                width: '100%',
                aspectRatio: '16 / 9',
                borderRadius: 3,
                overflow: 'hidden',
                border: 'none',
                backgroundColor: '#05070a',
                backgroundImage: backdropUrl ? `url(${backdropUrl})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                boxShadow:
                  theme.palette.mode === 'dark'
                    ? '0 12px 32px rgba(0, 0, 0, 0.6), 0 0 24px rgba(229, 9, 20, 0.25)'
                    : '0 12px 32px rgba(0, 0, 0, 0.12)',
              }}
            >
              {isLoadingTrailer ? (
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height="100%"
                  animation="wave"
                  sx={{ bgcolor: 'rgba(255,255,255,0.05)' }}
                />
              ) : (
                <iframe
                  ref={iframeRef}
                  title={`${displayTitle} Trailer`}
                  src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&controls=0&loop=1&playlist=${trailerKey}&enablejsapi=1&rel=0`}
                  allow="autoplay; encrypted-media; picture-in-picture"
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
              )}

              {/* Now Playing Badge */}
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 12,
                  right: 12,
                  zIndex: 4,
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  backdropFilter: 'blur(8px)',
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 2,
                  border: '1px solid rgba(255,255,255,0.15)',
                  pointerEvents: 'none',
                }}
              >
                <Typography variant="caption" fontWeight={700} color="#ffffff" sx={{ fontSize: '0.75rem' }}>
                  Now Playing: {displayTitle}
                </Typography>
              </Box>
            </Paper>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSection;
