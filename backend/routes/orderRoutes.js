const express = require('express');
const router = express.Router();
const {
  createOrder,
  getMyOrders,
  getArtistOrders,
  updateOrderStatus
} = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.post('/', protect, upload.single('paymentProof'), createOrder);
router.get('/my-orders', protect, getMyOrders);
router.get('/artist-orders', protect, getArtistOrders);
router.put('/:id/status', protect, updateOrderStatus);

module.exports = router;
