const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./model/user");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err.message));

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Root
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

/* =====================================================
   GEMINI RECOMMENDATIONS ROUTE
===================================================== */

app.post("/recommendations", async (req, res) => {
  try {
    const { city, vibe, visited = [], bookmarked = [], selected = [] } = req.body;

    if (!city || !vibe)
      return res.status(400).json({ error: "City and vibe are required" });

    const apiKey = process.env.GEMINI_API_KEY;
    const modelName = process.env.GEMINI_MODEL || "gemini-1.5-flash";

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent`;

    const prompt = `
    Recommend exactly 4 unique ${vibe} places in ${city}.
    Format each line as:
    Name | 1-2 sentence description | Distance from city center.
    Do not repeat: ${visited.join(", ")}, ${selected.join(", ")}.
    Include 1-2 bookmarked places: ${bookmarked.join(", ")}.
    `;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey
      },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: prompt }] }]
      })
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Gemini API error: ${response.status} - ${text}`);
    }

    const data = await response.json();
    const generated = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    const lines = generated.split("\n");

    const places = lines
      .map((line) => {
        const [n, d, dist] = line.split("|").map((x) => x?.trim());
        if (!n || !d || !dist) return null;

        const lat = 12.97 + (Math.random() * 0.2 - 0.1);
        const lng = 77.59 + (Math.random() * 0.2 - 0.1);

        return {
          name: n,
          description: d,
          distance: dist,
          coordinates: `${lat},${lng}`,
          mapUrl: `https://www.google.com/maps/search/${encodeURIComponent(n)}`
        };
      })
      .filter(Boolean)
      .slice(0, 4);

    res.json(places);
  } catch (err) {
    console.error("recommendations error:", err);
    res.status(500).json({ error: err.message });
  }
});

/* =====================================================
   USER SIGNUP
===================================================== */

app.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password)
      return res.status(400).json({ message: "All fields are required" });

    if (password.length < 6)
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });

    const exists = await User.findOne({ $or: [{ email }, { username }] });

    if (exists)
      return res
        .status(400)
        .json({ message: exists.email === email ? "Email exists" : "Username exists" });

    const newUser = new User({ username, email, password });
    await newUser.save();

    res.json({ message: "Signup success" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

/* =====================================================
   USER LOGIN
===================================================== */

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const match = await user.comparePassword(password);
    if (!match) return res.status(401).json({ message: "Invalid credentials" });

    res.json({
      message: "Login success",
      user: { id: user._id, username: user.username, email: user.email }
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: err.message });
  }
});

/* =====================================================
   START SERVER
===================================================== */

app.listen(PORT, () => {
  console.log(`✅ Triptrove backend is running on port ${PORT}`);
});
