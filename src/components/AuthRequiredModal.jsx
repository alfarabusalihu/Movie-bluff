import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

export const AuthRequiredModal = ({ open, onClose }) => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    onClose();
    navigate('/login');
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 4,
          p: 2,
          textAlign: 'center',
          border: (t) => `1px solid ${t.palette.divider}`,
          backgroundColor: (t) => (t.palette.mode === 'dark' ? '#181c2b' : '#ffffff'),
        },
      }}
    >
      <Box
        sx={{
          width: 60,
          height: 60,
          borderRadius: '50%',
          backgroundColor: 'rgba(229, 9, 20, 0.12)',
          color: 'primary.main',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mx: 'auto',
          mt: 2,
          mb: 1,
        }}
      >
        <LockOutlinedIcon sx={{ fontSize: 32 }} />
      </Box>

      <DialogTitle fontWeight={800} sx={{ pb: 1, fontSize: '1.4rem' }}>
        Sign In Required
      </DialogTitle>

      <DialogContent>
        <Typography variant="body2" color="text.secondary">
          Only logged-in users can save movies to their favorites list. Please sign in to build your personal watchlist.
        </Typography>
      </DialogContent>

      <DialogActions sx={{ justifyContent: 'center', gap: 1.5, pb: 2, px: 3 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{ borderRadius: 2.5, px: 3, fontWeight: 600 }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleLoginClick}
          variant="contained"
          sx={{
            borderRadius: 2.5,
            px: 3,
            fontWeight: 700,
            boxShadow: '0 4px 14px rgba(229, 9, 20, 0.4)',
          }}
        >
          Sign In Now
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AuthRequiredModal;
