import './main.css';
import './style.css';

const app = document.getElementById('app');

app.innerHTML = `<h1>LearnHub Activities</h1><div class="activities-grid" id="activities"></div>`;

const activitiesEl = document.getElementById('activities');

// Fetch activities from backend
const fetchActivities = async () => {
  try {
    const res = await fetch('http://localhost:4000/api/activities');
    if (!res.ok) throw new Error('Failed to fetch activities');
    const activities = await res.json();

    if (activities.length === 0) {
      activitiesEl.innerHTML = `<p>No activities found.</p>`;
      return;
    }

    activitiesEl.innerHTML = activities.map(a => `
      <div class="card">
        <img src="${a.image || './assets/images/default.jpg'}" alt="${a.title}">
        <h3>${a.title}</h3>
        <p class="price">£${a.price}</p>
        <button>Add to Cart</button>
      </div>
    `).join('');

  } catch (err) {
    console.error(err);
    activitiesEl.innerHTML = `<p>Error loading activities.</p>`;
  }
};

fetchActivities();
