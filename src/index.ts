import express, { Express } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDB } from "./config/database";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

//middleware
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Server is running fine",
    dbStatus:
      mongoose.connection.readyState === 1 ? "connected" : "disconnected",
  });
});

// Start server
const startServer = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
};

startServer();
