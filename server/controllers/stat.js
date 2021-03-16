import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { StatModel, LogModel } from "../models/stat.js";
import { CategoryListModel, StatListModel } from "../models/statList.js";

const secret = "secret";
export const getStat = async (req, res) => {
  if (!req.userId) {
    return res.json({ message: "Unauthenticated" });
  }
  const { statId, token } = req.query;
  const stat = await StatModel.findOne({ _id: statId });
  res.json(stat);
};

// For fitness insights. Different from getStatList in that the latter is for
// getting all statList of users, whereas this fetches by specific ids
export const getStats = async (req, res) => {
  if (!req.userId) {
    return res.json({ message: "Unauthenticated" });
  }
  const { statIds, token } = req.query;
  console.log(statIds);
  const result = await StatModel.find({ _id: { $in: statIds } });
  res.json(result);
};
export const addLog = async (req, res) => {
  if (!req.userId) {
    return res.json({ message: "Unauthenticated" });
  }
  const { statId, logName, logEmoji, unit, token } = req.body;
  const stat = await StatModel.findOne({ _id: statId });
  const newLog = new LogModel({
    logName,
    logEmoji,
    unit,
    data: [],
    dailyGoal: null,
  });
  const newLogList = [...stat.logList, newLog];
  const result = await StatModel.findByIdAndUpdate(
    statId,
    { $set: { logList: newLogList } },
    {
      new: true,
    }
  );
  res.json(result);
};

export const updateStat = async (req, res) => {
  if (!req.userId) {
    return res.json({ message: "Unauthenticated" });
  }
  const { newStat, token } = req.body;
  const result = await StatModel.findByIdAndUpdate(newStat._id, newStat, {
    new: true,
  });
  res.json(result);
};

export const addCategory = async(req, res) => {
  if (!req.userId) {
    return res.json({ message: "Unauthenticated" });
  }
  const { categoryName, token } = req.body;

  let categoryList = (await CategoryListModel.findOne({ userId: req.userId }))
    .categoryList;

  let statList = [];

  categoryList.push({ categoryName: categoryName, statList });

  const result = await CategoryListModel.findOneAndUpdate(
    { userId: req.userId },
    { $set: { categoryList: categoryList } },
    {
      new: true,
    }
  );
  res.json({result});
}

export const addStat = async (req, res) => {
  if (!req.userId) {
    return res.json({ message: "Unauthenticated" });
  }
  console.log("received");
  const { statName, categoryIdx, emoji, token } = req.body;
  const categoryNames = ["Social", "Hobbies", "Health", "Chores"];
  let newStat;
  if (categoryIdx === 0) {
    newStat = await StatModel.create({
      statName,
      userId: req.userId,
      category: categoryNames[categoryIdx],
      emoji,
      logList: [
        {
          logName: "Calories",
          logEmoji: "🔥",
          unit: "kcal",
          data: [],

          dailyGoal: 0,
        },
        {
          logName: "Steps",
          logEmoji: "👟",
          unit: " ",
          data: [],

          dailyGoal: 0,
        },
        {
          logName: "Distance",
          logEmoji: "📏",
          unit: "meters",
          data: [],
          dailyGoal: 0,
        },
        {
          logName: "Rating",
          logEmoji: "⭐",
          unit: " ",
          data: [],
          dailyGoal: 0,
        },
      ],
    });
  } else {
    newStat = await StatModel.create({
      statName,
      userId: req.userId,
      category: categoryNames[categoryIdx],
      emoji,
      logList: [
        {
          logName: "Rating",
          unit: null,
          data: [],
        },
      ],
    });
  }

  const newStatListElem = {
    statName: statName,
    statId: newStat._id.toString(),
    category: categoryNames[categoryIdx],
    emoji: emoji,
  };
  let categoryList = (await CategoryListModel.findOne({ userId: req.userId }))
    .categoryList;
  let statList = categoryList[categoryIdx];

  statList.statList = [...statList.statList, newStatListElem];
  categoryList[categoryIdx] = statList;

  const result = await CategoryListModel.findOneAndUpdate(
    { userId: req.userId },
    { $set: { categoryList: categoryList } },
    {
      new: true,
    }
  );
  res.json({ newStat, result });
};
