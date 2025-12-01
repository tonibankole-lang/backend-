// Mock activities
const activities = [
  {
    title: 'Painting Class',
    category: 'Art',
    ageRange: '6-12',
    instructor: 'Mrs. Smith',
    duration: '1 hour',
    schedule: 'Mon & Wed 4-5pm',
    price: 20,
    description: 'Learn painting techniques for beginners — color mixing, brushwork and fun projects.',
    image: 'https://images.pexels.com/photos/207962/pexels-photo-207962.jpeg?auto=compress&cs=tinysrgb&h=350'
  },
  {
    title: 'Soccer Training',
    category: 'Sports',
    ageRange: '8-14',
    instructor: 'Coach John',
    duration: '1.5 hours',
    schedule: 'Tue & Thu 3-4:30pm',
    price: 15,
    description: 'Improve ball control, passing and teamwork in a fun environment.',
    image: 'https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&h=350'
  },
  {
    title: 'Yoga for Kids',
    category: 'Health',
    ageRange: '5-10',
    instructor: 'Ms. Linda',
    duration: '45 min',
    schedule: 'Mon & Fri 5-5:45pm',
    price: 12,
    description: 'Gentle, playful yoga to help focus and flexibility — poses, breathing and relaxation.',
    image: 'https://images.pexels.com/photos/3823036/pexels-photo-3823036.jpeg?auto=compress&cs=tinysrgb&h=350'
  },
  {
    title: 'Guitar Lessons',
    category: 'Music',
    ageRange: '7-15',
    instructor: 'Mr. Brian',
    duration: '1 hour',
    schedule: 'Wed & Sat 2-3pm',
    price: 25,
    description: 'Learn chords, strumming patterns and simple songs on acoustic guitar.',
    image: 'https://images.pexels.com/photos/164821/pexels-photo-164821.jpeg?auto=compress&cs=tinysrgb&h=350'
  },
  {
    title: 'Chess Club',
    category: 'Strategy',
    ageRange: '8-16',
    instructor: 'Coach Mark',
    duration: '1 hour',
    schedule: 'Tue & Thu 4-5pm',
    price: 10,
    description: 'Tactics, openings and fun matches to build logical thinking.',
    image: 'https://images.pexels.com/photos/256133/pexels-photo-256133.jpeg?auto=compress&cs=tinysrgb&h=350'
  },
  {
    title: 'Baking Class',
    category: 'Cooking',
    ageRange: '6-14',
    instructor: 'Chef Anna',
    duration: '1.5 hours',
    schedule: 'Sat 10-11:30am',
    price: 18,
    description: 'Hands-on baking: cupcakes, cookies and simple pastries with kid-friendly recipes.',
    image: 'https://images.pexels.com/photos/3026806/pexels-photo-3026806.jpeg?auto=compress&cs=tinysrgb&h=350'
  },
  {
    title: 'Dance Workshop',
    category: 'Dance',
    ageRange: '5-12',
    instructor: 'Ms. Clara',
    duration: '1 hour',
    schedule: 'Mon & Thu 4-5pm',
    price: 15,
    description: 'Energetic dance routines combining hip-hop and creative movement.',
    image: 'https://images.pexels.com/photos/3661329/pexels-photo-3661329.jpeg?auto=compress&cs=tinysrgb&h=350'
  },
  {
    title: 'Science Experiments',
    category: 'STEM',
    ageRange: '7-13',
    instructor: 'Mr. Alan',
    duration: '1 hour',
    schedule: 'Wed & Fri 3-4pm',
    price: 22,
    description: 'Safe hands-on experiments to explore chemistry and physics concepts.',
    image: 'https://images.pexels.com/photos/256262/pexels-photo-256262.jpeg?auto=compress&cs=tinysrgb&h=350'
  },
  {
    title: 'Photography Basics',
    category: 'Art',
    ageRange: '10-16',
    instructor: 'Ms. Rachel',
    duration: '1.5 hours',
    schedule: 'Sat 2-3:30pm',
    price: 30,
    description: 'Learn composition, lighting and how to use any camera or phone to take great photos.',
    image: 'https://images.pexels.com/photos/274973/pexels-photo-274973.jpeg?auto=compress&cs=tinysrgb&h=350'
  },
  {
    title: 'Swimming Lessons',
    category: 'Sports',
    ageRange: '6-12',
    instructor: 'Coach Mike',
    duration: '1 hour',
    schedule: 'Tue & Thu 5-6pm',
    price: 20,
    description: 'Safety-first swim lessons for beginners — strokes, floating and pool confidence.',
    image: 'https://images.pexels.com/photos/261185/pexels-photo-261185.jpeg?auto=compress&cs=tinysrgb&h=350'
  }
];

// State
let cart = [];
let currentUser = JSON.parse(localStorage.getItem('user') || 'null');
let selectedActivity = null;

// DOM refs
const activitiesEl = document.getElementById('activities');
const cartToggle = document.getElementById('cart-toggle');
const cartEl = document.getElementById('cart');
const cartBadge = document.getElementById('cart-badge');
const cartItemsEl = document.getElementById('cart-items');
const cartTotalEl = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');

const activityModal = document.getElementById('activity-modal');
const activityTitle = document.getElementById('activity-title');
const activityImage = document.getElementById('activity-image');
const activityDescription = document.getElementById('activity-description');
const activityDetails = document.getElementById('activity-details');
const modalAddCart = document.getElementById('modal-add-cart');
const modalClose = document.getElementById('modal-close');

const authModal = document.getElementById('auth-modal');
const authName = document.getElementById('auth-name');
const authEmail = document.getElementById('auth-email');
const authPassword = document.getElementById('auth-password');
const authSubmit = document.getElementById('auth-submit');
const authSwitch = document.getElementById('auth-switch');
const btnOpenLogin = document.getElementById('btn-open-login');

const checkoutModal = document.getElementById('checkout-modal');
const checkoutItemsEl = document.getElementById('checkout-items');
const custName = document.getElementById('cust-name');
const custEmail = document.getElementById('cust-email');
const custPhone = document.getElementById('cust-phone');
const custAddress = document.getElementById('cust-address');
const placeOrderBtn = document.getElementById('place-order');

let authMode = 'login';

// Render activities
function renderActivities(){
  activitiesEl.innerHTML = '';
  activities.forEach(a=>{
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${a.image}" alt="${a.title}">
      <h3>${a.title}</h3>
      <div class="meta">${a.category} • ${a.ageRange}</div>
      <div class="meta">Instructor: ${a.instructor}</div>
      <div class="price">£${a.price}</div>
      <p>${a.description}</p>
      <button>Add to cart</button>
    `;
    card.querySelector('button').addEventListener('click', e=>{
      e.stopPropagation();
      addToCart(a);
    });
    card.addEventListener('click', ()=>openActivityModal(a));
    activitiesEl.appendChild(card);
  });
}

// Cart functions
function updateCartUI(){
  cartBadge.textContent = cart.length;
  cartItemsEl.innerHTML = '';
  let total = 0;
  cart.forEach((it, idx)=>{
    const d = document.createElement('div');
    d.className = 'cart-item';
    d.innerHTML = `<img src="${it.image}"><div>
      <div class="title">${it.title}</div>
      <small>£${it.price} • ${it.ageRange}</small>
      <div style="margin-top:6px"><button data-idx="${idx}">Remove</button></div>
    </div>`;
    d.querySelector('button').addEventListener('click', ()=>{ cart.splice(idx,1); updateCartUI(); });
    cartItemsEl.appendChild(d);
    total += Number(it.price || 0);
  });
  cartTotalEl.textContent = total.toFixed(2);
}
function addToCart(item){ cart.push(item); updateCartUI(); openCart(); }

// Modals
function openCart(){ cartEl.classList.add('open'); }
function closeCart(){ cartEl.classList.remove('open'); }

function openActivityModal(activity){
  selectedActivity = activity;
  activityTitle.textContent = activity.title;
  activityImage.src = activity.image;
  activityDescription.textContent = activity.description;
  activityDetails.innerHTML = `
    <p><strong>Instructor:</strong> ${activity.instructor}</p>
    <p><strong>Age Range:</strong> ${activity.ageRange}</p>
    <p><strong>Duration:</strong> ${activity.duration}</p>
    <p><strong>Schedule:</strong> ${activity.schedule}</p>
    <p><strong>Price:</strong> £${activity.price}</p>
  `;
  activityModal.classList.add('open');
}
modalClose.addEventListener('click', ()=>activityModal.classList.remove('open'));
modalAddCart.addEventListener('click', ()=>{
  if(selectedActivity) addToCart(selectedActivity);
  activityModal.classList.remove('open');
});

cartToggle.addEventListener('click', ()=>cartEl.classList.contains('open')? closeCart():openCart());

// Auth modal
btnOpenLogin.addEventListener('click', ()=>authModal.classList.add('open'));
authSwitch.addEventListener('click', ()=>{
  authMode = authMode==='login'?'signup':'login';
  authName.style.display = authMode==='signup'?'block':'none';
});
authSubmit.addEventListener('click', ()=>{
  if(authMode==='signup'){
    currentUser = { name: authName.value, email: authEmail.value };
  } else {
    currentUser = { name: authEmail.value.split('@')[0], email: authEmail.value };
  }
  localStorage.setItem('user', JSON.stringify(currentUser));
  alert(authMode==='signup'?'Signed up':'Logged in');
  authModal.classList.remove('open');
});

// Checkout
checkoutBtn.addEventListener('click', ()=>{
  if(cart.length===0){ alert('Cart is empty'); return; }
  checkoutItemsEl.innerHTML = '';
  cart.forEach(it=>{
    const div = document.createElement('div');
    div.textContent = `${it.title} — £${it.price}`;
    checkoutItemsEl.appendChild(div);
  });
  checkoutModal.classList.add('open');
});

placeOrderBtn.addEventListener('click', ()=>{
  alert(`Order placed! Total: £${cart.reduce((s,i)=>s+Number(i.price),0)}`);
  cart = [];
  updateCartUI();
  checkoutModal.classList.remove('open');
});

// Initialize
renderActivities();
updateCartUI();
