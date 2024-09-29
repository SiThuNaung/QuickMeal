export default function DishCard({ dish }) {
    return (
      <div className="dish-card">
        <h2>{dish.name}</h2>
        <img src={dish.photo_url} alt={dish.name} />
        <p>{dish.estimated_cooking_time}</p>
        <p>{dish.meat.join(', ')}</p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-1 rounded" onClick={() => window.location.href = `/dish/${dish._id}`}>Cook Now</button>
      </div>
    );
  }
  