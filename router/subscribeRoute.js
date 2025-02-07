import express from "express";
import validateBody from "../middleware/validateBody.js";
import {
  createTopic,
  getTopics,
  deleteTopic,
  updateTopic,
} from "../controller/topic.js";

const router = express.Router();

router.get("/getUserSubs", getUserSubs);
router.post("/subscribe", validateBody, subscribe);
router.post("/unsubscribe", validateBody, deleteTopic);

export default router;
