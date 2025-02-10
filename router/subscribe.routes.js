import express from "express";
import validateBody from "../middleware/validateBody.js";

import checkAuth from "../middleware/auth.js";
import { getSubscribers, subscribeTopic, unsubscribeTopic } from "../controller/subscribe.controller.js";

const router = express.Router();

router.get("/getSubscribers", getSubscribers);
router.post("/subscribe", validateBody, subscribeTopic);
router.post("/unsubscribe", validateBody, unsubscribeTopic);

export default router;
