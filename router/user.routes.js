import express from "express";
import validateBody from "../middleware/validateBody.js";
import {
  createUser,
  getUser,
  loginUser,
  resetPassword,
  forgetPassword,
} from "../controller/user.controller.js";
import checkAuth from "../middleware/auth.js";

const router = express.Router();

router.post("/createUser", validateBody, createUser);
router.post("/getUser",checkAuth, validateBody, getUser);
router.post("/loginUser", validateBody, loginUser);
router.post("/resetPassword/:token", validateBody, resetPassword);
router.post("/forgetPassword", validateBody, forgetPassword);

export default router;
