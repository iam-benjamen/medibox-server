import express, { Request, Response } from "express";
import Log, { ILog } from "../models/logs";

const router = express.Router();

// POST: Create a new log
router.post("/", async (req: Request, res: Response) => {
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);

  try {
    const log = new Log(req.body);
    const savedLog = await log.save();
    res.status(201).json(savedLog);
  } catch (error) {
    res.status(400).json({
      message: "Error creating log",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// GET: Retrieve all logs
router.get("/", async (req: Request, res: Response) => {
  try {
    const logs = await Log.find()
      .sort({ date: -1, time: -1 }) // Sort by date and time, newest first
      .limit(100); // Limit to last 100 records
    res.json(logs);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving logs",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// GET: Retrieve logs by date range
router.get("/range", async (req: Request, res: Response) => {
  try {
    const { startDate, endDate } = req.query;
    const logs = await Log.find({
      date: {
        $gte: new Date(startDate as string),
        $lte: new Date(endDate as string),
      },
    }).sort({ date: -1, time: -1 });
    res.json(logs);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving logs",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

export default router;
