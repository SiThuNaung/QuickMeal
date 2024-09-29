import { useEffect, useState } from 'react';

function AdminPage() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const res = await fetch('/api/dishes');
      const data = await res.json();
      setRecipes(data);
    };
    fetchRecipes();
  }, []);

  const deleteRecipe = async (id) => {
    const res = await fetch(`/api/dishes/${id}`, {
      method: 'DELETE',
    });
    if (res.ok) {
      setRecipes(recipes.filter((recipe) => recipe._id !== id));
    } else {
      alert('Failed to delete the recipe');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe._id}>
            {recipe.name} - <button onClick={() => deleteRecipe(recipe._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminPage;
