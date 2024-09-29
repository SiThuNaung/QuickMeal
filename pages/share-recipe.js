import { useState } from 'react';
import { useRouter } from 'next/router';

export default function ShareRecipe() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    photo_url: '',
    estimated_cooking_time: '5-15 min',
    category: 'Breakfast', // Default category
    meat: [],
    ingredients: [{ ingredient: '', amount: '' }],
    how_to_cook: '',
  });

  const handleIngredientChange = (index, field, value) => {
    const newIngredients = [...formData.ingredients];
    newIngredients[index][field] = value;
    setFormData({ ...formData, ingredients: newIngredients });
  };

  const addIngredient = () => {
    setFormData({
      ...formData,
      ingredients: [...formData.ingredients, { ingredient: '', amount: '' }],
    });
  };

  const removeIngredient = (index) => {
    const newIngredients = [...formData.ingredients];
    newIngredients.splice(index, 1);
    setFormData({ ...formData, ingredients: newIngredients });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/dishes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert('Recipe shared successfully!');
        router.push('/');
      } else {
        alert('Error sharing recipe');
      }
    } catch (error) {
      console.error('Error sharing recipe:', error);
      alert('Error sharing recipe');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Share a New Recipe</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Dish Name */}
        <div>
          <label className="block mb-2">Dish Name:</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className="block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Photo URL */}
        <div>
          <label className="block mb-2">Photo URL:</label>
          <input
            type="url"
            value={formData.photo_url}
            onChange={(e) => setFormData({ ...formData, photo_url: e.target.value })}
            required
            className="block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Estimated Cooking Time */}
        <div>
          <label className="block mb-2">Estimated Cooking Time:</label>
          <select
            value={formData.estimated_cooking_time}
            onChange={(e) => setFormData({ ...formData, estimated_cooking_time: e.target.value })}
            className="block w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="5-15 min">5-15 min</option>
            <option value="15-30 min">15-30 min</option>
            <option value="30+ min">More than 30 min</option>
          </select>
        </div>

        {/* Category */}
        <div>
          <label className="block mb-2">Category:</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            required
            className="block w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
            <option value="Snack">Snack</option>
            <option value="Dessert">Dessert</option>
          </select>
        </div>

        {/* Meat Used (Multiple Select) */}
        <div>
          <label className="block mb-2">Meat Used (Select multiple):</label>
          <select
            multiple
            value={formData.meat}
            onChange={(e) =>
              setFormData({
                ...formData,
                meat: Array.from(e.target.selectedOptions, (option) => option.value),
              })
            }
            className="block w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="Chicken">Chicken</option>
            <option value="Beef">Beef</option>
            <option value="Pork">Pork</option>
            <option value="Fish">Fish</option>
            <option value="None">None</option>
          </select>
        </div>

        {/* Ingredients */}
        <div>
          <label className="block mb-2">Ingredients:</label>
          {formData.ingredients.map((ingredient, index) => (
            <div key={index} className="mb-2 flex space-x-2">
              <input
                type="text"
                placeholder="Ingredient"
                value={ingredient.ingredient}
                onChange={(e) => handleIngredientChange(index, 'ingredient', e.target.value)}
                className="block w-1/2 p-2 border border-gray-300 rounded-md"
                required
              />
              <input
                type="text"
                placeholder="Amount"
                value={ingredient.amount}
                onChange={(e) => handleIngredientChange(index, 'amount', e.target.value)}
                className="block w-1/2 p-2 border border-gray-300 rounded-md"
                required
              />
              {formData.ingredients.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeIngredient(index)}
                  className="text-red-600"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addIngredient}
            className="text-blue-600"
          >
            Add Ingredient
          </button>
        </div>

        {/* How to Cook */}
        <div>
          <label className="block mb-2">How to Cook:</label>
          <textarea
            value={formData.how_to_cook}
            onChange={(e) => setFormData({ ...formData, how_to_cook: e.target.value })}
            required
            className="block w-full p-2 border border-gray-300 rounded-md"
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="text-right">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit Recipe
          </button>
        </div>
      </form>
    </div>
  );
}
