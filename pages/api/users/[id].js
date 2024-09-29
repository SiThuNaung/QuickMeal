import dbConnect from '../../../lib/mongodb';
import User from '../../../models/User';

export default async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const user = await User.findById(id).populate('dishes');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch user', error });
    }
  } else if (req.method === 'PUT') {
    try {
      const user = await User.findByIdAndUpdate(id, req.body, { new: true });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Failed to update user', error });
    }
  } else if (req.method === 'DELETE') {
    try {
      const user = await User.findByIdAndDelete(id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete user', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
