const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const User = require('./models/User')
const authRoutes = require('./routes/authRoutes')
const todoRoutes= require('./routes/todoRoutes')
const profileRoutes= require('./routes/profileRoutes')

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

app.use('/api/auth', authRoutes);
console.log('Auth routes mounted at /api/auth');

app.use('/api/todo', todoRoutes)
console.log("Todo routes mounted at /api/todo")

app.use('/api/profile', profileRoutes)
console.log("Profile routes mounted at /api/profile") 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});