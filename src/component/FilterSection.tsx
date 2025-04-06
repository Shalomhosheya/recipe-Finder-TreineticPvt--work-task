// FilterSection.tsx or FilterSection.jsx
import React, { useEffect, useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';
import axios from 'axios';

interface FilterSectionProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({ selectedCategory, setSelectedCategory }) => {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php');
        const categoryList = res.data.categories.map((cat: any) => cat.strCategory);
        setCategories(categoryList);
      } catch (err) {
        console.error('Failed to fetch categories:', err);
      }
    };

    fetchCategories();
  }, []);

  return (
    <Box sx={{ my: 2, minWidth: 200 }}>
      <FormControl fullWidth>
        <InputLabel>Filter by Category</InputLabel>
        <Select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          label="Filter by Category"
        >
          <MenuItem value="">All</MenuItem>
          {categories.map((cat) => (
            <MenuItem key={cat} value={cat}>
              {cat}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default FilterSection;
