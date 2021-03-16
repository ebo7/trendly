import mongoose from "mongoose";

const logSchema = mongoose.Schema({
  logName: String,
  logEmoji: String,
  dailyGoal: Number,
  unit: String,
  data: [
    {
      date: String,
      value: Number,
      goal: Number,
    },
  ],
});

const statSchema = mongoose.Schema({
  userId: String,
  statName: String,
  category: String,
  emoji: String,

  logList: [logSchema],
});

const StatModel = mongoose.model("Stat", statSchema, "stats");
const LogModel = mongoose.model("Log", logSchema);

export { StatModel, LogModel };
