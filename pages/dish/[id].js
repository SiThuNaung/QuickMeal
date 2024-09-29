import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export default function DishDetail() {
  const [dish, setDish] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      async function fetchDish() {
        const res = await fetch(`/api/dishes/${id}`);
        const data = await res.json();
        setDish(data);
      }
      fetchDish();
    }
  }, [id]);

  if (!dish) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">{dish.name}</h1>

      {/* Updated Image Styling */}
      <div className="w-full h-64 md:h-96 mb-6">
        <img
          src={dish.photo_url}
          alt={dish.name}
          className="w-full h-full object-cover rounded-md"
        />
      </div>

      <p><strong>Estimated Cooking Time:</strong> {dish.estimated_cooking_time}</p>
      <p><strong>Meat Used:</strong> {dish.meat.join(', ')}</p>

      <h2 className="text-2xl font-bold mt-4">Ingredients</h2>
      <ul className="list-disc ml-6">
        {dish.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient.ingredient}: {ingredient.amount}</li>
        ))}
      </ul>
        
      <h2 className="text-2xl font-bold mt-4">How to Cook</h2>
      <p>{dish.how_to_cook}</p>
      
    </div>
  );
}
