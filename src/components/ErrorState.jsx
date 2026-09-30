import React from 'react';
import { Paper, Typography, Button, Box } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/Error';
import RefreshIcon from '@mui/icons-material/Refresh';

export const ErrorState = ({
  title = 'Failed to Load Movies',
  message = 'We encountered an error connecting to the movie database. Please try again.',
  onRetry,
}) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 3, sm: 5 },
        textAlign: 'center',
        borderRadius: 4,
        border: (theme) => `1px dashed ${theme.palette.error.main}`,
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? 'rgba(239, 68, 68, 0.05)' : 'rgba(239, 68, 68, 0.03)',
        my: 4,
      }}
    >
      <Box
        sx={{
          width: 64,
          height: 64,
          borderRadius: '50%',
          backgroundColor: 'rgba(239, 68, 68, 0.12)',
          color: 'error.main',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 2,
        }}
      >
        <ErrorOutlineIcon sx={{ fontSize: 36 }} />
      </Box>

      <Typography variant="h6" fontWeight={700} gutterBottom color="text.primary">
        {title}
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 480, mx: 'auto', mb: 3 }}>
        {message}
      </Typography>

      {onRetry && (
        <Button
          variant="outlined"
          color="error"
          startIcon={<RefreshIcon />}
          onClick={onRetry}
          sx={{ borderRadius: 2, px: 3, fontWeight: 600 }}
        >
          Try Again
        </Button>
      )}
    </Paper>
  );
};

export default ErrorState;
