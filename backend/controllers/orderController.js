const db = require('../config/db');

const getArtistIds = async (artist) => {
  const arts = await db.getArts();
  return arts
    .filter((art) =>
      String(art.artist) === String(artist._id) ||
      (art.artistUsername && artist.username &&
        art.artistUsername.toLowerCase() === artist.username.toLowerCase())
    )
    .map((art) => String(art._id));
};

const createOrder = async (req, res) => {
  try {
    const { artId, paymentMode, upiRef } = req.body;
    const customerDetails = {
      fullName: req.body.fullName,
      mobile: req.body.mobile,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      pincode: req.body.pincode,
      notes: req.body.notes || ''
    };
    if (!artId || !customerDetails?.fullName || !customerDetails?.mobile || !customerDetails?.address) {
      return res.status(400).json({ success: false, message: 'Artwork and complete customer details are required.' });
    }

    const art = await db.getArtById(artId);
    if (!art || art.status !== 'approved') {
      return res.status(404).json({ success: false, message: 'This artwork is not available to order.' });
    }
    if (String(art.artist) === String(req.user._id)) {
      return res.status(400).json({ success: false, message: 'You cannot order your own artwork.' });
    }

    const artist = await db.getUserById(art.artist);
    const order = await db.createOrder({
      orderNumber: `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      art: String(art._id),
      artTitle: art.title,
      artImage: art.imageUrl,
      artist: String(art.artist),
      artistName: art.artistName || artist?.username || 'Artist',
      buyer: String(req.user._id),
      buyerUsername: req.user.username,
      buyerEmail: req.user.email,
      customerDetails,
      amount: Number(art.price),
      paymentMode: paymentMode || 'UPI',
      paymentDetails: {
        upiRef: upiRef || '',
        paymentProof: req.file ? `/uploads/${req.file.filename}` : '',
        paymentStatus: paymentMode === 'COD' ? 'Pending' : 'Pending Verification'
      },
      orderStatus: 'Confirmed'
    });
    return res.status(201).json({ success: true, message: 'Order placed successfully.', order });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const orders = await db.getOrders({ buyer: String(req.user._id) });
    return res.json({ success: true, orders });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getArtistOrders = async (req, res) => {
  try {
    const artistArtIds = await getArtistIds(req.user);
    const allOrders = await db.getOrders();
    const orders = allOrders.filter((order) =>
      String(order.artist) === String(req.user._id) || artistArtIds.includes(String(order.art))
    );
    return res.json({ success: true, orders });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const order = await db.getOrderById(req.params.id);
    if (!order) return res.status(404).json({ success: false, message: 'Order not found.' });
    const artistArtIds = await getArtistIds(req.user);
    const isAdmin = req.user.role === 'admin';
    const ownsOrder = String(order.artist) === String(req.user._id) || artistArtIds.includes(String(order.art));
    if (!isAdmin && !ownsOrder) {
      return res.status(403).json({ success: false, message: 'You are not authorized to update this order.' });
    }

    const { orderStatus, paymentStatus } = req.body;
    const allowedStatuses = ['Pending', 'Confirmed', 'In Progress', 'Dispatched', 'Shipped', 'Delivered', 'Cancelled'];
    if (orderStatus && !allowedStatuses.includes(orderStatus)) {
      return res.status(400).json({ success: false, message: 'Invalid order status.' });
    }
    const updates = {};
    if (orderStatus) updates.orderStatus = orderStatus;
    if (paymentStatus) {
      if (!['Paid', 'Pending', 'Pending Verification', 'Rejected'].includes(paymentStatus)) {
        return res.status(400).json({ success: false, message: 'Invalid payment status.' });
      }
      updates.paymentDetails = { ...(order.paymentDetails || {}), paymentStatus };
    }
    const updatedOrder = await db.updateOrder(order._id, updates);
    return res.json({ success: true, message: 'Order updated successfully.', order: updatedOrder });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createOrder, getMyOrders, getArtistOrders, updateOrderStatus };
