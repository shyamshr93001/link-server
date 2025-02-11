import express from "express";
import validateBody from "../middleware/validateBody.middleware.js";
import {
  createTopic,
  getTopics,
  deleteTopic,
  updateTopic,
} from "../controller/topic.controller.js";
import checkAuth from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/getTopics", checkAuth, getTopics);
router.post("/createTopic", checkAuth, validateBody, createTopic);
router.post("/deleteTopic", checkAuth, validateBody, deleteTopic);
router.post("/updateTopic", checkAuth, validateBody, updateTopic);

export default router;
