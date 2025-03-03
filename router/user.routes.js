import express from "express";
import validateBody from "../middleware/validateBody.middleware.js";
import {
  createUser,
  getUser,
  loginUser,
  resetPassword,
  forgetPassword,
  getOtherUsers,
} from "../controller/user.controller.js";
import checkAuth from "../middleware/auth.middleware.js";
import validateSchema from "../middleware/validateSchema.middleware.js";
import { userRegisterSchema } from "../validation/user.validation.js";

const router = express.Router();

router.post("/createUser", validateBody, validateSchema(userRegisterSchema), createUser);
router.get("/getUser",checkAuth, validateBody, getUser);
router.post("/loginUser", validateBody, loginUser);
router.post("/resetPassword/:token", validateBody, resetPassword);
router.post("/forgetPass", validateBody, forgetPassword);
router.get("/getOtherUser/:username", validateBody, getOtherUsers);

export default router;
