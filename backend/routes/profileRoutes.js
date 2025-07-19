const express = require('express')
const router = express.Router()
const User = require('../models/User')

const authMiddleware = require('../middleware/authMiddleware')

router.get('/', authMiddleware, async(req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        if (!user) return res.status(404).json({
            message: "user not found"
        })
        res.json(user)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "internal error"
        })
    }
})

module.exports = router