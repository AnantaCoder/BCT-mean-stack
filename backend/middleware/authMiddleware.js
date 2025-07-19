const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.header('Authorization');
        
        if (!authHeader) {
            return res.status(401).json({ 
                error: 'Access denied. No token provided.' 
            });
        }

        if (!authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ 
                error: 'Access denied. Invalid token format. Use: Bearer <token>' 
            });
        }

        const token = authHeader.substring(7); 

        if (!token) {
            return res.status(401).json({ 
                error: 'Access denied. No token provided.' 
            });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        
        req.user = decoded;
        
        next();
        
    } catch (error) {
        console.error('Auth middleware error:', error);
        
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ 
                error: 'Access denied. Token has expired.' 
            });
        } else if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ 
                error: 'Access denied. Invalid token.' 
            });
        } else {
            return res.status(401).json({ 
                error: 'Access denied. Token verification failed.' 
            });
        }
    }
};

module.exports = authMiddleware;