export default function FilterComponent({ filters, setFilters }) {
    return (
      <div className="filter-component p-4 bg-gray-100 rounded-md mb-6">
        <h2 className="text-lg font-bold mb-4">Filter Recipes</h2>
  
        {/* Filter by Name */}
        <input
          type="text"
          placeholder="Search by dish name"
          value={filters.name}
          onChange={(e) => setFilters({ ...filters, name: e.target.value })}
          className="block w-full mb-4 p-2 border border-gray-300 rounded-md"
        />
  
        {/* Filter by Category */}
        <select
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          className="block w-full mb-4 p-2 border border-gray-300 rounded-md"
        >
          <option value="">Select Category</option>
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
          <option value="Snack">Snack</option>
          <option value="Dessert">Dessert</option>
        </select>
  
        {/* Filter by Meat Type */}
        <select
          value={filters.meat}
          onChange={(e) => setFilters({ ...filters, meat: e.target.value })}
          className="block w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="">Select Meat Type</option>
          <option value="Chicken">Chicken</option>
          <option value="Beef">Beef</option>
          <option value="Pork">Pork</option>
          <option value="Fish">Fish</option>
          <option value="None">No Meat</option>
        </select>
      </div>
    );
  }
  