import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { TimelinePointModel } from "../models/timeline.js";

export const addTimelinePoint = async (req, res) => {
  if (!req.userId) {
    return res.json({ message: "Unauthenticated" });
  }
  const {
    userId,

    date,
    statName,
    statEmoji,
    rating,
    logList,
    userName,
    token,
  } = req.body;
  const result = await TimelinePointModel.create({
    userId,
    date,
    statName,
    statEmoji,
    rating,
    logList,
    userName,
  });
  console.log(result);
  res.json(result);
};
export const getTimeline = async (req, res) => {
  if (!req.userId) {
    return res.json({ message: "Unauthenticated" });
  }
  console.log("personal");

  try {
    const result = await TimelinePointModel.aggregate([
      { $match: { userId: req.userId } },
      { $group: { _id: "$date", arr: { $push: "$$ROOT" } } },
      { $sort: { _id: -1 } },
    ]);
    res.json(result);
  } catch (error) {
    console.log(error);
  }
};

export const getNetworkTimeline = async (req, res) => {
  if (!req.userId) {
    return res.json({ message: "Unauthenticated" });
  }
  const { network } = req.query;
  try {
    const result = await TimelinePointModel.aggregate([
      { $match: { userId: { $in: network } } },
      { $group: { _id: "$date", arr: { $push: "$$ROOT" } } },
      { $sort: { _id: -1 } },
    ]);
    res.json(result);
  } catch (error) {
    console.log(error);
  }
};
