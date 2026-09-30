import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Container, Typography, Box, Button, Paper } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';

export const NotFoundPage = () => {
  return (
    <Container maxWidth="md" sx={{ py: 10, display: 'flex', justifyContent: 'center' }}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 4, sm: 6 },
          textAlign: 'center',
          borderRadius: 4,
          border: (t) => `1px solid ${t.palette.divider}`,
          maxWidth: 550,
          width: '100%',
        }}
      >
        <Box
          sx={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            backgroundColor: 'rgba(229, 9, 20, 0.1)',
            color: 'primary.main',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 3,
          }}
        >
          <LocalMoviesIcon sx={{ fontSize: 40 }} />
        </Box>
        <Typography
          variant="h1"
          sx={{
            fontSize: '4rem',
            fontWeight: 900,
            background: 'linear-gradient(90deg, #e50914 0%, #ff6b6b 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 1,
          }}
        >
          404
        </Typography>
        <Typography variant="h5" fontWeight={700} gutterBottom color="text.primary">
          Page Not Found
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          The movie, page, or resource you are looking for doesn't exist or may have been moved.
        </Typography>
        <Button
          component={RouterLink}
          to="/"
          variant="contained"
          size="large"
          startIcon={<HomeIcon />}
          sx={{
            py: 1.5,
            px: 4,
            fontWeight: 700,
            boxShadow: '0 8px 20px rgba(229, 9, 20, 0.3)',
          }}
        >
          Back to Home
        </Button>
      </Paper>
    </Container>
  );
};

export default NotFoundPage;
