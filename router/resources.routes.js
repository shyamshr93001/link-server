import express from "express";
import {
  addResource,
  getResource,
} from "../controller/resources.controller.js";
import checkAuth from "../middleware/auth.middleware.js";
import validateBody from "../middleware/validateBody.middleware.js";

const router = express.Router();

router.post("/resources", checkAuth, validateBody, addResource);
router.get("/resources", checkAuth, getResource);

export default router;
