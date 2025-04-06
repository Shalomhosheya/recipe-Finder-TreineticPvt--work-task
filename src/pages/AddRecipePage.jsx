// AddRecipePage.jsx
import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import AddRecipe from '../component/AddRecipe';
import { useNavigate } from 'react-router-dom';

const AddRecipePage = ({ onAdd }) => {
  const navigate = useNavigate();

  const handleAddRecipe = (newRecipe) => {
    onAdd(newRecipe); // Pass the new recipe to the parent Dashboard component
    navigate('/'); // Navigate back to the dashboard after adding the recipe
  };

  return (
    <Box sx={{ padding: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        Add a New Recipe
      </Typography>
      <AddRecipe onAdd={handleAddRecipe} />
      <Button sx={{ mt: 2 }} variant="contained" onClick={() => navigate('/')}>
        Go to Dashboard
      </Button>
    </Box>
  );
};

export default AddRecipePage;
