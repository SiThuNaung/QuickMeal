// models/Recipe.js
import mongoose from 'mongoose';

const RecipeSchema = new mongoose.Schema({
  ingredients: [
    {
      ingredient: { type: String, required: true },  // e.g., 'Salt'
      amount: { type: String, required: true },      // e.g., '2 teaspoons'
    },
  ],
  how_to_cook: {
    type: String,  // Step-by-step cooking instructions
    required: true,
  },
});

export default mongoose.models.Recipe || mongoose.model('Recipe', RecipeSchema);
