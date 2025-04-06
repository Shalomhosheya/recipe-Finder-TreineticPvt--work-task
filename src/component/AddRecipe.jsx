import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Input } from '@mui/material';

const AddRecipe = ({ onAdd }) => {
  const [form, setForm] = useState({
    title: '',
    image: '',
    instructions: '',
    ingredients: '',
    imageFile: null,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, imageFile: file, image: URL.createObjectURL(file) }); // Save image URL for preview
    }
  };

  const handleSubmit = () => {
    const newRecipe = {
      idMeal: Date.now().toString(), // fake ID
      strMeal: form.title,
      strMealThumb: form.image, // Use image URL for the image thumbnail
      strInstructions: form.instructions,
      strIngredient1: form.ingredients,
    };
    onAdd(newRecipe);
    setForm({ title: '', image: '', instructions: '', ingredients: '', imageFile: null });
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5">Add New Recipe</Typography>
      <TextField
        name="title"
        label="Title"
        fullWidth
        margin="normal"
        value={form.title}
        onChange={handleChange}
      />
      <Input
        type="file"
        name="imageFile"
        onChange={handleImageChange}
        fullWidth
        margin="normal"
      />
      {form.image && <img src={form.image} alt="Recipe preview" style={{ maxWidth: '200px', marginTop: '10px' }} />}
      <TextField
        name="ingredients"
        label="Ingredients"
        fullWidth
        margin="normal"
        value={form.ingredients}
        onChange={handleChange}
      />
      <TextField
        name="instructions"
        label="Instructions"
        fullWidth
        multiline
        rows={4}
        margin="normal"
        value={form.instructions}
        onChange={handleChange}
      />
      <Button variant="contained" onClick={handleSubmit}>
        Add Recipe
      </Button>
    </Box>
  );
};

export default AddRecipe;
