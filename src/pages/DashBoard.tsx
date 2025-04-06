import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Card, CardMedia, CardContent, CircularProgress, Button } from '@mui/material';
import SearchBar from '../component/SearchBar';
import axios from 'axios';
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

interface DashboardProps {
  customRecipes: Recipe[];
  onAdd: (newRecipe: Recipe) => void;
}

import FilterSection from '../component/FilterSection'; // Import it

const Dashboard = ({ customRecipes }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const navigate = useNavigate();

  const fetchRecipes = async (query) => {
    try {
      setLoading(true);
      const res = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
      setRecipes(res.data.meals || []);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes(searchQuery);
  }, [searchQuery]);

  // Combine custom and API recipes
  const allRecipes = [...customRecipes, ...recipes];

  // Filter based on category
  const filteredRecipes = selectedCategory
    ? allRecipes.filter((r) => r.strCategory === selectedCategory)
    : allRecipes;

  return (
    <Box sx={{ padding: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        🍽️ Recipe Finder
      </Typography>

      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <FilterSection selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />

      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={3}>
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe) => (
              <Grid item key={recipe.idMeal} xs={12} sm={6} md={4}>
                <Card onClick={() => navigate(`/recipe/${recipe.idMeal}`)} sx={{ cursor: 'pointer' }}>
                  <CardMedia component="img" height="180" image={recipe.strMealThumb} alt={recipe.strMeal} />
                  <CardContent>
                    <Typography variant="h6">{recipe.strMeal}</Typography>
                    <Typography variant="body2">Category: {recipe.strCategory || 'Custom'}</Typography>
                    <Typography variant="body2">Area: {recipe.strArea || 'N/A'}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography>No recipes found.</Typography>
          )}
        </Grid>
      )}
    </Box>
  );
};

export default Dashboard;
