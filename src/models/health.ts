import mongoose, { Document, Schema } from "mongoose";

export interface IMetrics extends Document {
  health_rate: number;
  blood_oxygen: number;
  time: string;
}

const MetricSchema = new Schema<IMetrics>({
  health_rate: {
    type: Number,
    required: true,
  },
  blood_oxygen: {
    type: Number,
    required: true,
  },
  time: {
    type: String,
    required: false,
    default: new Date().toLocaleTimeString(),
  },
});

export default mongoose.model<IMetrics>("Metrics", MetricSchema);
