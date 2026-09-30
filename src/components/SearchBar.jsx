import React from 'react';
import { Paper, InputBase, IconButton, Tooltip, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

export const SearchBar = ({
  value = '',
  onChange,
  onSearch,
  onClear,
  placeholder = 'Search movies by title...',
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
      <Paper
        elevation={0}
        sx={{
          p: '4px 8px',
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          borderRadius: '14px',
          border: (theme) => `1px solid ${theme.palette.divider}`,
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark' ? '#181c2b' : '#ffffff',
          transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
          '&:focus-within': {
            borderColor: 'primary.main',
            boxShadow: '0 0 0 3px rgba(229, 9, 20, 0.25)',
          },
        }}
      >
        <IconButton
          type="submit"
          sx={{ p: '10px', color: 'primary.main' }}
          aria-label="submit search"
        >
          <SearchIcon />
        </IconButton>

        <InputBase
          sx={{ ml: 1, flex: 1, fontSize: '1rem', fontWeight: 500 }}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          inputProps={{
            'aria-label': placeholder,
            id: 'movie-search-input',
          }}
        />

        {value && (
          <Tooltip title="Clear search">
            <IconButton
              onClick={() => {
                if (onChange) onChange('');
                if (onClear) onClear();
              }}
              sx={{ p: '10px', color: 'text.secondary' }}
              aria-label="clear search text"
            >
              <ClearIcon />
            </IconButton>
          </Tooltip>
        )}
      </Paper>
    </Box>
  );
};

export default SearchBar;
