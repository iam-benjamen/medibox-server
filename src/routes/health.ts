import express, { Request, Response } from "express";
import Metrics from "../models/health";

const router = express.Router();

// POST: Create new health metric
router.post("/", async (req: Request, res: Response) => {
  try {
    const metric = new Metrics(req.body);
    const savedMetric = await metric.save();
    res.status(201).json(savedMetric);
  } catch (error) {
    res.status(400).json({
      message: "Error Saving Health Metric",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// GET: Retrieve all health metrics
router.get("/", async (req: Request, res: Response) => {
  try {
    const metrics = await Metrics.find().sort({ time: -1 }).limit(100);
    res.json(metrics);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving metrics",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

export default router;
