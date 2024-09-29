import dbConnect from '../../../lib/mongodb';
import Dish from '../../../models/Dish';

export default async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const dish = await Dish.findById(id);
      if (!dish) {
        return res.status(404).json({ message: 'Dish not found' });
      }
      res.status(200).json(dish);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch dish' });
    }
  } else if (req.method === 'PUT') {
    try {
      const dish = await Dish.findByIdAndUpdate(id, req.body, { new: true });
      if (!dish) {
        return res.status(404).json({ message: 'Dish not found' });
      }
      res.status(200).json(dish);
    } catch (error) {
      res.status(500).json({ message: 'Failed to update dish' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const dish = await Dish.findByIdAndDelete(id);
      if (!dish) {
        return res.status(404).json({ message: 'Dish not found' });
      }
      res.status(200).json({ message: 'Dish deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete dish' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
