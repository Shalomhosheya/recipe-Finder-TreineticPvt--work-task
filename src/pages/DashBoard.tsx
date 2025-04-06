import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
  Button,
  IconButton
} from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import SearchBar from '../component/SearchBar';
import FilterSection from '../component/FilterSection';
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

const Dashboard = ({ customRecipes }: DashboardProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const navigate = useNavigate();

  const fetchRecipes = async (query: string) => {
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

  const allRecipes = [...customRecipes, ...recipes];

  const filteredRecipes = selectedCategory
    ? allRecipes.filter((r) => r.strCategory === selectedCategory)
    : allRecipes;

  return (
    <Box sx={{ padding: '2rem' }}>
      {/* Top Bar */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4">🍽️ Recipe Finder</Typography>
        <IconButton onClick={() => navigate('/login')} color="primary">
          <AccountCircle fontSize="large" />
        </IconButton>
      </Box>

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

      <br />
      <Button variant="contained" onClick={() => navigate('/add-recipe')}>
        Add Recipe
      </Button>
    </Box>
  );
};

export default Dashboard;
