import React from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Stack,
  Paper,
  Typography,
} from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';

export const MovieFilters = ({
  genres = [],
  selectedGenre = '',
  selectedYear = '',
  selectedMinRating = '',
  onGenreChange,
  onYearChange,
  onMinRatingChange,
  onClearFilters,
}) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i);
  const ratingOptions = [
    { label: 'Any Rating', value: '' },
    { label: '7.0+ (Great)', value: '7' },
    { label: '8.0+ (Top Rated)', value: '8' },
    { label: '5.0+ (Average)', value: '5' },
  ];

  const hasActiveFilters = Boolean(selectedGenre || selectedYear || selectedMinRating);

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2.5,
        mb: 4,
        borderRadius: 3,
        border: (t) => `1px solid ${t.palette.divider}`,
        backgroundColor: (t) => (t.palette.mode === 'dark' ? '#181c2b' : '#ffffff'),
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <FilterAltIcon color="primary" fontSize="small" />
          <Typography variant="subtitle2" fontWeight={700} color="text.primary">
            Filter Movies
          </Typography>
        </Box>
        {hasActiveFilters && (
          <Button
            size="small"
            startIcon={<FilterAltOffIcon />}
            onClick={onClearFilters}
            color="secondary"
            sx={{ fontWeight: 600, fontSize: '0.8rem' }}
          >
            Clear Filters
          </Button>
        )}
      </Box>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
        {/* Genre Selector */}
        <FormControl fullWidth size="small">
          <InputLabel id="genre-select-label">Genre</InputLabel>
          <Select
            labelId="genre-select-label"
            id="genre-select"
            value={selectedGenre}
            label="Genre"
            onChange={(e) => onGenreChange(e.target.value)}
          >
            <MenuItem value="">
              <em>All Genres</em>
            </MenuItem>
            {genres.map((g) => (
              <MenuItem key={g.id} value={g.id}>
                {g.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Release Year Selector */}
        <FormControl fullWidth size="small">
          <InputLabel id="year-select-label">Release Year</InputLabel>
          <Select
            labelId="year-select-label"
            id="year-select"
            value={selectedYear}
            label="Release Year"
            onChange={(e) => onYearChange(e.target.value)}
          >
            <MenuItem value="">
              <em>All Years</em>
            </MenuItem>
            {years.map((y) => (
              <MenuItem key={y} value={y}>
                {y}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Rating Selector */}
        <FormControl fullWidth size="small">
          <InputLabel id="rating-select-label">Min Rating</InputLabel>
          <Select
            labelId="rating-select-label"
            id="rating-select"
            value={selectedMinRating}
            label="Min Rating"
            onChange={(e) => onMinRatingChange(e.target.value)}
          >
            {ratingOptions.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
    </Paper>
  );
};

export default MovieFilters;
