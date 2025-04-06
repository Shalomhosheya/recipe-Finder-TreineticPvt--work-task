import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Card, CardMedia, CardContent, CircularProgress } from '@mui/material';
import SearchBar from '../component/SearchBar';
import axios from 'axios';

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('Arrabiata');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRecipes = async (query) => {
    try {
      setLoading(true);
      const res = await axios.get(`/search.php?s=${query}`);
      setRecipes(res.data.meals || []); // If no meals, fallback to empty array
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
          {recipes.length > 0 ? (
            recipes.map((recipe) => (
              <Grid item key={recipe.idMeal} xs={12} sm={6} md={4}>
                <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
                  <CardMedia
                    component="img"
                    height="180"
                    image={recipe.strMealThumb}
                    alt={recipe.strMeal}
                  />
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {recipe.strMeal}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Category: {recipe.strCategory}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Area: {recipe.strArea}
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
    </Box>
  );
};

export default Dashboard;
