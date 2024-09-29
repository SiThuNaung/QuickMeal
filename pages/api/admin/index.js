import dbConnect from '../../../lib/mongodb';
import Admin from '../../../models/Admin';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    try {
      const { name, email, password } = req.body;
      const hashedPassword = bcrypt.hashSync(password, 10);
      const newAdmin = new Admin({ name, email, password: hashedPassword });
      await newAdmin.save();
      res.status(201).json(newAdmin);
    } catch (error) {
      res.status(500).json({ message: 'Failed to create admin', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
