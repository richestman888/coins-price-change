import express from 'express'
import mongoose from "mongoose";
import cors from 'cors'
import colors from "colors";
import fs from "fs";
import authRouter from './routes/auth.js'
import {connectToMongoDBNoteApp, connectToMongoDBYear2025, connectToMongoDBDeletion} from './db/db.js';

/*  Connecting to user authentication database  */
const appAuth = express()
const PORT1 = 5050
appAuth.use(cors())
appAuth.use(express.json())
appAuth.use('/api/auth', authRouter)

appAuth.listen(PORT1, () => {
  connectToMongoDBNoteApp();
  console.log(`Connection to user authentication database is running on port ${PORT1}`.brightGreen);
});

/*  Connecting to 2025 database  */
const appCrypto = express();
const PORT2 = 6060;
appCrypto.use(cors());
appCrypto.use(express.json());

appCrypto.listen(PORT2, async () => {
  const year2025Conn = await connectToMongoDBYear2025();
  const cryptoSchema = new mongoose.Schema(
    {
      _id: {
        type: String,
        default: () => new mongoose.Types.ObjectId().toString(),
      },
      hourlyTF: String,
      coins: Object,
    },
    { versionKey: false, collection: "Feb" }
  );

  const Feb2025 = year2025Conn.model("Feb", cryptoSchema);

  // Endpoint to save 2025Feb data
  appCrypto.post("/api/saveCryptoData", async (req, res) => {
    const { _id, hourlyTF, coins } = req.body;
    const newEntry = new Feb2025({ _id, hourlyTF, coins });
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

  /* Endpoint to delete documents with non-underscore ID  */
  appCrypto.delete("/api/deleteNonUnderscoredDocuments", async (req, res) => {
    try {
      const result = await Feb2025.deleteMany({_id: { $not: { $regex: "_" } }});
      res
        .status(200)
        .send(`Deleted ${result.deletedCount} documents with non-underscore ID every ${deleteInterval} seconds successfully`);
    } catch (error) {
      res.status(500).json({ message: "Error deleting non-underscored documents" });
    }
  });

  /*  Endpoint to delete redundant documents */
  appCrypto.delete("/api/deleteRedundantDocuments", async (req, res) => {
    try {
      const allDocs = await Feb2025.find().sort({ _id: 1 });
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
      const result = await Feb2025.deleteMany({_id: { $in: redundantDocs }});
      res
        .status(200)
        .send(`Redundant docs count (sent from server): ${redundantDocs.length}. Deleted ${result.deletedCount} redundant documents successfully`);
    } catch (error) {
      res.status(500).json({ message: "Error deleting redundant documents" });
    }
  });

  appCrypto.get("/api/countDocsWithoutUnderscoreID", async (req, res) => {
    try {
      const docs = await Feb2025.find();
      const count = docs.filter((doc) => !doc._id.includes("_")).length;
      res.status(200).json({ count });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error counting non-underscored ID documents" });
    }
  });

  appCrypto.get("/api/countRedundantDocs", async (req, res) => {
    try {
      const allDocs = await Feb2025.find().sort({ _id: 1 });
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

      // Write uniqueDocs to file
      // writeUniqueDocsToFile(uniqueDocs);

      // Write redundantDocs to file
      // writeRedundantDocsToFile(redundantDocs);
    } catch (error) {
      res.status(500).json({ message: "Error counting redundant documents" });
    }
  });

  console.log(`Connection to 2025 database is running on port ${PORT2}`.brightGreen);
});

/*  Connecting to deletion database  */
const appDeletion = express()
const PORT3 = 7070
appDeletion.use(cors())
appDeletion.use(express.json())

appDeletion.listen(PORT3, async () => {
  const deletionConn = await connectToMongoDBDeletion();
  const cryptoSchema = new mongoose.Schema(
    {
      _id: {
        type: String,
        default: () => new mongoose.Types.ObjectId().toString(),
      },
      deletion_type: String,
      last_deletion_date: String,
    },
    { versionKey: false, collection: "unwanted-docs-deletion-history" }
  );

  const deletionHistory = deletionConn.model("unwanted-docs-deletion-history", cryptoSchema);

  // Endpoint to record docs deletion details
  appCrypto.post("/api/recordRecentDocsDeletionDetails", async (req, res) => {
    const { _id, deletion_type, last_deletion_date } = req.body;
    console.log("Request Body:", req.body);
    try {
      const result = await deletionHistory.findOneAndUpdate(
        { _id },
        { deletion_type },
        { $set: { last_deletion_date } },
        { new: true, upsert: true }
      );
      res.status(200).send(`Document with ID ${_id} updated successfully`);
    } catch (error) {
      res.status(500).send("Error saving docs deletion details");
    }
  });

  console.log(
    `Connection to deletion database is running on port ${PORT3}`.brightGreen
  );
});

/*  Endpoint to read data from DB for plotting line chart  */
appCrypto.get("/api/get2025Data", async (req, res) => {
  try {
    const data = await Feb2025.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching data from 2025 database" });
  }
});