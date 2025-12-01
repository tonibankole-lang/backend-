import express from 'express';
import { getDB } from '../db.js';
import { ObjectId } from 'mongodb';

const router = express.Router();

// GET all activities
router.get('/', async (req, res) => {
  try {
    const db = getDB();
    const activities = await db.collection('activities').find().toArray();
    res.json(activities);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST new activity
router.post('/', async (req, res) => {
  try {
    const db = getDB();
    const result = await db.collection('activities').insertOne(req.body);
    res.status(201).json({ ...req.body, _id: result.insertedId });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT (update) activity by ID
router.put('/:id', async (req, res) => {
  try {
    const db = getDB();
    const result = await db.collection('activities').updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );
    if (result.matchedCount === 0) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE activity by ID
router.delete('/:id', async (req, res) => {
  try {
    const db = getDB();
    const result = await db.collection('activities').deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
