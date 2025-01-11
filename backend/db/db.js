import mongoose from "mongoose"
import colors from "colors"

export const connectToMongoDBNoteApp = async () => {
    try {
        const connectionNoteApp = await mongoose.createConnection("mongodb://localhost:27017/note_app", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
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

export const connectToMongoDBCrypto = async () => {
  try {
      const connectionCrypto = await mongoose.createConnection("mongodb://localhost:27017/crypto", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    if (connectionCrypto) {
      console.log("Connected to MongoDB Crypto".brightGreen);
    } else {
      console.log("Failed to connect to MongoDB Crypto".brightRed);
    }
    return connectionCrypto
  } catch (error) {
    console.log("Error connecting to MongoDB Crypto".brightRed, error.message);
  }
};