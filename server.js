require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const cors = require("cors");
const { google } = require("googleapis");
require("dotenv").config();

const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET || "securesecret",
    resave: false,
    saveUninitialized: true,
  })
);

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

// ✅ Influencer Model
const Influencer = mongoose.model("Influencer", new mongoose.Schema({
  channelName: String,
  email: { type: String, required: true, unique: true },
  subscribers: Number,
  totalViews: Number,
  videoCount: Number,
  profileImage: String,
  category: { type: String, required: true },
  location: String,
}));

// ✅ Brand Model
const Brand = mongoose.model("Brand", new mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
  brandName: String,
}));

// ✅ Collaboration Request Model
const CollaborationRequest = mongoose.model("CollaborationRequest", new mongoose.Schema({
  brandId: { type: mongoose.Schema.Types.ObjectId, ref: "Brand" },
  influencerId: { type: mongoose.Schema.Types.ObjectId, ref: "Influencer" },
  message: String,
  status: { type: String, enum: ["pending", "accepted", "rejected"], default: "pending" }
}));


// ✅ Store User Session
app.use(
  session({
    secret: process.env.SESSION_SECRET || "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", // change for security in production
    resave: false,
    saveUninitialized: true,
  })
);

// ✅ Google OAuth Configuration
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.NODE_ENV === 'production'
  ? `${process.env.APP_URL}/oauth-callback` || `${process.env.RENDER_EXTERNAL_URL}/oauth-callback`
  : "http://localhost:8080/oauth-callback";
const SCOPES = ["https://www.googleapis.com/auth/youtube.readonly"];

const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

// ✅ Step 1: Redirect User to Google OAuth Login
app.get("/login", (req, res) => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });
  res.redirect(authUrl);
});



app.get("/oauth-callback", async (req, res) => {
  const { code } = req.query;
  if (!code) return res.status(400).json({ error: "No authorization code provided" });

  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    req.session.tokens = tokens;

    // Fetch YouTube Data
const response = await axios.get(
    "https://www.googleapis.com/youtube/v3/channels?part=statistics,snippet&mine=true",
    {
      headers: { Authorization: `Bearer ${tokens.access_token}` },
    }
  );
  
  const items = response.data.items;
  
  if (!items || items.length === 0) {
    console.error("No YouTube channel data found for the authenticated user.");
    return res.status(404).json({ error: "No channel data found" });
  }
  
  const data = items[0];
  console.log("Fetched YouTube data:", data);
  
  // Determine frontend URL based on environment
  const frontendUrl = process.env.NODE_ENV === 'production'
    ? process.env.APP_URL || `${req.protocol}://${req.get('host')}`
    : 'http://localhost:4200';
  
  // Check if influencer already exists in the database
  const existingInfluencer = await Influencer.findOne({
    channelName: data.snippet.title,
  });
  
  if (existingInfluencer) {
    console.log("Influencer exists, redirecting to dashboard...");
    res.redirect(
      `${frontendUrl}/influencer-dashboard?id=${existingInfluencer._id}`
    );
  } else {
    console.log("Influencer does not exist, redirecting to details page...");
  
    const queryParams = new URLSearchParams({
      channelName: data.snippet.title,
      profileImage: data.snippet.thumbnails.default.url,
      subscribers: data.statistics.subscriberCount,
      totalViews: data.statistics.viewCount,
      videoCount: data.statistics.videoCount,
    }).toString();
  
    res.redirect(`${frontendUrl}/influencer-details?${queryParams}`);
  }
  
  } catch (error) {
    console.error("OAuth Error:", error);
    res.status(500).json({ error: "Authentication failed" });
  }
});


// ✅ Step 3: Store Influencer Details
app.post("/register-influencer", async (req, res) => {
  const { channelName, email,profileImage, subscribers, totalViews, videoCount, category, location } = req.body;
  
  // Check for required fields
  if (!channelName || !category || !location) {
    return res.status(400).json({ error: "Missing required influencer details" });
  }

  try {
    const influencer = new Influencer({
      channelName,email,
      profileImage,
      subscribers,
      totalViews,
      videoCount,
      category,
      location
    });
    await influencer.save();
    res.json({ message: "Influencer registered successfully", influencer });
  } catch (error) {
    console.error("Database Error:", error);
    // Send more detailed error message for debugging purposes (remove in production)
    res.status(500).json({ error: error.message || "Failed to save influencer details" });
  }
});

// Fetch influencer details by ID
app.get("/influencers/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const influencer = await Influencer.findById(id);
    if (influencer) {
      res.json(influencer);
    } else {
      res.status(404).json({ error: "Influencer not found" });
    }
  } catch (error) {
    console.error("Error fetching influencer:", error);
    res.status(500).json({ error: "Failed to fetch influencer details" });
  }
});
// Update influencer details by ID
app.put("/influencers/:id", async (req, res) => {
  const { id } = req.params;
  const { channelName,email, profileImage, subscribers, totalViews, videoCount, category, location } = req.body;

  try {
    const influencer = await Influencer.findByIdAndUpdate(id, {
      channelName, profileImage, subscribers, totalViews, videoCount, category, location
    }, { new: true });

    if (influencer) {
      res.json(influencer);
    } else {
      res.status(404).json({ error: "Influencer not found" });
    }
  } catch (error) {
    console.error("Error updating influencer:", error);
    res.status(500).json({ error: "Failed to update influencer details" });
  }
});






// ✅ Accept a Collaboration Request
app.put("/influencer/requests/:influencerId/:requestId/accept", async (req, res) => {
  const { influencerId, requestId } = req.params;
  try {
    // Find the request by ID and ensure the influencer matches
    const request = await CollaborationRequest.findOneAndUpdate(
      { _id: requestId, influencerId },
      { status: "accepted" },  // Set the status to 'accepted'
      { new: true } // Return the updated document
    ).populate("brandId", "brandName");

    if (!request) {
      return res.status(404).json({ error: "Request not found or not authorized" });
    }

    res.json(request); // Send the updated request
  } catch (error) {
    console.error("Accept Request Error:", error);
    res.status(500).json({ error: "Failed to accept request" });
  }
});

// ✅ Reject a Collaboration Request
app.put("/influencer/requests/:influencerId/:requestId/reject", async (req, res) => {
  const { influencerId, requestId } = req.params;
  try {
    // Find the request by ID and ensure the influencer matches
    const request = await CollaborationRequest.findOneAndUpdate(
      { _id: requestId, influencerId },
      { status: "rejected" },  // Set the status to 'rejected'
      { new: true } // Return the updated document
    ).populate("brandId", "brandName");

    if (!request) {
      return res.status(404).json({ error: "Request not found or not authorized" });
    }

    res.json(request); // Send the updated request
  } catch (error) {
    console.error("Reject Request Error:", error);
    res.status(500).json({ error: "Failed to reject request" });
  }
});


// ✅ Brand Signup
app.post("/brand/signup", async (req, res) => {
  const { username, password, brandName } = req.body;
  if (!username || !password || !brandName) {
    return res.status(400).json({ error: "Missing required brand details" });
  }
  try {
    const existingBrand = await Brand.findOne({ username });
    if (existingBrand) {
      return res.status(400).json({ error: "Username already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const brand = new Brand({ username, password: hashedPassword, brandName });
    await brand.save();
    res.status(201).json({ message: "Brand registered successfully" });
  } catch (error) {
    console.error("Brand Signup Error:", error);
    res.status(500).json({ error: "Failed to register brand" });
  }
});

// ✅ Brand Login
app.post("/brand/login", async (req, res) => {
  const { username, password } = req.body;
  const brand = await Brand.findOne({ username });
  if (brand && await bcrypt.compare(password, brand.password)) {
    req.session.brandId = brand._id;
    res.json({ message: "Brand logged in successfully", brandId: brand._id });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

// ✅ Get All Influencers
app.get("/brand/influencers", async (req, res) => {
  try {
    const { location, brand, minSubscribers, maxSubscribers } = req.query;
    
    let filter = {};

    if (location) filter.location = location; // Filter by location
    if (brand) filter.category = brand; // Filter by category (assuming brand is stored as category)
    if (minSubscribers) filter.subscribers = { $gte: parseInt(minSubscribers) }; // Min subscribers
    if (maxSubscribers) {
      filter.subscribers = filter.subscribers || {};
      filter.subscribers.$lte = parseInt(maxSubscribers); // Max subscribers
    }

    const influencers = await Influencer.find(filter);
    res.json(influencers);
  } catch (error) {
    console.error("Fetch Influencers Error:", error);
    res.status(500).json({ error: "Failed to fetch influencers" });
  }
});

// ✅ Get All Brands
app.get("/brand/influencers/brands", async (req, res) => {
  try {
    const brands = await Brand.find({}, "brandName");
    res.json(brands);
  } catch (error) {
    console.error("Fetch Brands Error:", error);
    res.status(500).json({ error: "Failed to fetch brands" });
  }
});

// ✅ Send Collaboration Request
app.post('/brand/send-request', async (req, res) => {
  const { brandId, influencerId } = req.body;

  if (!brandId || !influencerId) {
    return res.status(400).json({ message: "Brand ID and Influencer ID are required" });
  }

  try {
    const request = new CollaborationRequest({ brandId, influencerId });
    await request.save();
    res.status(201).json({ message: "Request sent successfully", request });
  } catch (error) {
    console.error("Send Request Error:", error);
    res.status(500).json({ error: "Failed to send request" });
  }
});

// ✅ Get Requests for an Influencer
app.get("/influencer/requests/:influencerId", async (req, res) => {
  const { influencerId } = req.params;
  try {
    const requests = await CollaborationRequest.find({ influencerId }).populate("brandId", "brandName");
    res.json(requests);
  } catch (error) {
    console.error("Fetch Requests Error:", error);
    res.status(500).json({ error: "Failed to fetch requests" });
  }
});

// ✅ Get unique locations of influencers
app.get("/brand/influencers/locations", async (req, res) => {
  try {
    const locations = await Influencer.distinct("location"); // Fetch distinct locations
    res.json(locations);
  } catch (error) {
    console.error("Fetch Locations Error:", error);
    res.status(500).json({ error: "Failed to fetch locations" });
  }
});

// ✅ Get unique brands of influencers
app.get("/brand/influencers/brands", async (req, res) => {
  try {
    const brands = await Influencer.distinct("category");
    console.log("Fetched Brands from DB:", brands); // Debugging
    res.json({ categories: brands }); // Ensure it's an object
  } catch (error) {
    console.error("Fetch Brands Error:", error);
    res.status(500).json({ error: "Failed to fetch brands" });
  }
});

app.get("/brand/influencers/categories", async (req, res) => {
  try {
    const categories = await Influencer.distinct("category"); // Get unique categories
    res.json(categories);
  } catch (error) {
    console.error("Fetch Categories Error:", error);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});


// ✅ Get Accepted Collaboration Requests for a Brand
app.get("/brand/accepted-influencers/:brandId", async (req, res) => {
  const { brandId } = req.params;
  try {
    // Find all accepted collaboration requests for the brand
    const acceptedRequests = await CollaborationRequest.find({
      brandId,
      status: "accepted" // Only fetch requests that have been accepted
    })
      .populate("influencerId", "channelName email ") // Make sure the influencer's name and email are populated
      .exec();

    if (acceptedRequests.length === 0) {
      return res.status(404).json({ message: "No accepted influencers found." });
    }

    // Extract the relevant data (influencer's name and email)
    const influencers = acceptedRequests.map(req => ({
      influencerName: req.influencerId.channelName,
      influencerEmail: req.influencerId.email
    }));

    console.log('Responding with influencers:', influencers); // Check the response format

    res.json(influencers); // Return the list of influencers with their names and emails
  } catch (error) {
    console.error("Error fetching accepted influencers:", error);
    res.status(500).json({ error: "Failed to fetch accepted influencers." });
  }
});






// Start Server
const pathModule = require('path');
const fs = require('fs');
const distPath = pathModule.join(__dirname, 'dist/influencer-matching-system/browser');

// Check if built Angular app exists
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  
  // Serve index.html for all routes (Angular routing)
  app.get('*', (req, res) => {
    res.sendFile(pathModule.join(distPath, 'index.html'));
  });
  console.log('✅ Serving built Angular app from', distPath);
}

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
