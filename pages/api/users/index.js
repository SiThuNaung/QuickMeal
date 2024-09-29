import dbConnect from '../../../lib/mongodb';
import User from '../../../models/User';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    const { name, email, password } = req.body;

    try {
      const existingUser = await User.findOne({ name });

      if (existingUser) {
        if (existingUser.password === password) {
          return res.status(200).json(existingUser);
        } else {
          return res.status(400).json({ message: 'Incorrect password' });
        }
      }

      const newUser = new User({ name, email, password });
      await newUser.save();
      return res.status(201).json(newUser);
    } catch (error) {
      console.error('Error creating user:', error);
      return res.status(500).json({ message: 'Server error', error });
    }
  } else if (req.method === 'GET') {
    try {
      const users = await User.find({});
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch users', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
