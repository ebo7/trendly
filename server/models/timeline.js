import mongoose from "mongoose";

const logSchema = mongoose.Schema({
  logName: String,
  unit: String,
  value: Number,
});

const timelinePointSchema = mongoose.Schema({
  date: Date,
  userId: String,
  statName: String,
  statEmoji: String,
  rating: Number,
  // image:
  logList: [logSchema],
  userName: String,
});

const TimelinePointModel = mongoose.model(
  "TimelinePoint",
  timelinePointSchema,
  "timelinePoints"
);

export { TimelinePointModel };
