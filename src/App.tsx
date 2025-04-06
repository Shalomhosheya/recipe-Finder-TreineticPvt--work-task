import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AddRecipePage from './pages/AddRecipePage';
import Recipe from './data/Recipe';

const App = () => {
  // Define state with the customRecipes type as an array of Recipe objects
  const [customRecipes, setCustomRecipes] = useState<Recipe[]>([]);

  const handleAddRecipe = (newRecipe: Recipe) => {
    setCustomRecipes([...customRecipes, newRecipe]);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard onAdd={handleAddRecipe} />} />
        <Route path="/add-recipe" element={<AddRecipePage onAdd={handleAddRecipe} />} />
      </Routes>
    </Router>
  );
};

export default App;
