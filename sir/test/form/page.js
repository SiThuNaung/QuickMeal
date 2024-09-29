"use client"
import { useState } from 'react';

export default function ShareRecipe() {
  const [recipeData, setRecipeData] = useState({
    name: '',
    category: 'Lunch',
    meat: 'chicken',
    cookingTime: '',
    ingredients: '',
  });

  const handleChange = (e) => {
    setRecipeData({ ...recipeData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, you would normally send the recipeData to the backend
    console.log('Recipe Submitted: ', recipeData);
    alert('Recipe shared successfully!');
  };

  return (
    <div>
      <h1>Share Your Recipe</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Recipe Name: </label>
          <input
            type="text"
            name="name"
            value={recipeData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Category: </label>
          <select name="category" value={recipeData.category} onChange={handleChange}>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
            <option value="Dessert">Dessert</option>
          </select>
        </div>

        <div>
          <label>Meat Type: </label>
          <select name="meat" value={recipeData.meat} onChange={handleChange}>
            <option value="chicken">Chicken</option>
            <option value="beef">Beef</option>
            <option value="none">Vegan/No Meat</option>
          </select>
        </div>

        <div>
          <label>Estimated Cooking Time: </label>
          <input
            type="text"
            name="cookingTime"
            value={recipeData.cookingTime}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Ingredients: </label>
          <textarea
            name="ingredients"
            value={recipeData.ingredients}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Share Recipe</button>
      </form>
    </div>
  );
}
