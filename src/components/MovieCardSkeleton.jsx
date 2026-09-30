import React from 'react';
import { Card, Skeleton, Box } from '@mui/material';

export const MovieCardSkeleton = () => {
  return (
    <Card
      elevation={0}
      sx={{
        width: '100%',
        aspectRatio: '2 / 3',
        position: 'relative',
        borderRadius: 3.5,
        overflow: 'hidden',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        backgroundColor: '#0d1017',
      }}
    >
      {/* Skeleton Poster Image */}
      <Skeleton
        variant="rectangular"
        animation="wave"
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      />

      {/* Bottom Overlay Skeleton */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          p: 2,
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
        }}
      >
        <Skeleton variant="text" width="85%" height={24} animation="wave" sx={{ bgcolor: 'rgba(255,255,255,0.2)' }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <Skeleton variant="rectangular" width={45} height={20} borderRadius={4} animation="wave" sx={{ bgcolor: 'rgba(255,255,255,0.2)' }} />
          <Skeleton variant="text" width={35} height={18} animation="wave" sx={{ bgcolor: 'rgba(255,255,255,0.2)' }} />
        </Box>
      </Box>
    </Card>
  );
};

export default MovieCardSkeleton;
