# LearnHub Backend API

Express.js REST API for the LearnHub lesson booking system.

## 🔗 Links

- **Live API**: `https://backend-7lgl.onrender.com`
- **All Lessons**: `https://backend-7lgl.onrender.com/lessons`
- **Frontend Repo**: [frontend](https://github.com/tonibankole-lang/frontend)

## 🛠 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (native driver - no Mongoose)
- **Hosting**: Render.com

## 📋 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | API info and available endpoints |
| `GET` | `/health` | Health check (status, mode, timestamp) |
| `GET` | `/lessons` | Get all lessons |
| `GET` | `/lessons/:id` | Get single lesson by ID |
| `PUT` | `/lessons/:id` | Update lesson (e.g., reduce spaces) |
| `POST` | `/orders` | Create a new order |
| `GET` | `/orders` | Get all orders (admin) |
| `GET` | `/search?q=` | Search lessons by subject, location, price, spaces |
| `GET` | `/images/:filename` | Serve static lesson images |

## 🚀 Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Create `.env` file
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority
DB_NAME=learnhub
PORT=3000
```

### 3. Seed the database
```bash
npm run seed
```

### 4. Start the server
```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

## 📁 Project Structure

```
backend/
├── server.js           # Main Express server with all routes
├── seed.js             # Database seeder script
├── data/
│   └── lessons-seed.json   # Initial lesson data (12 lessons)
├── images/
│   └── sources.json    # Image attribution and licenses
├── .env.example        # Environment variables template
└── package.json
```

## 🧪 Testing with cURL

```bash
# Get all lessons
curl http://localhost:3000/lessons

# Get single lesson
curl http://localhost:3000/lessons/LESSON_ID

# Search lessons
curl "http://localhost:3000/search?q=math"

# Create order
curl -X POST http://localhost:3000/orders \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","phone":"1234567890","lessonIDs":["id1"],"numSpaces":[1]}'

# Update lesson spaces
curl -X PUT http://localhost:3000/lessons/LESSON_ID \
  -H "Content-Type: application/json" \
  -d '{"spaces": 4}'
```

## 🌐 Deploy to Render

1. Push code to GitHub
2. Create new **Web Service** on [render.com](https://render.com)
3. Connect your GitHub repository
4. Set environment variables:
   - `MONGODB_URI` - Your MongoDB Atlas connection string
   - `DB_NAME` - Database name (e.g., `learnhub`)
5. Deploy!

## 📝 Lesson Schema

```json
{
  "_id": "ObjectId",
  "subject": "Mathematics",
  "location": "Room 101",
  "price": 25,
  "spaces": 5,
  "image": "mathematics.jpg",
  "icon": "fa-calculator"
}
```

## 📝 Order Schema

```json
{
  "_id": "ObjectId",
  "name": "John Doe",
  "phone": "1234567890",
  "lessonIDs": ["id1", "id2"],
  "numSpaces": [1, 2],
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

## 📄 License

MIT
