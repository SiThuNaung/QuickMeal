import dbConnect from '../../../lib/mongodb';
import Dish from '../../../models/Dish';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    const { name, photo_url, estimated_cooking_time, category, meat, ingredients, how_to_cook } = req.body;

    try {
      const newDish = new Dish({
        name,
        photo_url,
        estimated_cooking_time,
        category,
        meat,
        ingredients,
        how_to_cook,
      });

      await newDish.save();
      return res.status(201).json(newDish);
    } catch (error) {
      console.error('Error creating dish:', error);
      return res.status(500).json({ message: 'Server error', error });
    }
  } else if (req.method === 'GET') {
    try {
      const dishes = await Dish.find({});
      res.status(200).json(dishes);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch dishes', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
