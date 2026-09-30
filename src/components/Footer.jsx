import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Link,
  Stack,
  IconButton,
  Tooltip,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  useTheme,
} from '@mui/material';
import MovieFilterIcon from '@mui/icons-material/MovieFilter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import SecurityIcon from '@mui/icons-material/Security';

// Official X (formerly Twitter) Icon SVG
const XIcon = (props) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export const Footer = () => {
  const theme = useTheme();
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);

  const socialLinks = [
    { name: 'X', icon: <XIcon />, url: 'https://x.com' },
    { name: 'YouTube', icon: <YouTubeIcon fontSize="small" />, url: 'https://youtube.com' },
    { name: 'Instagram', icon: <InstagramIcon fontSize="small" />, url: 'https://instagram.com' },
  ];

  return (
    <Box
      component="footer"
      sx={{
        mt: 'auto',
        borderTop: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.mode === 'dark' ? '#0a0d14' : '#f8fafc',
        py: { xs: 4, md: 5 },
      }}
    >
      <Container maxWidth="xl">
        {/* Main Footer Row: Brand, Socials & Legal */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 3,
            pb: 3,
          }}
        >
          {/* Brand Logo & Name */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box
              sx={{
                width: 34,
                height: 34,
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #e50914 0%, #ff5252 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
              }}
            >
              <MovieFilterIcon fontSize="small" />
            </Box>
            <Typography variant="h6" fontWeight={800} color="text.primary" sx={{ letterSpacing: '-0.02em' }}>
              MovieExplorer
            </Typography>
          </Box>

          {/* Social Icons */}
          <Stack direction="row" spacing={1.5} alignItems="center">
            {socialLinks.map((item) => (
              <Tooltip key={item.name} title={item.name}>
                <IconButton
                  component="a"
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="small"
                  sx={{
                    color: 'text.secondary',
                    borderRadius: 2,
                    border: `1px solid ${theme.palette.divider}`,
                    p: 1,
                    transition: 'color 0.2s ease, transform 0.2s ease',
                    '&:hover': {
                      color: 'primary.main',
                      transform: 'translateY(-2px)',
                      backgroundColor: theme.palette.mode === 'dark' ? 'rgba(229, 9, 20, 0.15)' : 'rgba(229, 9, 20, 0.08)',
                    },
                  }}
                >
                  {item.icon}
                </IconButton>
              </Tooltip>
            ))}
          </Stack>

          {/* Legal / Policy Links */}
          <Stack direction="row" spacing={3} alignItems="center">
            <Link
              component="button"
              variant="body2"
              onClick={() => setPrivacyOpen(true)}
              color="text.secondary"
              underline="hover"
              sx={{ fontWeight: 600, fontSize: '0.875rem' }}
            >
              Privacy Agreement
            </Link>
            <Link
              component="button"
              variant="body2"
              onClick={() => setTermsOpen(true)}
              color="text.secondary"
              underline="hover"
              sx={{ fontWeight: 600, fontSize: '0.875rem' }}
            >
              Terms of Service
            </Link>
          </Stack>
        </Box>

        <Divider sx={{ opacity: 0.6, my: 1 }} />

        {/* Bottom Attribution & Copyright Row */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 1.5,
            pt: 2.5,
          }}
        >
          <Typography variant="caption" color="text.secondary">
            © {new Date().getFullYear()} MovieExplorer. All rights reserved.
          </Typography>

          <Typography variant="caption" color="text.secondary">
            Powered by{' '}
            <Link
              href="https://www.themoviedb.org/"
              target="_blank"
              rel="noopener noreferrer"
              color="primary"
              underline="hover"
              fontWeight={600}
            >
              TMDb API
            </Link>
          </Typography>
        </Box>
      </Container>

      {/* Privacy Agreement Dialog */}
      <Dialog
        open={privacyOpen}
        onClose={() => setPrivacyOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3.5,
            p: 1,
            backgroundColor: theme.palette.mode === 'dark' ? '#181c2b' : '#ffffff',
          },
        }}
      >
        <DialogTitle fontWeight={800} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <SecurityIcon color="primary" /> Privacy Agreement
        </DialogTitle>
        <DialogContent dividers>
          <Typography variant="body2" paragraph color="text.secondary" sx={{ lineHeight: 1.6 }}>
            MovieExplorer respects user privacy. Preferences (theme mode and favorite movies) are stored locally in your browser's <code>localStorage</code>.
          </Typography>
          <Typography variant="body2" paragraph color="text.secondary" sx={{ lineHeight: 1.6 }}>
            No user metrics or personal data are collected or shared with external servers. Movie data is provided via the official TMDb API.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPrivacyOpen(false)} variant="contained" sx={{ borderRadius: 2, px: 3, fontWeight: 700 }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Terms of Service Dialog */}
      <Dialog
        open={termsOpen}
        onClose={() => setTermsOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3.5,
            p: 1,
            backgroundColor: theme.palette.mode === 'dark' ? '#181c2b' : '#ffffff',
          },
        }}
      >
        <DialogTitle fontWeight={800}>Terms of Service</DialogTitle>
        <DialogContent dividers>
          <Typography variant="body2" paragraph color="text.secondary" sx={{ lineHeight: 1.6 }}>
            MovieExplorer is a frontend discovery application built for demonstration purposes. All posters and movie metadata belong to TMDb and their respective copyright holders.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setTermsOpen(false)} variant="contained" sx={{ borderRadius: 2, px: 3, fontWeight: 700 }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Footer;
