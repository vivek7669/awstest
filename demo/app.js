// Import necessary packages
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();  // To read .env variables

// Initialize Express app
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// MongoDB connection string from environment variables
const mongoURI = process.env.MONGODB_URI;

// Connect to MongoDB using Mongoose
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

// Sample schema for a "User" collection
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true }
});

const User = mongoose.model('User', userSchema);

// Routes
// Simple route to test server
app.get('/', (req, res) => {
  res.send('Welcome to the Node.js server with Express and MongoDB!');
});

// POST route to create a new user
app.post('/users', async (req, res) => {
  const { name, email } = req.body;

  // Create a new user document in MongoDB
  try {
    const user = new User({ name, email });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: 'Error creating user', error: err.message });
  }
});

// Start the server
const PORT = process.env.PORT || 3000; // Default to 3000 if PORT is not set in .env
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
