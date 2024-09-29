"use client"
import { useState, useEffect } from 'react';

const recipes = [
  { id: 1, name: 'Grilled Chicken', category: 'Lunch', meat: 'chicken', calories: 500, cookingTime: '30 min' },
  { id: 2, name: 'Beef Steak', category: 'Dinner', meat: 'beef', calories: 600, cookingTime: '45 min' },
  { id: 3, name: 'Vegan Salad', category: 'Lunch', meat: 'none', calories: 200, cookingTime: '15 min' },
  // More recipes here
];

export default function Home() {
  const [filteredRecipes, setFilteredRecipes] = useState(recipes);
  const [meatFilter, setMeatFilter] = useState('all');
  const [caloriesFilter, setCaloriesFilter] = useState('all');

  const filterRecipes = () => {
    let filtered = recipes;
    if (meatFilter !== 'all') {
      filtered = filtered.filter(recipe => recipe.meat === meatFilter);
    }
    if (caloriesFilter !== 'all') {
      filtered = filtered.filter(recipe => recipe.calories <= parseInt(caloriesFilter));
    }
    setFilteredRecipes(filtered);
  };

  useEffect(() => {
    filterRecipes();
  }, [meatFilter, caloriesFilter]);

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <h1 className="text-3xl text-center font-bold text-gray-800 mb-10">Quick Meal Recipes</h1>

      {/* Filter Section */}
      <div className="flex justify-between items-center mb-6 space-x-4">
        <div className="flex flex-col">
          <label htmlFor="meatFilter" className="mb-2 text-sm font-semibold">Filter by Meat Type:</label>
          <select
            id="meatFilter"
            value={meatFilter}
            onChange={(e) => setMeatFilter(e.target.value)}
            className="p-2 text-base rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All</option>
            <option value="chicken">Chicken</option>
            <option value="beef">Beef</option>
            <option value="none">Vegan/No Meat</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="caloriesFilter" className="mb-2 text-sm font-semibold">Filter by Calories:</label>
          <select
            id="caloriesFilter"
            value={caloriesFilter}
            onChange={(e) => setCaloriesFilter(e.target.value)}
            className="p-2 text-base rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All</option>
            <option value="200">Below 200</option>
            <option value="500">Below 500</option>
            <option value="600">Below 600</option>
          </select>
        </div>
      </div>

      {/* Recipe List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRecipes.map((recipe) => (
          <div key={recipe.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
            <h3 className="text-xl font-semibold mb-1">{recipe.name}</h3>
            <p className="text-sm text-gray-500">Category: {recipe.category}</p>
            <p className="text-sm text-gray-500">Meat: {recipe.meat}</p>
            <p className="text-sm text-gray-500">Calories: {recipe.calories} kcal</p>
            <p className="text-sm text-gray-500">Cooking Time: {recipe.cookingTime}</p>
          </div>
        ))}
      </div>

      {/* Link to share a new recipe */}
      <div className="text-center mt-8">
        <a
          href="/form"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-block transition-colors duration-200"
        >
          Share a Recipe
        </a>
      </div>
    </div>
  );
}
