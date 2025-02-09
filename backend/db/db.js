import mongoose from "mongoose"
import colors from "colors"

export const connectToMongoDBNoteApp = async () => {
    try {
        const connectionNoteApp = await mongoose.createConnection("mongodb://localhost:27017/note_app");
        if (connectionNoteApp) {
          console.log("Connected to MongoDB Note App".brightGreen);
        } else {
          console.log("Failed to connect to MongoDB Note App".brightRed);
        }
        return connectionNoteApp
    } catch (error) {
        console.log("Error connecting to MongoDB Note App".brightRed, error.message)
    }
}

export const connectToMongoDBYear2025 = async () => {
  try {
      const connectionYear2025 = await mongoose.createConnection("mongodb://localhost:27017/2025");
    if (connectionYear2025) {
      console.log("Connected to MongoDB 2025 database".brightGreen);
    } else {
      console.log("Failed to connect to MongoDB 2025 database".brightRed);
    }
    return connectionYear2025
  } catch (error) {
    console.log("Error connecting to MongoDB 2025 database".brightRed, error.message);
  }
};

export const connectToMongoDBDeletion = async () => {
  try {
      const connectionDeletion = await mongoose.createConnection("mongodb://localhost:27017/deletion");
    if (connectionDeletion) {
      console.log("Connected to MongoDB Deletion database".brightGreen);
    } else {
      console.log("Failed to connect to MongoDB Deletion database".brightRed);
    }
    return connectionDeletion
  } catch (error) {
    console.log("Error connecting to MongoDB Deletion database".brightRed, error.message);
  }
}