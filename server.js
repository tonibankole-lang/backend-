// backend/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { MongoClient, ObjectId } from "mongodb";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// MongoDB connection
let db;
const client = new MongoClient(process.env.MONGODB_URI);

try {
  await client.connect();
  db = client.db("learnhub"); // Coursework requires 1 DB with lesson + order
  console.log("MongoDB connected");
} catch (err) {
  console.error("MongoDB connection failed:", err);
  process.exit(1);
}

/* ========================
   REQUIRED COURSEWORK ROUTES
   ======================== */

// 1️⃣ GET /lessons — Return all lessons
app.get("/lessons", async (req, res) => {
  try {
    const lessons = await db.collection("lesson").find().toArray();
    res.json(lessons);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch lessons" });
  }
});

// 2️⃣ POST /orders — Save a new order
app.post("/orders", async (req, res) => {
  try {
    const result = await db.collection("order").insertOne(req.body);
    res.status(201).json({ message: "Order created", id: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: "Failed to create order" });
  }
});

// 3️⃣ PUT /lessons/:id — Update available spaces
app.put("/lessons/:id", async (req, res) => {
  try {
    const update = await db.collection("lesson").updateOne(
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

// Root route
app.get("/", (req, res) => {
  res.send("Backend running. Visit /lessons to see all lessons.");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
