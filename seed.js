// seed.js - Seeds the MongoDB database with lessons
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const seedLessons = async () => {
  const client = new MongoClient(process.env.MONGODB_URI);
  
  try {
    await client.connect();
    const db = client.db(process.env.DB_NAME || 'learnhub');
    const lessonsCol = db.collection('lessons');

    // Read seed data from JSON file
    const seedPath = path.join(__dirname, 'data', 'lessons-seed.json');
    const lessonsData = JSON.parse(fs.readFileSync(seedPath, 'utf-8'));

    // Remove existing lessons
    await lessonsCol.deleteMany({});
    console.log('Cleared existing lessons');

    // Insert new lessons
    const result = await lessonsCol.insertMany(lessonsData);
    console.log(`Seeded ${result.insertedCount} lessons successfully!`);

    // Display inserted lessons
    const lessons = await lessonsCol.find().toArray();
    lessons.forEach(l => {
      console.log(`  - ${l.subject} (${l.location}) - £${l.price} - ${l.spaces} spaces`);
    });

    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  } finally {
    await client.close();
  }
};

seedLessons();
