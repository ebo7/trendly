import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { StatModel } from "../models/stat.js";

import { UserModel } from "../models/user.js";
import { StatListModel, CategoryListModel } from "../models/statList.js";

const secret = "secret";

export const getUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User doesn't exist" });
    }
    if (user.password === "") {
      return res
        .status(400)
        .json({ message: "Email is registered using google" });
    }
    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      return res.status(400).json({ message: "Invalid Password" });
    }
    const token = jwt.sign({ email: user.email, id: user._id }, secret, {
      expiresIn: "16h",
    });
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const getUserGoogle = async (req, res) => {
  const { email, name } = req.query;
  const user = await UserModel.findOne({ email: email });
  if (user !== null) {
    const token = jwt.sign({ email: user.email, id: user._id }, secret, {
      expiresIn: "16h",
    });
    res.status(200).json({ user, token });
  }
  // add user automatically to db
  else {
    const newUser = new UserModel({
      name: name,

      email: email,
      password: "",
    });
    try {
      await newUser.save();
      const token = jwt.sign(
        { email: newUser.email, id: newUser._id },
        secret,
        {
          expiresIn: "16h",
        }
      );
      //await createCategoryList(newUser._id);

      res.status(201).json({ user: newUser, token });
    } catch (error) {
      res.status(409).json({ message: error });
    }
  }
};

export const updateUser = async (req, res) => {
  // req includes whole user document which has user id and email.
  // Since token has those infos as well, not sure if it  more secure to use token
  // and not include those in req
  if (!req.body.token) {
    return res.json({ message: "Unauthenticated" });
  }

  const { id, email, name, password, token } = req.body;

  const userInDb = await UserModel.findOne({ email });
  if (userInDb && userInDb._id != id) {
    return res
      .status(400)
      .json({ message: "Another user already has this email!" });
  }

  if (userInDb && userInDb.password === "") {
    return res
      .status(400)
      .json({ message: "Email is registered using google" });
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const userUpdated = { email, name, password: hashedPassword, _id: id };

  await UserModel.findByIdAndUpdate(id, userUpdated, { new: true });

  res.status(200).json({ user: userUpdated, token: token });
};

export const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const oldUser = await UserModel.findOne({ email });

    if (oldUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await UserModel.create({
      name,
      email,
      password: hashedPassword,
    });

    //await createCategoryList(newUser._id);
    const token = jwt.sign({ email: newUser.email, id: newUser._id }, secret, {
      expiresIn: "16h",
    });
    res.status(201).json({ user: newUser, token });
  } catch (error) {
    res.status(500).json({ message: error });
    return;
  }
};

export const createCategoryList = async (
  userIdParam,
  categoryNames,
  names,
  emojis
) => {
  let i = 0;
  let categoryList = [];
  let stat;
  stat = await StatModel.create({
    statName: "Walking",
    emoji: "👟",
    category: "Fitness",
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
  categoryList.push({
    categoryName: "Fitness",
    statList: [
      {
        statId: stat._id,
        statName: "Walking",
        emoji: "👟",
        category: "Fitness",
      },
    ],
  });

  for (i; i < categoryNames.length; i++) {
    let statList = [];

    stat = await StatModel.create({
      statName: names[i],
      emoji: emojis[i],
      category: categoryNames[i],
      logList: [
        {
          logName: "Rating",
          logEmoji: "⭐",
          dailyGoal: 0,
          unit: " ",
          data: [],
        },
      ],
    });

    statList.push({
      statId: stat._id,
      statName: names[i],
      emoji: emojis[i],
      category: categoryNames[i],
    });

    categoryList.push({ categoryName: categoryNames[i], statList });
  }
  try {
    const newCategoryList = await CategoryListModel.create({
      userId: userIdParam,
      categoryList,
    });
  } catch (error) {
    console.log(error);
  }

  return;
};

export const setCategoryList = async (req, res) => {
  if (!req.body.token) {
    return res.json({ message: "Unauthenticated" });
  }

  const { categoryList, namesList, email, token } = req.body;
  const emojis = new Array(categoryList.length).fill("?");
  console.log(emojis);
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User doesn't exist" });
    }
    const token = jwt.sign({ email: user.email, id: user._id }, secret, {
      expiresIn: "16h",
    });
    await createCategoryList(user._id, categoryList, namesList, emojis);

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
