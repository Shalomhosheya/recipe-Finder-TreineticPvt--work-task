import React, { useEffect, useState } from 'react';
import { useThemeMode } from '../component/ThemeWrapper'; // 👈 import
import { AccountCircle } from '@mui/icons-material';
import SearchBar from '../component/Searchbar';
import FilterSection from '../component/FilterSection';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Brightness7 , Brightness4 } from '@mui/icons-material';

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
const Dashboard: React.FC<DashboardProps> = ({ customRecipes, onAdd }) =>  {
  const [searchQuery, setSearchQuery] = useState('');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!localStorage.getItem('user'));

  const navigate = useNavigate();
    const { toggleColorMode, mode } = useThemeMode(); 

  const handleRemoveFavorite = (idToRemove: string) => {
      const updatedFavorites = favorites.filter((recipe) => recipe.idMeal !== idToRemove);
      setFavorites(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    };
    
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

  useEffect(() => {
    const user = localStorage.getItem('user');
    setIsLoggedIn(!!user);
  }, []);
  
  const allRecipes = [...customRecipes, ...recipes];

  const filteredRecipes = selectedCategory
    ? allRecipes.filter((r) => r.strCategory === selectedCategory)
    : allRecipes;
  
  const [favorites, setFavorites] = useState<Recipe[]>([]);

    useEffect(() => {
      const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      setFavorites(storedFavorites);
    }, []);
    
    useEffect(() => {
      const updateFavorites = () => {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        setFavorites(storedFavorites);
      };
    
      window.addEventListener("favoritesUpdated", updateFavorites);
      updateFavorites(); 
    
      return () => window.removeEventListener("favoritesUpdated", updateFavorites);
    }, []);
    
  return (
    <Box sx={{ padding: '2rem' }}>
   

<Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
  <Typography variant="h4">🍽️ Recipe Finder</Typography>

  <Box display="flex" alignItems="center" gap={2}>
    <IconButton onClick={toggleColorMode} color="inherit">
      {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
    </IconButton>
    <IconButton onClick={() => navigate('/login')} color="primary">
      <AccountCircle fontSize="large" />
    </IconButton>
    {isLoggedIn && (
  <Button
    variant="contained"
    color="secondary"
    sx={{
      fontWeight: 'bold',
      textTransform: 'none',
      borderRadius: '20px',
      px: 3,
      py: 1,
      boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
      '&:hover': {
        backgroundColor: '#9c27b0',
      },
    }}
    onClick={() => {
      localStorage.removeItem('user');
      setIsLoggedIn(false);
      navigate('/');
    }}
  >
    Logout
  </Button>
)}

  </Box>
</Box>

{favorites.length > 0 && (
  <Box sx={{ mt: 4 }}>
    <Typography variant="h5" gutterBottom>❤️ Your Favorites</Typography>
    <Grid container spacing={3}>
      {favorites.map((recipe) => (
        <Grid item key={recipe.idMeal} xs={12} sm={6} md={4}>
          <Card sx={{ cursor: 'pointer', position: 'relative' }}>
            <CardMedia
              component="img"
              height="180"
              image={recipe.strMealThumb}
              alt={recipe.strMeal}
              onClick={() => navigate(`/recipe/${recipe.idMeal}`)}
            />
            <CardContent>
              <Typography variant="h6">{recipe.strMeal}</Typography>
              <Typography variant="body2">Category: {recipe.strCategory || 'Custom'}</Typography>
              <Typography variant="body2">Area: {recipe.strArea || 'N/A'}</Typography>

              <Button
                variant="outlined"
                color="error"
                size="small"
                sx={{ mt: 1 }}
                onClick={() => handleRemoveFavorite(recipe.idMeal)}
              >
                Remove ❌
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Box>
)}


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
