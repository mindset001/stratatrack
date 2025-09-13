const express = require('express');
const app = express(); 
const PORT = process.env.PORT || 4000; 
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.connect('mongodb://localhost:27017/stratatrack', { useNewUrlParser: true, useUnifiedTopology: true });

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
  status: String,
});
const User = mongoose.model('User', UserSchema);

app.use(cors());
app.use(express.json());

// In-memory data (replace with DB later)
let logs = [
  { id: 1, action: 'User login', user: 'Jane Doe', time: '2 min ago', details: 'IP: 192.168.1.1, Browser: Chrome' },
  { id: 2, action: 'Changed settings', user: 'John Smith', time: '10 min ago', details: 'Theme changed to Dark' },
  { id: 3, action: 'Added user', user: 'Alice Brown', time: '1 hour ago', details: 'Role: Viewer, Status: Inactive' },
];
let notifications = [
  { id: 1, message: 'New user registered: Alice Brown', time: '1 hour ago' },
  { id: 2, message: 'System update available', time: 'Yesterday' },
];

app.get('/', (req, res) => {
  res.send('Hello from Node backend!');
});

// Users API
app.get('/api/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});
app.post('/api/users', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.status(201).json(user);
});
app.put('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  users = users.map(u => u.id === id ? { ...u, ...req.body } : u);
  res.json(users.find(u => u.id === id));
});
app.delete('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  users = users.filter(u => u.id !== id);
  res.status(204).end();
});

// Logs API
app.get('/api/logs', (req, res) => {
  res.json(logs);
});

// Notifications API
app.get('/api/notifications', (req, res) => {
  res.json(notifications);
});

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
