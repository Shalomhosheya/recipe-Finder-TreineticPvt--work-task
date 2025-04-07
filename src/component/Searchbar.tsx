// components/SearchBar.jsx
import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <TextField
      variant="outlined"
      placeholder="Search recipes..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      fullWidth
      sx={{ mb: 4 }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon color="action" />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchBar;
