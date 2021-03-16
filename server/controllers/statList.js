import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { StatListModel, CategoryListModel } from "../models/statList.js";

const secret = "secret";

export const getStatList = async (req, res) => {
  if (!req.userId) {
    return res.json({ message: "Unauthenticated" });
  }
  const statList = await CategoryListModel.findOne({ userId: req.userId });

  res.json(statList);
};
