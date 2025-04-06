// Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Card, CardMedia, CardContent, CircularProgress, Button } from '@mui/material';
import SearchBar from '../component/SearchBar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AddRecipe from '../component/AddRecipe';

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [customRecipes, setCustomRecipes] = useState([]);

  const handleAddRecipe = (newRecipe) => {
    setCustomRecipes([...customRecipes, newRecipe]);
  };

  const allRecipes = [...customRecipes, ...recipes];
  const navigate = useNavigate();

  const fetchRecipes = async (query) => {
    try {
      setLoading(true);
      const res = await axios.get(`/search.php?s=${query}`);
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

  return (
    <Box sx={{ padding: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        🍽️ Recipe Finder
      </Typography>

      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={3}>
          {allRecipes.length > 0 ? (
            allRecipes.map((recipe) => (
              <Grid item key={recipe.idMeal} xs={12} sm={6} md={4}>
                <Card sx={{ cursor: 'pointer' }} onClick={() => navigate(`/recipe/${recipe.idMeal}`)}>
                  <CardMedia component="img" height="180" image={recipe.strMealThumb} alt={recipe.strMeal} />
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {recipe.strMeal}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Category: {recipe.strCategory || 'Custom'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Area: {recipe.strArea || 'N/A'}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography>No recipes found.</Typography>
          )}
        </Grid>
      )}

      <Button variant="contained" sx={{ mt: 4 }} onClick={() => navigate('/add-recipe')}>
        Add New Recipe
      </Button>
    </Box>
  );
};

export default Dashboard;
