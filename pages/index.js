import { useEffect, useState } from 'react';
import DishCard from '../components/DishCard';
import FilterComponent from '../components/FilterComponent';
import Link from 'next/link'; // Import Link for navigation

export default function HomePage() {
  const [dishes, setDishes] = useState([]);
  const [filters, setFilters] = useState({ category: '', meat: '', name: '' });

  useEffect(() => {
    async function fetchDishes() {
      const res = await fetch('/api/dishes');
      const data = await res.json();
      setDishes(data);
    }
    fetchDishes();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Quick Meal Recipes</h1>
      
      {/* Share Recipe Button */}
      <div className="text-right mb-6">
        <Link href="/share-recipe">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Share a Recipe
    </button>
          
        </Link>
      </div>

      {/* Filter Component */}
      <FilterComponent filters={filters} setFilters={setFilters} />

      {/* Dish List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dishes
          .filter(dish => {
            if (filters.category && dish.category !== filters.category) return false;
            if (filters.meat && !dish.meat.includes(filters.meat)) return false;
            if (filters.name && !dish.name.toLowerCase().includes(filters.name.toLowerCase())) return false;
            return true;
          })
          .map((dish) => (
            <DishCard key={dish._id} dish={dish} />
          ))}
      </div>
    </div>
  );
}
