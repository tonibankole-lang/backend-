// backend/seedActivities.js
import { connectDB, client } from './db.js';

const activities = [
  { title:"Soccer", category:"Sports", ageRange:"6-12", instructor:"Mr. Smith", description:"Fun soccer sessions", price:10, joined:2, capacity:10, image:"/images/soccer.jpg" },
  { title:"Painting", category:"Arts", ageRange:"7-14", instructor:"Ms. Jones", description:"Creative painting class", price:15, joined:3, capacity:10, image:"/images/painting.jpg" },
  { title:"Chess", category:"Board Games", ageRange:"8-15", instructor:"Mr. Lee", description:"Learn strategies", price:8, joined:5, capacity:10, image:"/images/chess.jpg" },
  { title:"Swimming", category:"Sports", ageRange:"6-12", instructor:"Ms. Brown", description:"Pool fun", price:12, joined:1, capacity:10, image:"/images/swimming.jpg" },
  { title:"Drama", category:"Arts", ageRange:"7-14", instructor:"Mr. Green", description:"Acting skills", price:20, joined:4, capacity:10, image:"/images/drama.jpg" },
  { title:"Piano", category:"Music", ageRange:"6-12", instructor:"Ms. White", description:"Learn piano basics", price:18, joined:2, capacity:10, image:"/images/piano.jpg" },
  { title:"Coding", category:"STEM", ageRange:"9-15", instructor:"Mr. Black", description:"Intro to coding", price:25, joined:3, capacity:10, image:"/images/coding.jpg" },
  { title:"Basketball", category:"Sports", ageRange:"7-14", instructor:"Ms. Blue", description:"Dribble and shoot", price:12, joined:6, capacity:10, image:"/images/basketball.jpg" },
  { title:"Singing", category:"Music", ageRange:"6-12", instructor:"Ms. Violet", description:"Vocal training", price:15, joined:2, capacity:10, image:"/images/singing.jpg" },
  { title:"Yoga", category:"Fitness", ageRange:"8-15", instructor:"Mr. Gray", description:"Relax and stretch", price:10, joined:0, capacity:10, image:"/images/yoga.jpg" }
];

const seed = async () => {
  await connectDB();
  const db = client.db(process.env.MONGODB_DB || 'learnhub');
  const col = db.collection('activities');
  await col.deleteMany({});
  await col.insertMany(activities);
  console.log("Activities seeded successfully!");
  process.exit();
};

seed();
