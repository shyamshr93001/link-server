import express from "express";
import validateBody from "../middleware/validateBody.js";
import {
  createTopic,
  getTopics,
  deleteTopic,
  updateTopic,
} from "../controller/topic.js";

const router = express.Router();

router.get("/getTopics", getTopics);
router.post("/createTopic", validateBody, createTopic);
router.post("/deleteTopic", validateBody, deleteTopic);
router.post("/updateTopic", validateBody, updateTopic);

export default router;
