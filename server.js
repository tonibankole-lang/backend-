// backend/server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { MongoClient, ObjectId } from 'mongodb';

dotenv.config(); // Load .env variables

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: '*' }));
app.use(express.json());

// Connect to MongoDB
let db;
const client = new MongoClient(process.env.MONGODB_URI);

try {
  await client.connect();
  db = client.db(process.env.MONGODB_DB);
  console.log(`MongoDB Connected: ${db.databaseName}`);
} catch (err) {
  console.error('Failed to connect to MongoDB:', err);
  process.exit(1);
}

// Root route
app.get('/', (req, res) => {
  res.send('Server is running. Go to /api/activities to see data.');
});

// API routes

// Get all activities
app.get('/api/activities', async (req, res) => {
  try {
    const activities = await db.collection('activities').find().toArray();
    res.json(activities);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add new activity
app.post('/api/activities', async (req, res) => {
  try {
    const result = await db.collection('activities').insertOne(req.body);
    res.status(201).json({ ...req.body, _id: result.insertedId });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update activity
app.put('/api/activities/:id', async (req, res) => {
  try {
    const result = await db.collection('activities').updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );
    if (result.matchedCount === 0) return res.status(404).json({ message: 'Activity not found' });
    res.json({ message: 'Activity updated' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete activity
app.delete('/api/activities/:id', async (req, res) => {
  try {
    const result = await db.collection('activities').deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) return res.status(404).json({ message: 'Activity not found' });
    res.json({ message: 'Activity deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
