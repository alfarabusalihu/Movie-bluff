import React from 'react';
import { Paper, Typography, Box, Button } from '@mui/material';
import SearchOffIcon from '@mui/icons-material/SearchOff';

export const EmptyState = ({
  title = 'No Movies Found',
  message = 'We couldn\'t find any movies matching your search criteria. Try adjusting your query or filters.',
  actionLabel,
  onAction,
}) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 4, sm: 6 },
        textAlign: 'center',
        borderRadius: 4,
        border: (theme) => `1px solid ${theme.palette.divider}`,
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#181c2b' : '#ffffff',
        my: 4,
      }}
    >
      <Box
        sx={{
          width: 72,
          height: 72,
          borderRadius: '50%',
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)',
          color: 'text.secondary',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 2,
        }}
      >
        <SearchOffIcon sx={{ fontSize: 40 }} />
      </Box>

      <Typography variant="h6" fontWeight={700} gutterBottom color="text.primary">
        {title}
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 460, mx: 'auto', mb: actionLabel ? 3 : 0 }}>
        {message}
      </Typography>

      {actionLabel && onAction && (
        <Button
          variant="contained"
          onClick={onAction}
          sx={{ borderRadius: 2, px: 3, fontWeight: 600 }}
        >
          {actionLabel}
        </Button>
      )}
    </Paper>
  );
};

export default EmptyState;
