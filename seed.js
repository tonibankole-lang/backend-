import { connectDB, client } from './db.js';
import { ObjectId } from 'mongodb';

const seedActivities = async () => {
  try {
    await connectDB();
    const db = client.db(process.env.MONGODB_DB || 'activitiesDB');
    const activitiesCol = db.collection('activities');

    // Remove existing activities
    await activitiesCol.deleteMany({});

    // Seed data
    const activities = [
      {
        _id: new ObjectId(),
        title: "Soccer Training",
        category: "Sports",
        ageRange: "8-12",
        instructor: "John Doe",
        description: "Improve your soccer skills!",
        longDescription: "Join our soccer training to enhance your dribbling, passing, and shooting skills. Suitable for kids 8-12.",
        price: 15,
        joined: 5,
        capacity: 10,
        image: "soccer.jpg",
        duration: "1 hour",
        schedule: "Mon & Wed 4-5pm"
      },
      {
        _id: new ObjectId(),
        title: "Painting Class",
        category: "Arts",
        ageRange: "6-10",
        instructor: "Jane Smith",
        description: "Learn to paint!",
        longDescription: "Explore colors and techniques while creating your own masterpieces. Perfect for beginners.",
        price: 12,
        joined: 2,
        capacity: 10,
        image: "painting.jpg",
        duration: "1.5 hours",
        schedule: "Tue & Thu 3-4:30pm"
      },
      {
        _id: new ObjectId(),
        title: "Chess Club",
        category: "Games",
        ageRange: "10-14",
        instructor: "Alice Brown",
        description: "Improve strategic thinking!",
        longDescription: "Learn chess tactics, strategies, and participate in friendly tournaments.",
        price: 10,
        joined: 6,
        capacity: 10,
        image: "chess.jpg",
        duration: "1 hour",
        schedule: "Fri 4-5pm"
      },
      {
        _id: new ObjectId(),
        title: "Dance Class",
        category: "Arts",
        ageRange: "8-12",
        instructor: "Emma White",
        description: "Learn to dance!",
        longDescription: "Fun and energetic dance sessions for kids. Styles include hip-hop and jazz.",
        price: 14,
        joined: 5,
        capacity: 10,
        image: "dance.jpg",
        duration: "1 hour",
        schedule: "Mon & Wed 5-6pm"
      },
      {
        _id: new ObjectId(),
        title: "Music Lessons",
        category: "Music",
        ageRange: "7-11",
        instructor: "Liam Green",
        description: "Learn an instrument!",
        longDescription: "Private and group lessons for piano, guitar, or violin.",
        price: 13,
        joined: 3,
        capacity: 10,
        image: "music.jpg",
        duration: "45 minutes",
        schedule: "Tue & Thu 4-4:45pm"
      },
      {
        _id: new ObjectId(),
        title: "Basketball",
        category: "Sports",
        ageRange: "9-13",
        instructor: "Olivia Blue",
        description: "Fun basketball sessions!",
        longDescription: "Develop your basketball skills in a fun and safe environment.",
        price: 16,
        joined: 7,
        capacity: 10,
        image: "basketball.jpg",
        duration: "1 hour",
        schedule: "Wed & Fri 4-5pm"
      },
      {
        _id: new ObjectId(),
        title: "Coding Club",
        category: "Tech",
        ageRange: "10-15",
        instructor: "Noah Gray",
        description: "Learn coding basics!",
        longDescription: "Learn JavaScript, Python, and create small projects. Beginner friendly.",
        price: 20,
        joined: 4,
        capacity: 10,
        image: "coding.jpg",
        duration: "1.5 hours",
        schedule: "Sat 10-11:30am"
      },
      {
        _id: new ObjectId(),
        title: "Drama Workshop",
        category: "Arts",
        ageRange: "8-14",
        instructor: "Sophia Red",
        description: "Acting skills fun!",
        longDescription: "Learn acting, improvisation, and stage presence.",
        price: 18,
        joined: 6,
        capacity: 10,
        image: "drama.jpg",
        duration: "1 hour",
        schedule: "Thu 4-5pm"
      },
      {
        _id: new ObjectId(),
        title: "Swimming Lessons",
        category: "Sports",
        ageRange: "6-12",
        instructor: "Mason Black",
        description: "Learn swimming safely!",
        longDescription: "Safe swimming lessons for beginners and intermediates.",
        price: 14,
        joined: 5,
        capacity: 10,
        image: "swimming.jpg",
        duration: "45 minutes",
        schedule: "Mon, Wed, Fri 3-3:45pm"
      },
      {
        _id: new ObjectId(),
        title: "Photography",
        category: "Arts",
        ageRange: "11-15",
        instructor: "Ava Yellow",
        description: "Learn photography skills!",
        longDescription: "Learn composition, lighting, and editing to capture stunning photos.",
        price: 17,
        joined: 2,
        capacity: 10,
        image: "photography.jpg",
        duration: "1 hour",
        schedule: "Sat 2-3pm"
      }
    ];

    await activitiesCol.insertMany(activities);
    console.log('Activities seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedActivities();
