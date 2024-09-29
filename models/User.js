import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  dishes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Dish',
    },
  ],
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
