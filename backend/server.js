import express from 'express'
import mongoose from "mongoose";
import cors from 'cors'
import colors from "colors";
import authRouter from './routes/auth.js'
import {connectToMongoDBNoteApp, connectToMongoDBCrypto} from './db/db.js';

/*  Connecting to user authentication server  */
const appAuth = express()
const PORT1 = 5050
appAuth.use(cors())
appAuth.use(express.json())
appAuth.use('/api/auth', authRouter)

appAuth.listen(PORT1, () => {
  connectToMongoDBNoteApp();
  console.log(`User authentication server is running on port ${PORT1}`.brightGreen);
});

/*     Connecting to crypto server      */
const appCrypto = express();
const PORT2 = 6060;
appCrypto.use(cors());
appCrypto.use(express.json());

/* appCrypto.listen(PORT2, async () => {
  const cryptoConn = await connectToMongoDBCrypto();
  const cryptoSchema = new mongoose.Schema({
    timestamp: { type: Date, default: Date.now },
    coins: Map,
  }, {
    versionKey: false,
    _id: false
  });
 */
  appCrypto.listen(PORT2, async () => {
  const cryptoConn = await connectToMongoDBCrypto();
  const cryptoSchema = new mongoose.Schema({
    timestamp: { type: Date, default: Date.now },
    coins: Map,
  });


  const year2025 = cryptoConn.model("2025", cryptoSchema);

  // Endpoint to save crypto data
  appCrypto.post("/api/saveCryptoData", async (req, res) => {
    const { timestamp, coins } = req.body;
    const newEntry = new year2025({ timestamp, coins });
    try {
      await newEntry.save();
      res.status(201).send("Data saved successfully");
    } catch (error) {
      res.status(500).send("Error saving data");
    }
  });

  console.log(`Crypto server is running on port ${PORT2}`.brightGreen);
});