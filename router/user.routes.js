import express from "express";
import validateBody from "../middleware/validateBody.middleware.js";
import {
  createUser,
  getUser,
  loginUser,
  resetPassword,
  forgetPassword,
} from "../controller/user.controller.js";
import checkAuth from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/createUser", validateBody, createUser);
router.get("/getUser",checkAuth, validateBody, getUser);
router.post("/loginUser", validateBody, loginUser);
router.post("/resetPassword/:token", validateBody, resetPassword);
router.post("/forgetPass", validateBody, forgetPassword);

export default router;
