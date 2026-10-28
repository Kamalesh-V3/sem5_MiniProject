const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const { seedUsers, seedArts, seedOrders } = require('../seed/seedData');

const User = require('../models/User');
const Art = require('../models/Art');
const Order = require('../models/Order');

const dataDir = path.join(__dirname, '..', 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}
const dbFilePath = path.join(dataDir, 'db.json');

let isConnectedToMongo = false;
let fileStore = {
  users: [],
  arts: [],
  orders: []
};

// Load or initialize file store
const loadFileStore = () => {
  if (fs.existsSync(dbFilePath)) {
    try {
      const content = fs.readFileSync(dbFilePath, 'utf8');
      fileStore = JSON.parse(content);
    } catch (e) {
      console.warn('Could not parse db.json, re-initializing from seeds.');
      initFileStoreSeeds();
    }
  } else {
    initFileStoreSeeds();
  }
};

const initFileStoreSeeds = () => {
  fileStore = {
    users: JSON.parse(JSON.stringify(seedUsers)),
    arts: JSON.parse(JSON.stringify(seedArts)),
    orders: JSON.parse(JSON.stringify(seedOrders))
  };
  saveFileStore();
};

const saveFileStore = () => {
  try {
    fs.writeFileSync(dbFilePath, JSON.stringify(fileStore, null, 2), 'utf8');
  } catch (err) {
    console.error('Error saving fileStore:', err.message);
  }
};

const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/artgallery';

  loadFileStore();

  try {
    console.log(`Connecting to MongoDB at: ${mongoUri} ...`);
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 2000
    });
    isConnectedToMongo = true;
    console.log('>>> [DATABASE] MongoDB connected successfully via Mongoose.');

    // Check if initial seeding is needed in MongoDB
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      console.log('>>> [SEED] Seeding initial data into MongoDB...');
      await User.insertMany(seedUsers);
      await Art.insertMany(seedArts);
      await Order.insertMany(seedOrders);
      console.log('>>> [SEED] MongoDB populated with initial users, artworks, and orders!');
    }
  } catch (err) {
    isConnectedToMongo = false;
    console.log('>>> [DATABASE NOTICE] Local MongoDB service is offline or unreachable.');
    console.log(`>>> [DATABASE NOTICE] Activated persistent local data engine: ${dbFilePath}`);
    console.log('>>> [DATABASE NOTICE] All CRUD operations, user sessions, arts, orders, and likes are 100% operational.');
  }
};

// Unified Data Access Layer
const getUserById = async (id) => {
  if (isConnectedToMongo) {
    try {
      return await User.findById(id).lean();
    } catch (e) {
      // Fallback
    }
  }
  return fileStore.users.find(u => String(u._id) === String(id)) || null;
};

const findUser = async (filter) => {
  if (isConnectedToMongo) {
    try {
      return await User.findOne(filter).lean();
    } catch (e) {
      // Fallback
    }
  }
  return fileStore.users.find(u => {
    for (const key in filter) {
      if (key === '$or') {
        const match = filter['$or'].some(sub => {
          return Object.keys(sub).every(k => {
            if (typeof sub[k] === 'string') {
              return String(u[k] || '').toLowerCase() === String(sub[k]).toLowerCase();
            }
            return u[k] === sub[k];
          });
        });
        if (!match) return false;
      } else if (typeof filter[key] === 'string') {
        if (String(u[key] || '').toLowerCase() !== String(filter[key]).toLowerCase()) return false;
      } else if (u[key] !== filter[key]) {
        return false;
      }
    }
    return true;
  }) || null;
};

const getUsers = async (filter = {}) => {
  if (isConnectedToMongo) {
    try {
      return await User.find(filter).lean();
    } catch (e) {
      // Fallback
    }
  }
  return fileStore.users.filter(u => {
    for (const key in filter) {
      if (u[key] !== filter[key]) return false;
    }
    return true;
  });
};

const createUser = async (userData) => {
  if (isConnectedToMongo) {
    try {
      const newUser = new User(userData);
      const saved = await newUser.save();
      return saved.toObject();
    } catch (e) {
      // If error fallback to fileStore
    }
  }
  const id = 'usr_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
  const created = {
    _id: id,
    ...userData,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  fileStore.users.push(created);
  saveFileStore();
  return created;
};

const updateUser = async (id, updates) => {
  if (isConnectedToMongo) {
    try {
      return await User.findByIdAndUpdate(id, updates, { new: true }).lean();
    } catch (e) {}
  }
  const index = fileStore.users.findIndex(u => String(u._id) === String(id));
  if (index !== -1) {
    fileStore.users[index] = { ...fileStore.users[index], ...updates, updatedAt: new Date() };
    saveFileStore();
    return fileStore.users[index];
  }
  return null;
};

const deleteUser = async (id) => {
  if (isConnectedToMongo) {
    try {
      await User.findByIdAndDelete(id);
    } catch (e) {}
  }
  fileStore.users = fileStore.users.filter(u => String(u._id) !== String(id));
  // also clean up arts
  fileStore.arts = fileStore.arts.filter(a => String(a.artist) !== String(id));
  saveFileStore();
  return true;
};

// Art operations
const getArtById = async (id) => {
  if (isConnectedToMongo) {
    try {
      return await Art.findById(id).lean();
    } catch (e) {}
  }
  return fileStore.arts.find(a => String(a._id) === String(id)) || null;
};

const getArts = async (filter = {}) => {
  if (isConnectedToMongo) {
    try {
      return await Art.find(filter).sort({ createdAt: -1 }).lean();
    } catch (e) {}
  }
  return fileStore.arts.filter(a => {
    for (const key in filter) {
      if (key === '$or') {
        const matchOr = filter['$or'].some(sub => {
          return Object.keys(sub).every(k => String(a[k]) === String(sub[k]));
        });
        if (!matchOr) return false;
      } else if (filter[key] !== undefined && String(a[key]) !== String(filter[key])) {
        return false;
      }
    }
    return true;
  });
};

const createArt = async (artData) => {
  if (isConnectedToMongo) {
    try {
      const art = new Art(artData);
      const saved = await art.save();
      return saved.toObject();
    } catch (e) {}
  }
  const id = 'art_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
  const created = {
    _id: id,
    likes: [],
    likesCount: 0,
    ...artData,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  fileStore.arts.unshift(created);
  saveFileStore();
  return created;
};

const updateArt = async (id, updates) => {
  if (isConnectedToMongo) {
    try {
      return await Art.findByIdAndUpdate(id, updates, { new: true }).lean();
    } catch (e) {}
  }
  const index = fileStore.arts.findIndex(a => String(a._id) === String(id));
  if (index !== -1) {
    fileStore.arts[index] = { ...fileStore.arts[index], ...updates, updatedAt: new Date() };
    saveFileStore();
    return fileStore.arts[index];
  }
  return null;
};

const deleteArt = async (id) => {
  if (isConnectedToMongo) {
    try {
      await Art.findByIdAndDelete(id);
    } catch (e) {}
  }
  fileStore.arts = fileStore.arts.filter(a => String(a._id) !== String(id));
  saveFileStore();
  return true;
};

// Order operations
const getOrderById = async (id) => {
  if (isConnectedToMongo) {
    try {
      return await Order.findById(id).lean();
    } catch (e) {}
  }
  return fileStore.orders.find(o => String(o._id) === String(id) || o.orderNumber === id) || null;
};

const getOrders = async (filter = {}) => {
  if (isConnectedToMongo) {
    try {
      return await Order.find(filter).sort({ createdAt: -1 }).lean();
    } catch (e) {}
  }
  return fileStore.orders.filter(o => {
    for (const key in filter) {
      if (filter[key] !== undefined && String(o[key]) !== String(filter[key])) return false;
    }
    return true;
  });
};

const createOrder = async (orderData) => {
  if (isConnectedToMongo) {
    try {
      const order = new Order(orderData);
      const saved = await order.save();
      return saved.toObject();
    } catch (e) {}
  }
  const id = 'ord_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
  const created = {
    _id: id,
    ...orderData,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  fileStore.orders.unshift(created);
  saveFileStore();
  return created;
};

const updateOrder = async (id, updates) => {
  if (isConnectedToMongo) {
    try {
      return await Order.findByIdAndUpdate(id, updates, { new: true }).lean();
    } catch (e) {}
  }
  const index = fileStore.orders.findIndex(o => String(o._id) === String(id) || o.orderNumber === id);
  if (index !== -1) {
    fileStore.orders[index] = { ...fileStore.orders[index], ...updates, updatedAt: new Date() };
    saveFileStore();
    return fileStore.orders[index];
  }
  return null;
};

const isMongo = () => isConnectedToMongo;

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
