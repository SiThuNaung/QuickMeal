import mongoose from 'mongoose';

const DishSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  photo_url: {
    type: String,
    required: true,
  },
  estimated_cooking_time: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Dessert'], // Fixed categories
    required: true,
  },
  meat: {
    type: [String],  // Multiple meat types
    required: true,
  },
  ingredients: [
    {
      ingredient: { type: String, required: true },
      amount: { type: String, required: true },
    },
  ],
  how_to_cook: {
    type: String,
    required: true,
  },
  date_created: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Dish || mongoose.model('Dish', DishSchema);
