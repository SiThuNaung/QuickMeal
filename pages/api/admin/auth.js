// Importing necessary libraries and models
import dbConnect from '../../../lib/mongodb';
import Admin from '../../../models/Admin';

export default async function handler(req, res) {
    await dbConnect();

    if (req.method === 'POST') {
        const { email, password } = req.body; // Extracting email and password from the request body

        try {
            const admin = await Admin.findOne({ email }); // Finding the admin by email
            if (!admin) {
                return res.status(404).json({ message: 'Admin not found' }); // Admin not found
            }

            // Compare plaintext passwords directly
            if (admin.password !== password) {
                return res.status(401).json({ message: 'Invalid credentials' }); // Passwords do not match
            }

            res.status(200).json({ message: 'Login successful', admin }); // Login successful
        } catch (error) {
            res.status(500).json({ message: 'Server error', error }); // Internal server error
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' }); // Handle non-POST requests
    }
}
