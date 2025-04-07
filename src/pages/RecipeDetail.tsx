import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Button, CardMedia } from '@mui/material';
import axios from 'axios';


//www.themealdb.com/api/json/v1/1/lookup.php?i=52772 
interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
  [key: string]: any;
}

interface RecipeDetailsProps {
  customRecipes: Recipe[];
}

const RecipeDetails: React.FC<RecipeDetailsProps> = ({ customRecipes }) => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchRecipe = async () => {
    const customRecipe = customRecipes.find((r) => r.idMeal === id);
    if (customRecipe) {
      setRecipe(customRecipe);
      setLoading(false);
      return;
    }
  
    try {
      const res = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      if (res.data.meals) {
        setRecipe(res.data.meals[0]);
      } else {
        setRecipe(null);
      }
    } catch (error) {
      console.error('Error fetching recipe:', error);
      setRecipe(null);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchRecipe();
  }, [id]);

  const handleSaveToFavorites = () => {
    if (!recipe) return;
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    favorites.push(recipe);
    localStorage.setItem('favorites', JSON.stringify(favorites));
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (!recipe) return <Typography>Recipe not found.</Typography>;

  return (
    <Box sx={{ padding: '2rem' }}>
      <Typography variant="h4">{recipe.strMeal}</Typography>
      <CardMedia
        component="img"
        image={recipe.strMealThumb}
        alt={recipe.strMeal}
        sx={{ width: '50%', borderRadius: 5, marginTop: 4 }}
      />
      <Typography variant="h6" mt={2}>Ingredients:</Typography>
      <ul>
        {Array.from({ length: 20 }, (_, i) => {
          const ingredient = recipe[`strIngredient${i + 1}`];
          const measure = recipe[`strMeasure${i + 1}`];
          return (
            ingredient && (
              <li key={i}>
                {ingredient} - {measure}
              </li>
            )
          );
        })}
      </ul>
      <Typography variant="h6" mt={2}>Instructions:</Typography>
      <Typography>{recipe.strInstructions}</Typography>
      <Button variant="contained" sx={{ mt: 3 }} onClick={handleSaveToFavorites}>
        Save to Favorites ❤️
      </Button>
    </Box>
  );
};

export default RecipeDetails;
