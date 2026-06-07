import mongoose from "mongoose";

// Setup a global variable to cache the database connection status across Vercel function invocations
let cachedConnection = global.mongoose;

if (!cachedConnection) {
  cachedConnection = global.mongoose = { conn: null, promise: null };
}

export const dbConnection = async () => {
  const mongoURI = process.env.MONGO_URI;

  if (!mongoURI) {
    console.error("Error: MONGO_URI is missing from environment variables.");
    return;
  }

  // 1. If an active connection exists in the serverless cache, reuse it immediately
  if (cachedConnection.conn) {
    console.log("Using cached database connection");
    return cachedConnection.conn;
  }

  // 2. If no connection promise exists, initialize a new connection attempt
  if (!cachedConnection.promise) {
    console.log("No cached connection found. Establishing new connection...");

    cachedConnection.promise = mongoose
      .connect(mongoURI, {
        dbName: "hmsDB",
        serverSelectionTimeoutMS: 5000, // Fail fast if Atlas is unreachable or down
        bufferCommands: false,          // Crucial: Stops Mongoose from hanging/buffering operations
      })
      .then((mongooseInstance) => {
        console.log("Connected to database!");
        return mongooseInstance;
      })
      .catch((err) => {
        console.log("Some error occured while connecting to database:", err.message);
        cachedConnection.promise = null; // Clear the failed promise from cache
        throw err;
      });
  }

  // 3. Await the pending connection, save it to cache, and return it
  cachedConnection.conn = await cachedConnection.promise;
  return cachedConnection.conn;
};
