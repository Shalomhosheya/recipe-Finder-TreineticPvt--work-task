// AddRecipePage.tsx
import React, { useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import AddRecipe from '../component/AddRecipe';
import { useNavigate } from 'react-router-dom';

interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
  strIngredient1: string;
  strCategory?: string;
  strArea?: string;
}

interface AddRecipePageProps {
  onAdd: (newRecipe: Recipe) => void;
}

const AddRecipePage: React.FC<AddRecipePageProps> = ({ onAdd }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/login');
    }
  }, [navigate]);

  const handleAddRecipe = (newRecipe: Recipe) => {
    onAdd(newRecipe);
    navigate('/');
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
