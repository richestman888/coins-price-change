import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import colors from "colors";
import { connectToMongoDBCrypto } from "./db/db.js";

const app = express();
const PORT = 6060;
app.use(cors());
app.use(express.json());

app.listen(PORT, async () => {
  const testConnection = await connectToMongoDBCrypto();
  const cryptoSchema = new mongoose.Schema({
    timestamp: { type: Date, default: Date.now },
    coins: Map,
  });

  const CryptoData = testConnection.model("CryptoData", cryptoSchema);

  // Endpoint to save crypto data
  app.post("/api/saveCryptoData", async (req, res) => {
    const { timestamp, coins } = req.body;
    const newEntry = new CryptoData({ timestamp, coins });
    try {
      await newEntry.save();
      res.status(201).send("Data saved successfully");
    } catch (error) {
      res.status(500).send("Error saving data");
    }
  });

  console.log(`Crypto server is running on port ${PORT}`.brightGreen);
});
