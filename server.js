const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Profile = require('./models/Profile'); // Import the Profile model

const app = express();
const PORT = 3000;

// MongoDB connection string
const MONGO_URI = 'mongodb://127.0.0.1:27017/portfolio';

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Failed to connect to MongoDB:', err));

// Basic test route
app.use(cors());
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Endpoint to fetch your profile
app.get('/profile', async (req, res) => {
    try {
        const profile = await Profile.findOne();
        res.json(profile);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch profile' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});