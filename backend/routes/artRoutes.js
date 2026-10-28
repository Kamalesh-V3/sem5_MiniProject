const express = require('express');
const router = express.Router();
const {
  getTopArts,
  getTopArtists,
  getAllArts,
  getArtById,
  toggleLikeArt,
  postArt,
  updateArt,
  deleteArt,
  getArtistProfileAndArts,
  getMyArtworks
} = require('../controllers/artController');
const { protect, optionalAuth } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.get('/top-arts', getTopArts);
router.get('/top-artists', getTopArtists);
router.get('/my-arts', protect, getMyArtworks);
router.get('/user/my-arts', protect, getMyArtworks);
router.get('/artist/:identifier', optionalAuth, getArtistProfileAndArts);
router.get('/', getAllArts);
router.post('/', protect, upload.fields([
  { name: 'artImage', maxCount: 1 },
  { name: 'upiQrImage', maxCount: 1 }
]), postArt);
router.post('/:id/like', protect, toggleLikeArt);
router.put('/:id', protect, upload.single('artImage'), updateArt);
router.delete('/:id', protect, deleteArt);
router.get('/:id', getArtById);

module.exports = router;
