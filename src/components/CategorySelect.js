import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CategorySelect = ({ onSelectCategory }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://opentdb.com/api_category.php');
        setCategories(response.data.trivia_categories);
      } catch (error) {
        console.log('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    onSelectCategory(selectedCategory);
  };

  return (
    <div className='form-group'>
      <label htmlFor="categorySelect">Select category</label>
      <select className='form-select' id='categorySelect' onChange={handleCategoryChange}>
        <option value="">Any Category</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategorySelect;
