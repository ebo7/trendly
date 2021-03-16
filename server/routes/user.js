// QUESTION: Combine files in routes?

import express from "express";
import {
  getUserGoogle,
  updateUser,
  createUser,
  getUser,
  setCategoryList,
} from "../controllers/user.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/signin", getUser);
router.get("/g", getUserGoogle);
router.post("/signup", createUser);
router.post("/setCategoryList", setCategoryList);
router.patch("/:id", auth, updateUser);

export default router;
