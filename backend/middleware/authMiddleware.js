const jwt = require('jsonwebtoken');
const db = require('../config/db');

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_art_gallery_jwt_key_2026_kamalesh_adithya';

const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await db.getUserById(decoded.id);
    if (!user) {
      return res.status(401).json({ success: false, message: 'User belonging to this token no longer exists.' });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token.' });
  }
};

const optionalAuth = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      const user = await db.getUserById(decoded.id);
      if (user) {
        req.user = user;
      }
    } catch (err) {
      // Ignore token verification errors for optional auth
    }
  }
  next();
};

const requireArtist = (req, res, next) => {
  if (req.user && (req.user.role === 'artist' || req.user.role === 'admin' || req.user.isArtist)) {
    next();
  } else {
    return res.status(403).json({ success: false, message: 'Access denied. Artist privileges required.' });
  }
};

const requireAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return res.status(403).json({ success: false, message: 'Access denied. Admin privileges required.' });
  }
};

module.exports = {
  protect,
  optionalAuth,
  requireArtist,
  requireAdmin
};
