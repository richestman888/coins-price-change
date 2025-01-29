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

appCrypto.listen(PORT2, async () => {
  const cryptoConn = await connectToMongoDBCrypto();
  const cryptoSchema = new mongoose.Schema(
    {
      _id: {
        type: String,
        default: () => new mongoose.Types.ObjectId().toString(),
      },
      hourlyTF: String,
      coins: Object,
    },
    { versionKey: false }
  );

  const year2025 = cryptoConn.model("2025", cryptoSchema);

  // Endpoint to save crypto data
  appCrypto.post("/api/saveCryptoData", async (req, res) => {
    const { _id, hourlyTF, coins } = req.body;
    const newEntry = new year2025({ _id, hourlyTF, coins });
    try {
      await newEntry.save();
      res.status(201).send("Data saved successfully");
    } catch (error) {
      res.status(500).send("Error saving data");
    }
  });

  let deleteInterval;

  // Endpoint to set interval for deleting documents
  appCrypto.post("/api/setInterval", (req, res) => {
    const { deleteDocsInterval } = req.body;
    deleteInterval = deleteDocsInterval / 1000; // Convert to seconds 
    res.json({ message: `Interval set to ${deleteInterval} seconds` });
  });
  
  // Endpoint to delete documents based on criteria 
  appCrypto.delete("/api/deleteNonUnderscoredDocuments", async (req, res) => { 
    try {
      /*  Deleting documents with non-underscore ID */
      const result1 = await year2025.deleteMany({ _id: { $not: { $regex: "_" } } });
      res.status(200).send(`Deleted ${result1.deletedCount} documents with non-underscore ID every ${deleteInterval} seconds successfully`);
    
      /*  Deleting redundant documents */
      // const allDocs = await year2025.find().sort({ _id: 1 });
      // const redundantDocs = [];
      // const uniqueDocs = {};

      // allDocs.forEach((doc) => {
      //   const date = doc._id.split("_")[0];
      //   const hourlyTF = doc.hourlyTF;
      //   const key = `${date}_${hourlyTF}`;
      //   if (!uniqueDocs[key]) {
      //     uniqueDocs[key] = doc._id;
      //   } else {
      //     redundantDocs.push(doc._id);
      //   }
      // });
      // res.status(200).send(`Redundant docs count: ${redundantDocs.length}`);
      // const result2 = await year2025.deleteMany({ _id: { $in: redundantDocs } });
      // res.status(200).send(`Deleted ${result2.deletedCount} redundant documents successfully`);
    } catch (error) {
      res.status(500).json({ message: "Error deleting documents" });
    }
  });

  appCrypto.get("/api/countDocsWithoutUnderscoreID", async (req, res) => {
    try {
      const docs = await year2025.find();
      const count = docs.filter((doc) => !doc._id.includes("_")).length;
      res.status(200).json({ count });
    } catch (error) {
      res.status(500).json({ message: "Error counting non-underscored ID documents" });
    }
  });    

  appCrypto.get("/api/countRedundantDocs", async (req, res) => {
    try {
      const allDocs = await year2025.find().sort({ _id: 1 });
      const redundantDocs = [];
      const uniqueDocs = {};

      allDocs.forEach((doc) => {
        const date = doc._id.split("_")[0];
        const hourlyTF = doc.hourlyTF;
        const key = `${date}_${hourlyTF}`;
        if (!uniqueDocs[key]) {
          uniqueDocs[key] = doc._id;
        } else {
          redundantDocs.push(doc._id);
        }
      });
      const count = redundantDocs.length;
      res.status(200).json({ count });
    }
    catch (error) {
      res.status(500).json({ message: "Error counting redundant documents" });
    }
  })

  console.log(`Crypto server is running on port ${PORT2}`.brightGreen);
});