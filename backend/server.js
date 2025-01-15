import express from 'express'
import mongoose from "mongoose";
import cors from 'cors'
import colors from "colors";
import authRouter from './routes/auth.js'
import {connectToMongoDBNoteApp, connectToMongoDBCrypto} from './db/db.js';

const appAuth = express()
const PORT1 = 5050
appAuth.use(cors())
appAuth.use(express.json())
appAuth.use('/api/auth', authRouter)

appAuth.listen(PORT1, () => {
  connectToMongoDBNoteApp();
  console.log(`User authentication server is running on port ${PORT1}`.brightGreen);
});

// const appCrypto = express();
// const PORT2 = 6060;
// appCrypto.use(cors());
// appCrypto.use(express.json());

// appCrypto.listen(PORT2, () => {
//   connectToMongoDBCrypto();
//   console.log(`Crypto server is running on port ${PORT2}`.brightGreen);
// });

// // Schema for saving crypto data
// const cryptoSchema = new mongoose.Schema({
//   timestamp: { type: Date, default: Date.now },
//   coins: Map,
// });

// const CryptoData = mongoose.model("CryptoData", cryptoSchema);

// // Endpoint to save crypto data
// appCrypto.post("/api/saveCryptoData", async (req, res) => {
//   const { timestamp, coins } = req.body;
//   const newEntry = new CryptoData({ timestamp, coins });
//   try {
//     await newEntry.save();
//     res.status(201).send("Data saved successfully");
//   } catch (error) {
//     res.status(500).send("Error saving data");
//   }
// });
