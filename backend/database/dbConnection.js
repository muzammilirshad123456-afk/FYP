import mongoose from "mongoose";

export const dbConnection = () => {

  const mongoURI = process.env.MONGO_URI
  mongoose
    .connect(mongoURI, {
      dbName: "hmsDB",
    })
    .then(() => {
      console.log("Connected to database!");
    })
    .catch((err) => {
      console.log("Some error occured while connecting to database:", err);
    });
};
