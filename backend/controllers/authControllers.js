const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.register = async (req, res) => {
  try {
    const { fullname, email, password } = req.body
    if (!fullname || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' })
    }

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = new User({
      fullname,
      email,
      password: hashedPassword
    })

    await user.save()
    res.status(201).json({ message: 'User registered successfully', user })
  } catch (error) {
    console.error('Error in registration', error)
    res.status(500).json({ error: 'Server error', details: error.message })
  }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' })
    }

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }

    const isMatch = await user.comparePasswords(password)
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '1d' })

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        fullname: user.fullname,
        email: user.email
      }
    })
  } catch (error) {
    console.error('Error in login:', error)
    res.status(500).json({ error: 'Server error', details: error.message })
  }
}

