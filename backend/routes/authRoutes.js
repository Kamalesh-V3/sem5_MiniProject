const express = require('express');
const router = express.Router();
const { signup, login, getMe, updateProfile } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.post('/signup', signup);
router.post('/login', login);
router.get('/me', protect, getMe);
router.put(
  '/profile',
  protect,
  upload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'upiQrImage', maxCount: 1 }
  ]),
  updateProfile
);

module.exports = router;
