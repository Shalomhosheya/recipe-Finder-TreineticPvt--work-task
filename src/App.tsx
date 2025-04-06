import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AddRecipePage from './pages/AddRecipePage';
import RecipeDetails from './pages/RecipeDetail';
import { Box } from '@mui/material';

interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
  strIngredient1: string;
  strCategory?: string;
  strArea?: string;
}

const App = () => {
  const [customRecipes, setCustomRecipes] = useState<Recipe[]>([]);

  const handleAddRecipe = (newRecipe: Recipe) => {
    setCustomRecipes((prevRecipes) => [...prevRecipes, newRecipe]);
  };

  return (
    <Router>
      <Box sx={{ padding: '2rem' }}>
        <Routes>
          <Route path="/dashboard" element={<Dashboard customRecipes={customRecipes} onAdd={handleAddRecipe} />} />
          <Route path="/add-recipe" element={<AddRecipePage onAdd={handleAddRecipe} />} />
          <Route path="/recipe/:id" element={<RecipeDetails customRecipes={customRecipes} />} />
        </Routes>
      </Box>
    </Router>
  );
};

export default App;
