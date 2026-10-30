const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const { seedUsers, seedArts, seedOrders } = require('../seed/seedData');

const User = require('../models/User');
const Art = require('../models/Art');
const Order = require('../models/Order');

const dataDir = path.join(__dirname, '..', 'data');

// Helper to build case-insensitive regex query for username/email
const buildCaseInsensitiveFilter = (filter) => {
  if (!filter || typeof filter !== 'object') return filter;
  const processed = {};
  for (const [key, value] of Object.entries(filter)) {
    if (key === '$or' && Array.isArray(value)) {
      processed.$or = value.map(sub => buildCaseInsensitiveFilter(sub));
    } else if (typeof value === 'string' && (key === 'username' || key === 'email')) {
      const escaped = value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      processed[key] = new RegExp(`^${escaped}$`, 'i');
    } else {
      processed[key] = value;
    }
  }
  return processed;
};

// Sync existing db.json or seed data into MongoDB
const syncDataToMongoDB = async () => {
  try {
    let sourceUsers = [];
    let sourceArts = [];
    let sourceOrders = [];

    const dbFilePath = path.join(dataDir, 'db.json');
    const dbBackupPath = path.join(dataDir, 'db.json.migrated_backup');
    const fileToRead = fs.existsSync(dbFilePath)
      ? dbFilePath
      : (fs.existsSync(dbBackupPath) ? dbBackupPath : null);

    if (fileToRead) {
      try {
        const raw = fs.readFileSync(fileToRead, 'utf8');
        const parsed = JSON.parse(raw);
        sourceUsers = parsed.users || [];
        sourceArts = parsed.arts || [];
        sourceOrders = parsed.orders || [];
        console.log(`>>> [MIGRATION] Found ${sourceUsers.length} users, ${sourceArts.length} arts, ${sourceOrders.length} orders in ${path.basename(fileToRead)}.`);
      } catch (e) {
        console.warn('>>> [MIGRATION] Could not read JSON file, falling back to seedData.');
      }
    }

    if (sourceUsers.length === 0) {
      sourceUsers = seedUsers;
      sourceArts = seedArts;
      sourceOrders = seedOrders;
    }

    // Upsert all users into MongoDB
    for (const u of sourceUsers) {
      await User.updateOne({ _id: String(u._id) }, { $set: u }, { upsert: true });
    }

    // Upsert all arts into MongoDB
    for (const a of sourceArts) {
      await Art.updateOne({ _id: String(a._id) }, { $set: a }, { upsert: true });
    }

    // Upsert all orders into MongoDB
    for (const o of sourceOrders) {
      await Order.updateOne({ _id: String(o._id) }, { $set: o }, { upsert: true });
    }

    const userCount = await User.countDocuments();
    const artCount = await Art.countDocuments();
    const orderCount = await Order.countDocuments();

    console.log(`>>> [DATABASE SYNC COMPLETE] MongoDB Compass currently contains:`);
    console.log(`    - Collection 'users':  ${userCount} documents`);
    console.log(`    - Collection 'arts':   ${artCount} documents`);
    console.log(`    - Collection 'orders': ${orderCount} documents`);

    // Rename db.json to db.json.migrated_backup to deactivate file storage
    if (fs.existsSync(dbFilePath)) {
      try {
        if (fs.existsSync(dbBackupPath)) {
          fs.unlinkSync(dbBackupPath);
        }
        fs.renameSync(dbFilePath, dbBackupPath);
        console.log(`>>> [DATABASE NOTICE] Renamed db.json to db.json.migrated_backup.`);
        console.log(`>>> [DATABASE NOTICE] File-based storage is disabled; all operations now write directly to MongoDB Compass.`);
      } catch (renameErr) {
        // Safe to ignore
      }
    }
  } catch (err) {
    console.error('>>> [DATABASE SYNC ERROR]:', err.message);
  }
};

const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/artgallery';

  try {
    console.log(`Connecting to MongoDB Compass URL: ${mongoUri} ...`);
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000
    });
    console.log('>>> [DATABASE] MongoDB connected successfully via Mongoose.');

    // Populate or sync data into MongoDB
    await syncDataToMongoDB();
  } catch (err) {
    console.error('>>> [DATABASE ERROR] Failed to connect to MongoDB at:', mongoUri);
    console.error('>>> Error details:', err.message);
    console.error('>>> Please ensure that MongoDB service is running and MongoDB Compass URL is reachable.');
    throw err;
  }
};

// Direct MongoDB Operations
const getUserById = async (id) => {
  if (!id) return null;
  return await User.findOne({ _id: String(id) }).lean();
};

const findUser = async (filter) => {
  if (!filter) return null;
  const processedFilter = buildCaseInsensitiveFilter(filter);
  return await User.findOne(processedFilter).lean();
};

const getUsers = async (filter = {}) => {
  return await User.find(filter).lean();
};

const createUser = async (userData) => {
  const user = new User(userData);
  const saved = await user.save();
  return saved.toObject();
};

const updateUser = async (id, updates) => {
  return await User.findOneAndUpdate(
    { _id: String(id) },
    { $set: updates },
    { new: true }
  ).lean();
};

const deleteUser = async (id) => {
  await User.deleteOne({ _id: String(id) });
  await Art.deleteMany({ artist: String(id) });
  return true;
};

// Art operations
const getArtById = async (id) => {
  if (!id) return null;
  return await Art.findOne({ _id: String(id) }).lean();
};

const getArts = async (filter = {}) => {
  const query = { ...filter };
  if (query.artist) {
    query.artist = String(query.artist);
  }
  return await Art.find(query).sort({ createdAt: -1 }).lean();
};

const createArt = async (artData) => {
  const art = new Art(artData);
  const saved = await art.save();
  return saved.toObject();
};

const updateArt = async (id, updates) => {
  return await Art.findOneAndUpdate(
    { _id: String(id) },
    { $set: updates },
    { new: true }
  ).lean();
};

const deleteArt = async (id) => {
  await Art.deleteOne({ _id: String(id) });
  return true;
};

// Order operations
const getOrderById = async (id) => {
  if (!id) return null;
  return await Order.findOne({
    $or: [{ _id: String(id) }, { orderNumber: String(id) }]
  }).lean();
};

const getOrders = async (filter = {}) => {
  const query = { ...filter };
  if (query.buyer) {
    query.buyer = String(query.buyer);
  }
  if (query.artist) {
    query.artist = String(query.artist);
  }
  return await Order.find(query).sort({ createdAt: -1 }).lean();
};

const createOrder = async (orderData) => {
  const order = new Order(orderData);
  const saved = await order.save();
  return saved.toObject();
};

const updateOrder = async (id, updates) => {
  return await Order.findOneAndUpdate(
    { $or: [{ _id: String(id) }, { orderNumber: String(id) }] },
    { $set: updates },
    { new: true }
  ).lean();
};

const isMongo = () => true;

module.exports = {
  connectDB,
  isMongo,
  getUserById,
  findUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getArtById,
  getArts,
  createArt,
  updateArt,
  deleteArt,
  getOrderById,
  getOrders,
  createOrder,
  updateOrder
};
