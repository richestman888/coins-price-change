import express from 'express'
import mongoose from "mongoose";
import cors from 'cors'
import colors from "colors";
import fs from "fs";
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

  // Function to write allDocs to a notepad file
  // const writeToFile = async () => {
  //   const allDocs = await year2025.find().sort({ _id: 1 });
  //   const data = JSON.stringify(allDocs, null, 2);
  //   fs.writeFile("allDocs.txt", data, (err) => {
  //     if (err) throw err;
  //     console.log("Data has been written to allDocs.txt");
  //   });
  // };

  // Call writeToFile function to write content to file
  // writeToFile();

  // Function to write uniqueDocs to a notepad file
  // const writeUniqueDocsToFile = async (uniqueDocs) => {
  //   const data = JSON.stringify(uniqueDocs, null, 2);
  //   fs.writeFile("uniqueDocs.txt", data, (err) => {
  //     if (err) throw err;
  //     console.log("Data has been written to uniqueDocs.txt");
  //   });
  // };

  // Function to write redundantDocs to a notepad file
  const writeRedundantDocsToFile = async (redundantDocs) => {
    const data = JSON.stringify(redundantDocs, null, 2);
    fs.writeFile("redundantDocs.txt", data, (err) => {
      if (err) throw err;
      console.log("Data has been written to redundantDocs.txt");
    });
  };

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

  /* Endpoint to delete documents with non-underscore ID  */
  appCrypto.delete("/api/deleteNonUnderscoredDocuments", async (req, res) => {
    try {
      const result = await year2025.deleteMany({_id: { $not: { $regex: "_" } }});
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
      res.status(200).send(`Redundant docs count (sent from server): ${redundantDocs.length}`);
      const result = await year2025.deleteMany({_id: { $in: redundantDocs }});
      res
        .status(200)
        .send(`Deleted ${result.deletedCount} redundant documents successfully`);
    } catch (error) {
      res.status(500).json({ message: "Error deleting redundant documents" });
    }
  });

  appCrypto.get("/api/countDocsWithoutUnderscoreID", async (req, res) => {
    try {
      const docs = await year2025.find();
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

      // Write uniqueDocs to file
      // writeUniqueDocsToFile(uniqueDocs);

      // Write redundantDocs to file
      writeRedundantDocsToFile(redundantDocs);
    } catch (error) {
      res.status(500).json({ message: "Error counting redundant documents" });
    }
  });

  console.log(`Crypto server is running on port ${PORT2}`.brightGreen);
});