const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_art_gallery_jwt_key_2026_kamalesh_adithya';

const generateToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: '7d' });
};

// @desc    Register a new user
// @route   POST /api/auth/signup
// @access  Public
const signup = async (req, res) => {
  try {
    const { username, email, phone, dob, gender, password, confirmPassword } = req.body;

    // Validation
    if (!username || !email || !phone || !dob || !gender || !password) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields.' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ success: false, message: 'Passwords do not match.' });
    }

    if (password.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters.' });
    }

    // Check if user already exists
    const existingEmail = await db.findUser({ email });
    if (existingEmail) {
      return res.status(400).json({ success: false, message: 'Email is already registered.' });
    }

    const existingUsername = await db.findUser({ username });
    if (existingUsername) {
      return res.status(400).json({ success: false, message: 'Username is already taken.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await db.createUser({
      username: username.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      dob,
      gender,
      password: hashedPassword,
      role: 'customer',
      isArtist: false,
      artistApplicationStatus: 'none',
      bio: '',
      avatar: '/images/Profile image/profile-placeholder.svg',
      upiId: '',
      upiQr: ''
    });

    const token = generateToken(newUser._id);
    const safeUser = { ...newUser };
    delete safeUser.password;

    res.status(201).json({
      success: true,
      message: 'Account created successfully! Welcome to CanvasCraft Gallery.',
      token,
      user: safeUser
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ success: false, message: error.message || 'Server error during signup.' });
  }
};

// @desc    Login user with username/email and password
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  try {
    const { loginIdentifier, password } = req.body;

    if (!loginIdentifier || !password) {
      return res.status(400).json({ success: false, message: 'Please provide username/email and password.' });
    }

    const user = await db.findUser({
      $or: [
        { email: loginIdentifier.trim().toLowerCase() },
        { username: loginIdentifier.trim() }
      ]
    });

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials. User not found.' });
    }

    if (user.isActive === false) {
      return res.status(403).json({ success: false, message: 'Your account has been deactivated. Please contact admin.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials. Incorrect password.' });
    }

    const token = generateToken(user._id);
    const safeUser = { ...user };
    delete safeUser.password;

    res.json({
      success: true,
      message: 'Login successful! Welcome back.',
      token,
      user: safeUser
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: error.message || 'Server error during login.' });
  }
};

// @desc    Get currently logged in user profile
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  try {
    const user = await db.getUserById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    const safeUser = { ...user };
    delete safeUser.password;
    res.json({ success: true, user: safeUser });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update current user profile
// @route   PUT /api/auth/profile
// @access  Private
const updateProfile = async (req, res) => {
  try {
    const allowed = ['phone', 'bio', 'avatar', 'upiId', 'upiQr', 'dob', 'gender', 'bankDetails'];
    const updates = {};
    for (const key of allowed) {
      if (req.body[key] !== undefined) {
        updates[key] = req.body[key];
      }
    }

    if (req.files && req.files['avatar'] && req.files['avatar'][0]) {
      updates.avatar = `/uploads/${req.files['avatar'][0].filename}`;
    } else if (req.file) {
      updates.avatar = `/uploads/${req.file.filename}`;
    }

    if (req.files && req.files['upiQrImage'] && req.files['upiQrImage'][0]) {
      updates.upiQr = `/uploads/${req.files['upiQrImage'][0].filename}`;
    }

    const updatedUser = await db.updateUser(req.user._id, updates);
    const safeUser = { ...updatedUser };
    delete safeUser.password;

    res.json({
      success: true,
      message: 'Profile updated successfully!',
      user: safeUser
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  signup,
  login,
  getMe,
  updateProfile
};

