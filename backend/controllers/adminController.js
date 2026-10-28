const db = require('../config/db');

// @desc    Get dashboard statistics for Admin
// @route   GET /api/admin/stats
// @access  Private (Admin)
const getAdminStats = async (req, res) => {
  try {
    const allUsers = await db.getUsers({});
    const allArts = await db.getArts({});
    const allOrders = await db.getOrders({});

    const customers = allUsers.filter(u => u.role === 'customer' && !u.isArtist);
    const artists = allUsers.filter(u => u.isArtist || u.role === 'artist');
    const pendingArts = allArts.filter(a => a.status === 'pending');
    const approvedArts = allArts.filter(a => a.status === 'approved');

    const totalRevenue = allOrders.reduce((sum, ord) => sum + (ord.amount || 0), 0);

    res.json({
      success: true,
      stats: {
        totalUsers: allUsers.length,
        customersCount: customers.length,
        artistsCount: artists.length,
        totalArts: allArts.length,
        approvedArtsCount: approvedArts.length,
        pendingArtsCount: pendingArts.length,
        totalOrdersCount: allOrders.length,
        totalRevenue
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all pending art submissions waiting for approval
// @route   GET /api/admin/pending-arts
// @access  Private (Admin)
const getPendingArts = async (req, res) => {
  try {
    const pendingArts = await db.getArts({ status: 'pending' });

    // Attach submitter user details
    const artsWithUser = await Promise.all(
      pendingArts.map(async (art) => {
        const user = await db.getUserById(art.artist);
        let safeUser = null;
        if (user) {
          safeUser = { ...user };
          delete safeUser.password;
        }
        return {
          ...art,
          user: safeUser
        };
      })
    );

    res.json({ success: true, count: artsWithUser.length, pendingArts: artsWithUser });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Approve an art submission & promote user to Artist
// @route   PUT /api/admin/arts/:id/approve
// @access  Private (Admin)
const approveArtRequest = async (req, res) => {
  try {
    const art = await db.getArtById(req.params.id);
    if (!art) {
      return res.status(404).json({ success: false, message: 'Artwork not found.' });
    }

    // Update art status to approved
    const updatedArt = await db.updateArt(art._id, { status: 'approved' });

    // Promote user to artist
    const user = await db.getUserById(art.artist);
    if (user) {
      await db.updateUser(user._id, {
        role: user.role === 'admin' ? 'admin' : 'artist',
        isArtist: true,
        artistApplicationStatus: 'approved'
      });
    }

    res.json({
      success: true,
      message: `Artwork "${art.title}" approved! The creator has been promoted to a verified Artist.`,
      art: updatedArt
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Reject an art submission
// @route   PUT /api/admin/arts/:id/reject
// @access  Private (Admin)
const rejectArtRequest = async (req, res) => {
  try {
    const { reason } = req.body;
    const art = await db.getArtById(req.params.id);
    if (!art) {
      return res.status(404).json({ success: false, message: 'Artwork not found.' });
    }

    const updatedArt = await db.updateArt(art._id, {
      status: 'rejected',
      rejectionReason: reason || 'Does not meet our gallery quality or copyright guidelines.'
    });

    // Check if user has other approved arts
    const userArts = await db.getArts({ artist: art.artist, status: 'approved' });
    if (userArts.length === 0) {
      await db.updateUser(art.artist, { artistApplicationStatus: 'rejected' });
    }

    res.json({
      success: true,
      message: 'Artwork submission rejected.',
      art: updatedArt
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get customers separately
// @route   GET /api/admin/customers
// @access  Private (Admin)
const getCustomers = async (req, res) => {
  try {
    const allUsers = await db.getUsers({});
    const customers = allUsers
      .filter(u => u.role === 'customer' && !u.isArtist)
      .map(u => {
        const safe = { ...u };
        delete safe.password;
        return safe;
      });

    res.json({ success: true, count: customers.length, customers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get artists separately
// @route   GET /api/admin/artists
// @access  Private (Admin)
const getArtists = async (req, res) => {
  try {
    const allUsers = await db.getUsers({});
    const allArts = await db.getArts({});

    const artists = allUsers
      .filter(u => u.isArtist || u.role === 'artist')
      .map(u => {
        const safe = { ...u };
        delete safe.password;
        const artistArts = allArts.filter(a => String(a.artist) === String(u._id));
        const totalLikes = artistArts.reduce((acc, a) => acc + (a.likesCount || 0), 0);
        return {
          ...safe,
          totalArtworks: artistArts.length,
          totalLikes
        };
      });

    res.json({ success: true, count: artists.length, artists });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Edit user or artist details
// @route   PUT /api/admin/users/:id
// @access  Private (Admin)
const updateUserByAdmin = async (req, res) => {
  try {
    const user = await db.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    const { username, email, phone, dob, gender, role, isArtist, bio, upiId, upiQr, isActive } = req.body;
    const updates = {};
    if (username) updates.username = username.trim();
    if (email) updates.email = email.trim().toLowerCase();
    if (phone) updates.phone = phone.trim();
    if (dob) updates.dob = dob;
    if (gender) updates.gender = gender;
    if (role) updates.role = role;
    if (isArtist !== undefined) updates.isArtist = isArtist;
    if (bio !== undefined) updates.bio = bio;
    if (upiId !== undefined) updates.upiId = upiId;
    if (upiQr !== undefined) updates.upiQr = upiQr;
    if (isActive !== undefined) updates.isActive = isActive;

    const updated = await db.updateUser(user._id, updates);
    const safe = { ...updated };
    delete safe.password;

    res.json({ success: true, message: 'User updated successfully.', user: safe });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private (Admin)
const deleteUserByAdmin = async (req, res) => {
  try {
    const user = await db.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    if (user.role === 'admin' && String(user._id) === String(req.user._id)) {
      return res.status(400).json({ success: false, message: 'Admin cannot delete their own primary account.' });
    }

    await db.deleteUser(user._id);
    res.json({ success: true, message: `User "${user.username}" deleted successfully.` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all arts on platform
// @route   GET /api/admin/arts
// @access  Private (Admin)
const getAllArtsAdmin = async (req, res) => {
  try {
    const arts = await db.getArts({});
    res.json({ success: true, count: arts.length, arts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all orders on platform
// @route   GET /api/admin/orders
// @access  Private (Admin)
const getAllOrdersAdmin = async (req, res) => {
  try {
    const orders = await db.getOrders({});
    res.json({ success: true, count: orders.length, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
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
};
