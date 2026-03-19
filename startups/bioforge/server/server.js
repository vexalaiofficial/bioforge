require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const firestore = require('./services/firestore');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'https://bioforge.vercel.app'],
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));

// File upload config (for CDN integration)
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

// ===================
// PROFILE ROUTES
// ===================

// Create new profile
app.post('/api/profiles', async (req, res) => {
  try {
    const { username, email, displayName, bio, theme, links, socials, appearance, avatar } = req.body;
    
    const profile = await firestore.createProfile({
      username,
      email,
      displayName,
      bio,
      theme,
      links,
      socials,
      appearance,
      avatar
    });
    
    res.status(201).json({ profile });
  } catch (error) {
    console.error('Create profile error:', error.message);
    res.status(400).json({ error: error.message });
  }
});

// Get profile by username (public)
app.get('/api/profiles/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const profile = await firestore.getProfile(username);
    
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    
    res.json(profile);
  } catch (error) {
    console.error('Get profile error:', error.message);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

// Get profiles by email (user's own profile)
app.get('/api/profiles', async (req, res) => {
  try {
    const { email } = req.query;
    
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }
    
    const profile = await firestore.getProfileByEmail(email);
    
    if (!profile) {
      return res.json([]);
    }
    
    // Don't expose email to client
    const { email: _, ...publicProfile } = profile;
    res.json([publicProfile]);
  } catch (error) {
    console.error('Get profiles error:', error.message);
    res.status(500).json({ error: 'Failed to fetch profiles' });
  }
});

// Update profile
app.put('/api/profiles/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    // If updating username, check availability
    if (updates.username) {
      const available = await firestore.isUsernameAvailable(updates.username);
      if (!available) {
        const existing = await firestore.getProfile(updates.username);
        if (existing && existing.id !== id) {
          return res.status(409).json({ error: 'Username already taken' });
        }
      }
    }
    
    const profile = await firestore.updateProfile(id, updates);
    res.json({ profile });
  } catch (error) {
    console.error('Update profile error:', error.message);
    res.status(400).json({ error: error.message });
  }
});

// Delete profile
app.delete('/api/profiles/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await firestore.deleteProfile(id);
    res.json({ success: true });
  } catch (error) {
    console.error('Delete profile error:', error.message);
    res.status(500).json({ error: 'Failed to delete profile' });
  }
});

// Check username availability
app.get('/api/username/:username/available', async (req, res) => {
  try {
    const { username } = req.params;
    const available = await firestore.isUsernameAvailable(username);
    res.json({ available });
  } catch (error) {
    console.error('Check username error:', error.message);
    res.status(500).json({ error: 'Failed to check username' });
  }
});

// ===================
// ANALYTICS ROUTES
// ===================

// Get analytics for a profile
app.get('/api/analytics/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const analytics = await firestore.getAnalytics(id);
    res.json(analytics);
  } catch (error) {
    console.error('Get analytics error:', error.message);
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
});

// Track link click
app.post('/api/analytics/click', async (req, res) => {
  try {
    const { profileId, linkId } = req.body;
    
    if (!profileId || !linkId) {
      return res.status(400).json({ error: 'Profile ID and Link ID are required' });
    }
    
    await firestore.incrementClickCount(profileId, linkId);
    res.json({ success: true });
  } catch (error) {
    console.error('Track click error:', error.message);
    res.status(500).json({ error: 'Failed to track click' });
  }
});

// ===================
// UPLOAD ROUTES (CDN)
// ===================

// Upload file (mock - integrate with Cloudinary/UploadThing in production)
app.post('/api/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file provided' });
    }
    
    // In production, upload to Cloudinary:
    // const cloudinary = require('cloudinary').v2;
    // cloudinary.config({ cloud_name: process.env.CLOUDINARY_CLOUD_NAME, api_key:..., api_secret:... });
    // const result = await cloudinary.uploader.upload(`data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`);
    // res.json({ url: result.secure_url });
    
    // For now, return mock URL
    const fileId = uuidv4();
    const ext = path.extname(req.file.originalname);
    const mockUrl = `https://storage.bioforge.app/images/${fileId}${ext}`;
    
    res.json({ 
      url: mockUrl,
      filename: req.file.originalname,
      size: req.file.size,
      type: req.file.mimetype
    });
  } catch (error) {
    console.error('Upload error:', error.message);
    res.status(500).json({ error: 'Failed to upload file' });
  }
});

// ===================
// HEALTH CHECK
// ===================

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    firestore: firestore ? 'connected' : 'memory'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 BioForge server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
});

module.exports = app;