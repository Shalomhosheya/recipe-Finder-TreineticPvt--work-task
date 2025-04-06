// pages/Dashboard.jsx
import React from 'react';
import { Box, Typography, Grid, Card, CardMedia, CardContent } from '@mui/material';

const recipes = [
  {
    id: 1,
    title: 'Spaghetti Bolognese',
    image: 'https://source.unsplash.com/400x300/?spaghetti',
    rating: 4.5,
    cookingTime: '30 mins',
  },
  {
    id: 2,
    title: 'Vegan Tacos',
    image: 'https://source.unsplash.com/400x300/?tacos',
    rating: 4.7,
    cookingTime: '20 mins',
  },
  // Add more mock recipes here
];

const Dashboard = () => {
  return (
    <Box sx={{ padding: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        🍽️ Recipe Dashboard
      </Typography>

      <Grid container spacing={3}>
        {recipes.map((recipe) => (
          <Grid item key={recipe.id} xs={12} sm={6} md={4}>
            <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
              <CardMedia
                component="img"
                height="180"
                image={recipe.image}
                alt={recipe.title}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {recipe.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Cooking Time: {recipe.cookingTime}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ⭐ Rating: {recipe.rating}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Dashboard;
