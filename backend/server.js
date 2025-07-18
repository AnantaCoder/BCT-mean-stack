const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const User = require('./models/User')
const authRoutes = require('./routes/authRoutes')

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true, // ei uri ta use korbo , url er string nue6i setake 
    useUnifiedTopology: true //handle mongodb drivers 
})
    .then(() => console.log('MongoDB connected'))
    .catch((e) => {
        console.error('MongoDB connection error:', e);
        process.exit(1);
    });

app.get('/', (req, res) => {
    res.send('Welcome to the BCT backend API!');
});

app.post('/data', async (req, resp) => {
    try {
        const { fullname, email, password } = req.body;
        if (!fullname || !email || !password) {
            return resp.status(400).json({ error: 'All fields are required.' });
        }
        const user = new User({ fullname, email, password })
        await user.save()
        resp.status(201).json({
            message: 'User created successfully', user
        })
    } catch (error) {
        if (error.code === 11000) {
            return resp.status(409).json({
                error: 'Email already exists.'
            })
        }
        resp.status(500).json({
            error: 'Server error', details: error.message
        });
    }
});

app.use('/api/auth', authRoutes);
console.log('Auth routes mounted at /api/auth');

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});