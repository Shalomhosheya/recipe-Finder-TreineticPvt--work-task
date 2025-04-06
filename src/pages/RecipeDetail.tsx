// pages/RecipeDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Button, CardMedia } from '@mui/material';
import axios from 'axios';


interface RecipeDetailsProps {
  customRecipes: Recipe[];
}

const RecipeDetails: React.FC<RecipeDetailsProps> = ({ customRecipes }) =>  {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  const fetchRecipe = async () => {
    const res = await axios.get(`/lookup.php?i=${id}`);
    setRecipe(res.data.meals[0]);
  };

  useEffect(() => {
    fetchRecipe();
  }, [id]);

  const handleSaveToFavorites = () => {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites.push(recipe);
    localStorage.setItem('favorites', JSON.stringify(favorites));
  };

  if (!recipe) return <Typography>Loading...</Typography>;

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
            )          );
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
