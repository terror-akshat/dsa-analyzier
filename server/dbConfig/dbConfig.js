// const mongoose = require("mongoose");
import mongoose from "mongoose";
const connect = async () => {
  try {
    await mongoose.connect("mongodb+srv://Shakshi:224488@cluster0.illdrpk.mongodb.net/DSA?retryWrites=true&w=majority&appName=Cluster0");
    console.log("mongodb connected");
  } catch (error) {
    console.log(error);
  }
};

mongoose.connection.on("connected", () => {
  console.log("Connected to mongodb");
});
mongoose.connection.on("dissconnected", () => {
  console.log("mongo db is disconnected");
});

export default connect;