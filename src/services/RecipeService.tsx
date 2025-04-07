export const getRecipes = () => {
    return JSON.parse(localStorage.getItem('recipes')) || [];
  };
  
  export const saveRecipe = (recipe) => {
    const recipes = getRecipes();
    const updated = [...recipes, { ...recipe, id: Date.now() }];
    localStorage.setItem('recipes', JSON.stringify(updated));
  };
  
  export const deleteRecipe = (id) => {
    const recipes = getRecipes().filter(r => r.id !== id);
    localStorage.setItem('recipes', JSON.stringify(recipes));
  };
  