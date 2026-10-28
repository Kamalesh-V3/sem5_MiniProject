const db = require('../config/db');

// @desc    Get top arts sorted by likes count
// @route   GET /api/arts/top-arts
// @access  Public
const getTopArts = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 6;
    const allArts = await db.getArts({ status: 'approved' });
    const sorted = allArts.sort((a, b) => (b.likesCount || 0) - (a.likesCount || 0)).slice(0, limit);
    res.json({ success: true, count: sorted.length, arts: sorted });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get top artists sorted by total likes of their artworks
// @route   GET /api/arts/top-artists
// @access  Public
const getTopArtists = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 6;
    const artists = await db.getUsers({ isArtist: true, isActive: true });
    const allApprovedArts = await db.getArts({ status: 'approved' });

    const artistsWithStats = artists.map(artist => {
      const artistArts = allApprovedArts.filter(a => String(a.artist) === String(artist._id));
      const totalLikes = artistArts.reduce((acc, curr) => acc + (curr.likesCount || 0), 0);
      const safeArtist = { ...artist };
      delete safeArtist.password;
      return {
        ...safeArtist,
        totalArtworks: artistArts.length,
        totalLikes
      };
    });

    const sortedArtists = artistsWithStats
      .sort((a, b) => b.totalLikes - a.totalLikes)
      .slice(0, limit);

    res.json({ success: true, count: sortedArtists.length, artists: sortedArtists });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all public arts with filtering, search, and sorting
// @route   GET /api/arts
// @access  Public
const getAllArts = async (req, res) => {
  try {
    const { category, search, sort, minPrice, maxPrice } = req.query;
    let arts = await db.getArts({ status: 'approved' });

    // Category filter
    if (category && category !== 'All') {
      arts = arts.filter(a => a.category.toLowerCase() === category.toLowerCase());
    }

    // Search query (title, description, or artist name)
    if (search && search.trim()) {
      const q = search.trim().toLowerCase();
      arts = arts.filter(a =>
        (a.title && a.title.toLowerCase().includes(q)) ||
        (a.description && a.description.toLowerCase().includes(q)) ||
        (a.artistName && a.artistName.toLowerCase().includes(q)) ||
        (a.category && a.category.toLowerCase().includes(q))
      );
    }

    // Price range
    if (minPrice) {
      arts = arts.filter(a => Number(a.price) >= Number(minPrice));
    }
    if (maxPrice) {
      arts = arts.filter(a => Number(a.price) <= Number(maxPrice));
    }

    // Sorting
    if (sort === 'likes') {
      arts.sort((a, b) => (b.likesCount || 0) - (a.likesCount || 0));
    } else if (sort === 'price-low') {
      arts.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-high') {
      arts.sort((a, b) => b.price - a.price);
    } else if (sort === 'newest') {
      arts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else {
      // default: most liked or newest
      arts.sort((a, b) => (b.likesCount || 0) - (a.likesCount || 0));
    }

    res.json({ success: true, count: arts.length, arts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single art details
// @route   GET /api/arts/:id
// @access  Public
const getArtById = async (req, res) => {
  try {
    const art = await db.getArtById(req.params.id);
    if (!art) {
      return res.status(404).json({ success: false, message: 'Artwork not found.' });
    }

    let artist = await db.getUserById(art.artist);
    if (!artist && art.artistUsername) {
      artist = await db.findUser({ username: art.artistUsername });
    }
    let artistData = null;
    if (artist) {
      artistData = {
        _id: artist._id,
        username: artist.username,
        name: artist.name || artist.username,
        avatar: artist.avatar,
        bio: artist.bio,
        upiId: artist.upiId,
        upiQr: artist.upiQr,
        bankDetails: artist.bankDetails || art.artistBankDetails || null
      };
    }

    res.json({ success: true, art, artist: artistData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Toggle like / unlike for an art
// @route   POST /api/arts/:id/like
// @access  Private (Registered User)
const toggleLikeArt = async (req, res) => {
  try {
    const userId = String(req.user._id);
    const art = await db.getArtById(req.params.id);
    if (!art) {
      return res.status(404).json({ success: false, message: 'Artwork not found.' });
    }

    const likes = Array.isArray(art.likes) ? art.likes.map(id => String(id)) : [];
    const alreadyLiked = likes.includes(userId);

    let updatedLikes;
    if (alreadyLiked) {
      updatedLikes = likes.filter(id => id !== userId);
    } else {
      updatedLikes = [...likes, userId];
    }

    const updatedArt = await db.updateArt(art._id, {
      likes: updatedLikes,
      likesCount: updatedLikes.length
    });

    res.json({
      success: true,
      liked: !alreadyLiked,
      likesCount: updatedArt.likesCount,
      message: alreadyLiked ? 'Removed from your liked arts.' : 'Artwork liked! Added to favorites.'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Post a new artwork (Customer submits -> waits for Admin approval; 1st time requires UPI QR or Bank Account)
// @route   POST /api/arts
// @access  Private
const postArt = async (req, res) => {
  try {
    const user = req.user;
    const {
      title,
      description,
      category,
      dimensions,
      price,
      imageUrl,
      artistUpiId,
      artistBio,
      bankAccountNumber,
      bankIfsc,
      bankHolderName,
      bankName
    } = req.body;

    if (!title || !description || !category || !price) {
      return res.status(400).json({ success: false, message: 'Title, description, category, and price are required.' });
    }

    // Determine artwork image
    let finalImageUrl = imageUrl;
    if (req.files && req.files['artImage'] && req.files['artImage'][0]) {
      finalImageUrl = `/uploads/${req.files['artImage'][0].filename}`;
    }

    if (!finalImageUrl) {
      return res.status(400).json({ success: false, message: 'Please provide an image for the artwork.' });
    }

    // Check if this is the first artwork or if user is not yet an artist
    const userArts = await db.getArts({ artist: user._id });
    const isFirstTime = userArts.length === 0 || !user.isArtist;

    // Handle Bank Account Details if provided
    let bankDetails = null;
    if (bankAccountNumber && bankIfsc) {
      bankDetails = {
        accountNumber: String(bankAccountNumber).trim(),
        ifsc: String(bankIfsc).trim().toUpperCase(),
        accountHolderName: String(bankHolderName || user.username || '').trim(),
        bankName: String(bankName || '').trim()
      };
    }

    // Handle UPI QR Code
    let upiQrUrl = user.upiQr || '';
    if (req.files && req.files['upiQrImage'] && req.files['upiQrImage'][0]) {
      upiQrUrl = `/uploads/${req.files['upiQrImage'][0].filename}`;
    } else if (req.body.upiQrUrl) {
      upiQrUrl = req.body.upiQrUrl;
    }

    const upiId = artistUpiId || user.upiId || '';

    // If 1st time submission, user must submit either a QR code image or bank account details
    if (isFirstTime && !upiQrUrl && !upiId && !bankDetails) {
      return res.status(400).json({
        success: false,
        message: 'As this is your first art submission, please submit your payment QR code image or your bank account details so customers can pay you directly.'
      });
    }

    // Update user profile with payment and bio details
    const userUpdates = {};
    if (upiId && !user.upiId) userUpdates.upiId = upiId;
    if (upiQrUrl) userUpdates.upiQr = upiQrUrl;
    if (bankDetails) userUpdates.bankDetails = bankDetails;
    if (artistBio && !user.bio) userUpdates.bio = artistBio;

    // If user is a customer, mark application as pending
    let artStatus = 'pending';
    if (user.role === 'admin') {
      artStatus = 'approved';
    } else if (user.isArtist && user.role === 'artist') {
      artStatus = 'approved';
    } else {
      userUpdates.artistApplicationStatus = 'pending';
    }

    if (Object.keys(userUpdates).length > 0) {
      await db.updateUser(user._id, userUpdates);
    }

    const newArt = await db.createArt({
      title: title.trim(),
      description: description.trim(),
      category,
      dimensions: dimensions || '24 x 36 inches',
      price: Number(price),
      imageUrl: finalImageUrl,
      artist: user._id,
      artistName: user.username,
      artistUsername: user.username,
      artistAvatar: user.avatar,
      artistUpiId: upiId || user.upiId,
      artistUpiQr: upiQrUrl || user.upiQr,
      artistBankDetails: bankDetails || user.bankDetails || null,
      likes: [],
      likesCount: 0,
      status: artStatus
    });

    res.status(201).json({
      success: true,
      message: artStatus === 'pending'
        ? 'Artwork submitted successfully! It is currently waiting for Admin approval. Once approved, you will become a verified Artist!'
        : 'Artwork published successfully to the gallery!',
      art: newArt
    });
  } catch (error) {
    console.error('Post art error:', error);
    res.status(500).json({ success: false, message: error.message || 'Server error while posting art.' });
  }
};

// @desc    Edit artwork details (by artist or admin)
// @route   PUT /api/arts/:id
// @access  Private (Artist/Admin)
const updateArt = async (req, res) => {
  try {
    const art = await db.getArtById(req.params.id);
    if (!art) {
      return res.status(404).json({ success: false, message: 'Artwork not found.' });
    }

    // Check ownership
    const isOwner = String(art.artist) === String(req.user._id);
    const isAdmin = req.user.role === 'admin';

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ success: false, message: 'You are not authorized to edit this artwork.' });
    }

    const { title, description, category, dimensions, price, status } = req.body;
    const updates = {};
    if (title) updates.title = title.trim();
    if (description) updates.description = description.trim();
    if (category) updates.category = category;
    if (dimensions) updates.dimensions = dimensions;
    if (price !== undefined) updates.price = Number(price);

    if (req.file) {
      updates.imageUrl = `/uploads/${req.file.filename}`;
    }

    if (isAdmin && status) {
      updates.status = status;
    }

    const updatedArt = await db.updateArt(art._id, updates);
    res.json({
      success: true,
      message: 'Artwork details updated successfully!',
      art: updatedArt
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete artwork
// @route   DELETE /api/arts/:id
// @access  Private (Artist/Admin)
const deleteArt = async (req, res) => {
  try {
    const art = await db.getArtById(req.params.id);
    if (!art) {
      return res.status(404).json({ success: false, message: 'Artwork not found.' });
    }

    const isOwner = String(art.artist) === String(req.user._id);
    const isAdmin = req.user.role === 'admin';

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ success: false, message: 'You are not authorized to delete this artwork.' });
    }

    await db.deleteArt(art._id);
    res.json({ success: true, message: 'Artwork deleted successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get artist profile and all their arts (Instagram-style feed)
// @route   GET /api/arts/artist/:identifier
// @access  Public (Optional auth for artist owner features)
const getArtistProfileAndArts = async (req, res) => {
  try {
    const { identifier } = req.params;
    let artist = await db.getUserById(identifier);
    if (!artist) {
      artist = await db.findUser({ username: identifier });
    }
    if (!artist) {
      const allUsers = await db.getUsers();
      artist = allUsers.find(
        u => u.username?.toLowerCase() === identifier.toLowerCase() || String(u._id) === String(identifier)
      );
    }

    if (!artist) {
      return res.status(404).json({ success: false, message: 'Artist not found.' });
    }

    const isOwnerOrAdmin = Boolean(
      req.user &&
      (String(req.user._id) === String(artist._id) ||
        (req.user.username && artist.username && req.user.username.toLowerCase() === artist.username.toLowerCase()) ||
        req.user.role === 'admin')
    );

    // Fetch all arts matching artist ID or artist username
    const allArts = await db.getArts();
    const artistArts = allArts.filter(a => {
      const matchArtist =
        String(a.artist) === String(artist._id) ||
        (a.artistUsername && artist.username && a.artistUsername.toLowerCase() === artist.username.toLowerCase());
      if (!matchArtist) return false;
      if (isOwnerOrAdmin) return true;
      return a.status === 'approved';
    });

    // Compute total likes across arts
    const totalLikes = artistArts.reduce(
      (acc, curr) => acc + (curr.likesCount || (Array.isArray(curr.likes) ? curr.likes.length : 0)),
      0
    );

    // Fetch customer orders placed for this artist's artworks
    const allOrders = await db.getOrders();
    const artistOrders = allOrders.filter(o => {
      return (
        String(o.artist) === String(artist._id) ||
        (o.artistName && artist.username && o.artistName.toLowerCase() === artist.username.toLowerCase())
      );
    });

    const safeArtist = { ...artist };
    delete safeArtist.password;

    res.json({
      success: true,
      isOwner: isOwnerOrAdmin,
      artist: {
        ...safeArtist,
        totalArtworks: artistArts.length,
        totalLikes,
        totalOrders: artistOrders.length
      },
      arts: artistArts,
      orders: isOwnerOrAdmin ? artistOrders : undefined
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get arts submitted by currently logged in user (approved or pending)
// @route   GET /api/arts/my-arts
// @access  Private
const getMyArtworks = async (req, res) => {
  try {
    const allArts = await db.getArts();
    const arts = allArts.filter((art) =>
      String(art.artist) === String(req.user._id) ||
      (art.artistUsername && req.user.username &&
        art.artistUsername.toLowerCase() === req.user.username.toLowerCase())
    );
    res.json({ success: true, arts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getTopArts,
  getTopArtists,
  getAllArts,
  getArtById,
  toggleLikeArt,
  postArt,
  updateArt,
  deleteArt,
  getArtistProfileAndArts,
  getMyArtworks,
};
