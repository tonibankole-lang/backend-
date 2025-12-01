import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

// MongoDB Connection
const client = new MongoClient(process.env.MONGO_URI)
let db

async function connectDB() {
  try {
    await client.connect()
    db = client.db('learnhub')
    console.log('MongoDB connected')
  } catch (err) {
    console.error('DB connection error:', err)
  }
}
connectDB()

// GET ACTIVITIES
app.get('/api/activities', async (req, res) => {
  try {
    const activities = await db.collection('activities').find().toArray()
    res.json(activities)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch activities' })
  }
})

app.listen(4000, () => {
  console.log('Backend running on http://localhost:4000')
})
