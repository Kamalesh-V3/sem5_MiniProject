const express = require('express');
const router = express.Router();
const {
  getAdminStats,
  getPendingArts,
  approveArtRequest,
  rejectArtRequest,
  getCustomers,
  getArtists,
  updateUserByAdmin,
  deleteUserByAdmin,
  getAllArtsAdmin,
  getAllOrdersAdmin
} = require('../controllers/adminController');
const { protect, requireAdmin } = require('../middleware/authMiddleware');

router.use(protect, requireAdmin);

router.get('/stats', getAdminStats);
router.get('/pending-arts', getPendingArts);
router.put('/arts/:id/approve', approveArtRequest);
router.put('/arts/:id/reject', rejectArtRequest);
router.get('/customers', getCustomers);
router.get('/artists', getArtists);
router.put('/users/:id', updateUserByAdmin);
router.delete('/users/:id', deleteUserByAdmin);
router.get('/arts', getAllArtsAdmin);
router.get('/orders', getAllOrdersAdmin);

module.exports = router;
