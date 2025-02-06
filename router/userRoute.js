import express from "express";
import validateBody from "../middleware/validateBody.js";
import {
  createUser,
  getUser,
  loginUser,
  resetPassword,
  forgetPassword,
} from "../controller/user.js";

const router = express.Router();

router.post("/createUser", validateBody, createUser);
router.post("/getUser", validateBody, getUser);
router.post("/loginUser", validateBody, loginUser);
router.post("/resetPassword/:token", validateBody, resetPassword);
router.post("/forgetPassword", validateBody, forgetPassword);

export default router;
