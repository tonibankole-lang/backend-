import express from 'express';
import * as mongodb from 'mongodb';
import { client } from '../db.js';

const router = express.Router();
const ObjectId = mongodb.ObjectId;

const db = () => client.db(process.env.MONGODB_DB);
const col = () => db().collection('activities');

// GET all
router.get('/', async (req, res) => {
  try {
    const activities = await col().find().toArray();
    res.json(activities);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Failed to fetch activities" });
  }
});

// GET by ID
router.get('/:id', async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    const activity = await col().findOne({ _id: new ObjectId(req.params.id) });

    if (!activity) {
      return res.status(404).json({ error: "Activity not found" });
    }

    res.json(activity);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Failed to fetch activity" });
  }
});

export default router;
