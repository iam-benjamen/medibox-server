import mongoose, { Document, Schema } from "mongoose";

export interface ILog extends Document {
  status: boolean; // true if taken, false if missed/skipped
  date: Date; // date of dispensing
  time: string; // time of dispensing
  description: string; // any additional notes
}

const LogSchema = new Schema<ILog>(
  {
    status: {
      type: Boolean,
      required: true,
    },
    date: {
      type: Date,
      required: false,
      default: Date.now,
    },
    time: {
      type: String,
      required: false,
      default: new Date().toLocaleTimeString(),
    },
    description: {
      type: String,
      required: true,
    },
  },
);

export default mongoose.model<ILog>("Log", LogSchema);
