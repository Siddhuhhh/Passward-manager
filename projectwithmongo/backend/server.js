const express = require("express");
const dotenv = require("dotenv");
const { MongoClient, ObjectId } = require("mongodb");
const bodyparser = require("body-parser");
const cors = require("cors");

dotenv.config();

const url = process.env.MONGO_URI;
const client = new MongoClient(url);

const dbName = process.env.DB_NAME;
const app = express();
const port = 3000;

// Middleware
app.use(bodyparser.json());
app.use(cors());

// Connect to MongoDB once on server start
client.connect().then(() => {
  console.log("Connected successfully to MongoDB");
});

// Get all passwords
app.get("/passwords", async (req, res) => {
  try {
    const db = client.db(dbName);
    const collection = db.collection("passwords");
    const passwords = await collection.find({}).toArray();
    res.json(passwords);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch passwords" });
  }
});

// Save a password
app.post("/passwords", async (req, res) => {
  try {
    const password = req.body;
    const db = client.db(dbName);
    const collection = db.collection("passwords");
    const result = await collection.insertOne(password);
    res.json({ success: true, insertedId: result.insertedId });
  } catch (error) {
    res.status(500).json({ error: "Failed to save password" });
  }
});

// Delete a password by ID
app.delete("/passwords/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const db = client.db(dbName);
    const collection = db.collection("passwords");
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Password not found" });
    }
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete password" });
  }
});

// Update a password by ID
app.put("/passwords/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedPassword = req.body;
    const db = client.db(dbName);
    const collection = db.collection("passwords");
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedPassword }
    );
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Password not found" });
    }
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to update password" });
  }
});

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});
