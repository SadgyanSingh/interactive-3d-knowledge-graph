import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import githubRoutes from "./routes/auth.js";

dotenv.config();

const app = express();   // ✅ FIRST create app

app.use(cors());
app.use(express.json());

app.use("/github", githubRoutes);   // ✅ THEN use routes

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
