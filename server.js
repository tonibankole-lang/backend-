// backend/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { MongoClient, ObjectId } from "mongodb";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware: CORS
app.use(cors());
app.use(express.json());

// Middleware: Logger (logs method, path, status, response time, body)
app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(
      `[${new Date().toISOString()}] ${req.method} ${req.path} ${res.statusCode} ${duration}ms`,
      req.method === "POST" || req.method === "PUT" ? JSON.stringify(req.body) : ""
    );
  });
  next();
});

// ============================================
// DATA LAYER - MongoDB or In-Memory for dev
// ============================================
let db = null;
let useLocalData = false;

// In-memory data for local development (no MongoDB needed)
let localLessons = [];
let localOrders = [];

// Load seed data for local development
function loadLocalData() {
  try {
    const seedPath = path.join(__dirname, 'data', 'lessons-seed.json');
    const data = JSON.parse(fs.readFileSync(seedPath, 'utf-8'));
    localLessons = data.map((lesson, index) => ({
      ...lesson,
      _id: `local_${index + 1}`
    }));
    console.log(`Loaded ${localLessons.length} lessons from seed data`);
  } catch (err) {
    console.error('Failed to load seed data:', err.message);
    // Fallback data
    localLessons = [
      { _id: 'local_1', subject: 'Mathematics', location: 'Room 101', price: 25, spaces: 5, image: 'mathematics.jpg', icon: 'fa-calculator' },
      { _id: 'local_2', subject: 'English', location: 'Room 102', price: 20, spaces: 8, image: 'english.jpg', icon: 'fa-book' },
      { _id: 'local_3', subject: 'Physics', location: 'Science Lab A', price: 30, spaces: 6, image: 'physics.jpg', icon: 'fa-atom' },
      { _id: 'local_4', subject: 'Chemistry', location: 'Science Lab B', price: 30, spaces: 5, image: 'chemistry.jpg', icon: 'fa-flask' },
      { _id: 'local_5', subject: 'Biology', location: 'Science Lab C', price: 28, spaces: 7, image: 'biology.jpg', icon: 'fa-dna' },
      { _id: 'local_6', subject: 'History', location: 'Room 201', price: 18, spaces: 10, image: 'history.jpg', icon: 'fa-landmark' },
      { _id: 'local_7', subject: 'Geography', location: 'Room 202', price: 18, spaces: 9, image: 'geography.jpg', icon: 'fa-globe' },
      { _id: 'local_8', subject: 'Computer Science', location: 'IT Lab 1', price: 35, spaces: 5, image: 'computer-science.jpg', icon: 'fa-laptop-code' },
      { _id: 'local_9', subject: 'Art & Design', location: 'Art Studio', price: 22, spaces: 8, image: 'art.jpg', icon: 'fa-palette' },
      { _id: 'local_10', subject: 'Music', location: 'Music Room', price: 25, spaces: 6, image: 'music.jpg', icon: 'fa-music' }
    ];
  }
}

async function connectDB() {
  if (!process.env.MONGODB_URI) {
    console.log('⚠️  No MONGODB_URI found - using LOCAL IN-MEMORY data');
    useLocalData = true;
    loadLocalData();
    return;
  }
  
  try {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    db = client.db(process.env.DB_NAME || "learnhub");
    console.log(`✅ MongoDB connected to database: ${db.databaseName}`);
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    console.log('⚠️  Falling back to LOCAL IN-MEMORY data');
    useLocalData = true;
    loadLocalData();
  }
}

await connectDB();

/* ========================
   STATIC IMAGE MIDDLEWARE
   ======================== */
app.get("/images/:filename", (req, res) => {
  const filename = req.params.filename;
  const imagePath = path.join(__dirname, "images", filename);
  
  if (fs.existsSync(imagePath)) {
    res.sendFile(imagePath);
  } else {
    res.status(404).json({ error: "Image not found" });
  }
});

/* ========================
   ROUTES
   ======================== */

// GET /lessons — Return all lessons
app.get("/lessons", async (req, res) => {
  try {
    if (useLocalData) {
      return res.json(localLessons);
    }
    const lessons = await db.collection("lessons").find().toArray();
    res.json(lessons);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch lessons" });
  }
});

// GET /lessons/:id — Return single lesson
app.get("/lessons/:id", async (req, res) => {
  try {
    if (useLocalData) {
      const lesson = localLessons.find(l => l._id === req.params.id);
      if (!lesson) return res.status(404).json({ error: "Lesson not found" });
      return res.json(lesson);
    }
    const lesson = await db.collection("lessons").findOne({ 
      _id: new ObjectId(req.params.id) 
    });
    if (!lesson) {
      return res.status(404).json({ error: "Lesson not found" });
    }
    res.json(lesson);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch lesson" });
  }
});

// PUT /lessons/:id — Update lesson attributes
app.put("/lessons/:id", async (req, res) => {
  try {
    if (useLocalData) {
      const index = localLessons.findIndex(l => l._id === req.params.id);
      if (index === -1) return res.status(404).json({ error: "Lesson not found" });
      localLessons[index] = { ...localLessons[index], ...req.body };
      return res.json({ message: "Lesson updated" });
    }
    const update = await db.collection("lessons").updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );

    if (update.matchedCount === 0) {
      return res.status(404).json({ error: "Lesson not found" });
    }

    res.json({ message: "Lesson updated" });
  } catch (err) {
    res.status(500).json({ error: "Failed to update lesson" });
  }
});

// POST /orders — Save a new order
app.post("/orders", async (req, res) => {
  try {
    const { name, phone, lessonIDs, numSpaces } = req.body;
    const order = {
      name,
      phone,
      lessonIDs,
      numSpaces,
      timestamp: new Date()
    };
    
    if (useLocalData) {
      order._id = `order_${Date.now()}`;
      localOrders.push(order);
      return res.status(201).json({ message: "Order created", id: order._id });
    }
    
    const result = await db.collection("orders").insertOne(order);
    res.status(201).json({ message: "Order created", id: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: "Failed to create order" });
  }
});

// GET /search?q=... — Search lessons by subject, location, price, spaces
app.get("/search", async (req, res) => {
  try {
    const query = req.query.q || "";
    
    if (useLocalData) {
      if (!query.trim()) return res.json(localLessons);
      const q = query.toLowerCase();
      const numQ = parseFloat(query);
      const results = localLessons.filter(l => 
        l.subject.toLowerCase().includes(q) ||
        l.location.toLowerCase().includes(q) ||
        (!isNaN(numQ) && (l.price === numQ || l.spaces === numQ))
      );
      return res.json(results);
    }
    
    if (!query.trim()) {
      const lessons = await db.collection("lessons").find().toArray();
      return res.json(lessons);
    }

    // Case-insensitive regex search across multiple fields
    const searchRegex = new RegExp(query, "i");
    const numericQuery = parseFloat(query);
    
    const filter = {
      $or: [
        { subject: searchRegex },
        { location: searchRegex }
      ]
    };

    // If query is a number, also search price and spaces
    if (!isNaN(numericQuery)) {
      filter.$or.push({ price: numericQuery });
      filter.$or.push({ spaces: numericQuery });
    }

    const lessons = await db.collection("lessons").find(filter).toArray();
    res.json(lessons);
  } catch (err) {
    res.status(500).json({ error: "Failed to search lessons" });
  }
});

// Root route
app.get("/", (req, res) => {
  res.json({ message: "LearnHub API running. Visit /lessons to see all lessons." });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
