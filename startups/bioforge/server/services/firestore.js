/**
 * Firestore Service
 * 
 * This module handles all Firestore database operations.
 * For local development, it uses in-memory storage.
 * When deployed with Firebase Admin SDK, it uses real Firestore.
 * 
 * Setup instructions:
 * 1. Go to https://console.firebase.google.com/
 * 2. Create a new project
 * 3. Enable Firestore Database (start in test mode)
 * 4. Download service account key (Settings > Service Accounts)
 * 5. Set FIREBASE_SERVICE_ACCOUNT env var with the JSON content
 * 6. Set FIRESTORE_PROJECT_ID env var
 */

const { v4: uuidv4 } = require('uuid');

// In-memory fallback for development
let db = {
  profiles: new Map(),
  users: new Map(),
  counter: { profileId: 1000 }
};

// Try to initialize Firebase Admin
let firestore = null;
let useFirestore = false;

try {
  // Check if running in production with Firebase config
  if (process.env.FIREBASE_SERVICE_ACCOUNT && process.env.FIRESTORE_PROJECT_ID) {
    const admin = require('firebase-admin');
    
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        projectId: process.env.FIRESTORE_PROJECT_ID
      });
    }
    
    firestore = admin.firestore();
    useFirestore = true;
    console.log('🔥 Connected to Firestore');
  }
} catch (error) {
  console.log('⚠️ Firebase not configured, using in-memory storage');
  console.log('To use Firestore, set FIREBASE_SERVICE_ACCOUNT and FIRESTORE_PROJECT_ID');
}

/**
 * Create a new profile
 * @param {Object} profileData - Profile data
 * @returns {Promise<Object>} Created profile
 */
async function createProfile(profileData) {
  const { username, email, displayName, bio, theme, links, socials, appearance, avatar } = profileData;
  
  if (!username || !email) {
    throw new Error('Username and email are required');
  }
  
  const profileId = `profile_${uuidv4()}`;
  const now = new Date().toISOString();
  
  const profile = {
    id: profileId,
    username: username.toLowerCase(),
    email,
    displayName: displayName || username,
    bio: bio || '',
    theme: theme || 'midnight',
    links: links || [],
    socials: socials || {},
    appearance: appearance || {
      buttonStyle: 'rounded',
      buttonAnimation: true,
      backgroundEffect: 'gradient',
      showBranding: true
    },
    avatar: avatar || null,
    customDomain: null,
    createdAt: now,
    updatedAt: now,
    views: 0,
    clicks: 0
  };
  
  if (useFirestore && firestore) {
    // Check username exists
    const existing = await firestore.collection('profiles')
      .where('username', '==', username.toLowerCase())
      .limit(1)
      .get();
    
    if (!existing.empty) {
      throw new Error('Username already taken');
    }
    
    await firestore.collection('profiles').doc(profileId).set(profile);
  } else {
    // In-memory fallback
    const existingMem = Array.from(db.profiles.values())
      .find(p => p.username.toLowerCase() === username.toLowerCase());
    
    if (existingMem) {
      throw new Error('Username already taken');
    }
    
    db.profiles.set(profileId, profile);
    db.users.set(email, profileId);
  }
  
  const { email: _, ...publicProfile } = profile;
  return publicProfile;
}

/**
 * Get profile by username
 * @param {string} username - Username to lookup
 * @returns {Promise<Object|null>} Profile or null
 */
async function getProfile(username) {
  let profile;
  
  if (useFirestore && firestore) {
    const snapshot = await firestore.collection('profiles')
      .where('username', '==', username.toLowerCase())
      .limit(1)
      .get();
    
    if (snapshot.empty) {
      return null;
    }
    
    profile = snapshot.docs[0].data();
  } else {
    profile = Array.from(db.profiles.values())
      .find(p => p.username.toLowerCase() === username.toLowerCase());
  }
  
  if (!profile) {
    return null;
  }
  
  // Increment view count
  await incrementViewCount(profile.id);
  
  const { email, ...publicProfile } = profile;
  return publicProfile;
}

/**
 * Get profile by ID
 * @param {string} id - Profile ID
 * @returns {Promise<Object|null>} Profile or null
 */
async function getProfileById(id) {
  let profile;
  
  if (useFirestore && firestore) {
    const doc = await firestore.collection('profiles').doc(id).get();
    profile = doc.exists ? doc.data() : null;
  } else {
    profile = db.profiles.get(id);
  }
  
  return profile;
}

/**
 * Get profile by email (for user management)
 * @param {string} email - User email
 * @returns {Promise<Object|null>} Profile or null
 */
async function getProfileByEmail(email) {
  let profile;
  
  if (useFirestore && firestore) {
    const snapshot = await firestore.collection('profiles')
      .where('email', '==', email)
      .limit(1)
      .get();
    
    if (snapshot.empty) {
      return null;
    }
    
    profile = snapshot.docs[0].data();
  } else {
    const profileId = db.users.get(email);
    profile = profileId ? db.profiles.get(profileId) : null;
  }
  
  return profile;
}

/**
 * Update profile
 * @param {string} id - Profile ID
 * @param {Object} updates - Fields to update
 * @returns {Promise<Object>} Updated profile
 */
async function updateProfile(id, updates) {
  const now = new Date().toISOString();
  const updateData = {
    ...updates,
    updatedAt: now
  };
  
  if (useFirestore && firestore) {
    await firestore.collection('profiles').doc(id).update(updateData);
    const updated = await getProfileById(id);
    const { email, ...publicProfile } = updated;
    return publicProfile;
  } else {
    const profile = db.profiles.get(id);
    if (!profile) {
      throw new Error('Profile not found');
    }
    
    const updated = { ...profile, ...updateData };
    db.profiles.set(id, updated);
    const { email, ...publicProfile } = updated;
    return publicProfile;
  }
}

/**
 * Delete profile
 * @param {string} id - Profile ID
 * @returns {Promise<boolean>} Success
 */
async function deleteProfile(id) {
  if (useFirestore && firestore) {
    await firestore.collection('profiles').doc(id).delete();
  } else {
    const profile = db.profiles.get(id);
    if (profile) {
      db.users.delete(profile.email);
      db.profiles.delete(id);
    }
  }
  
  return true;
}

/**
 * Increment view count
 * @param {string} id - Profile ID
 */
async function incrementViewCount(id) {
  if (useFirestore && firestore) {
    await firestore.collection('profiles').doc(id).update({
      views: admin.firestore.FieldValue.increment(1)
    });
  } else {
    const profile = db.profiles.get(id);
    if (profile) {
      profile.views += 1;
      db.profiles.set(id, profile);
    }
  }
}

/**
 * Increment link click count
 * @param {string} profileId - Profile ID
 * @param {string} linkId - Link ID
 */
async function incrementClickCount(profileId, linkId) {
  const profile = await getProfileById(profileId);
  if (!profile) return;
  
  const link = profile.links.find(l => l.id === linkId);
  const clickData = {
    profileId,
    linkId,
    timestamp: new Date().toISOString(),
    userAgent: 'unknown',
    referrer: 'unknown'
  };
  
  if (useFirestore && firestore) {
    await firestore.collection('profiles').doc(profileId).update({
      clicks: admin.firestore.FieldValue.increment(1)
    });
    
    if (link) {
      const linkRef = firestore.collection('profiles').doc(profileId)
        .collection('linkClicks').doc(linkId);
      
      await linkRef.set({
        count: admin.firestore.FieldValue.increment(1),
        lastClick: new Date()
      }, { merge: true });
    }
  } else {
    profile.clicks += 1;
    if (link) {
      link.clicks = (link.clicks || 0) + 1;
    }
    db.profiles.set(profileId, profile);
  }
  
  return clickData;
}

/**
 * Get analytics for a profile
 * @param {string} id - Profile ID
 * @returns {Promise<Object>} Analytics data
 */
async function getAnalytics(id) {
  const profile = await getProfileById(id);
  
  if (!profile) {
    throw new Error('Profile not found');
  }
  
  const linkClicks = {};
  profile.links.forEach(link => {
    linkClicks[link.id] = {
      title: link.title,
      clicks: link.clicks || 0
    };
  });
  
  return {
    totalViews: profile.views || 0,
    totalClicks: profile.clicks || 0,
    linkClicks,
    clickRate: profile.views > 0 ? Math.round((profile.clicks / profile.views) * 100) : 0
  };
}

/**
 * Check if username is available
 * @param {string} username - Username to check
 * @returns {Promise<boolean>} Available or not
 */
async function isUsernameAvailable(username) {
  const profile = await getProfile(username);
  return profile === null;
}

/**
 * Get all profiles (admin only)
 * @returns {Promise<Array>} All profiles
 */
async function getAllProfiles() {
  let profiles;
  
  if (useFirestore && firestore) {
    const snapshot = await firestore.collection('profiles').get();
    profiles = snapshot.docs.map(doc => {
      const { email, ...data } = doc.data();
      return data;
    });
  } else {
    profiles = Array.from(db.profiles.values()).map(p => {
      const { email, ...rest } = p;
      return rest;
    });
  }
  
  return profiles;
}

module.exports = {
  createProfile,
  getProfile,
  getProfileById,
  getProfileByEmail,
  updateProfile,
  deleteProfile,
  incrementViewCount,
  incrementClickCount,
  getAnalytics,
  isUsernameAvailable,
  getAllProfiles
};