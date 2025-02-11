import express from "express";
import validateBody from "../middleware/validateBody.js";

import checkAuth from "../middleware/auth.js";
import { getSubscribers, subscribeTopic, unsubscribeTopic } from "../controller/subscribe.controller.js";

const router = express.Router();

router.get("/getSubscribers", checkAuth, getSubscribers);
router.post("/subscribe", checkAuth, validateBody, subscribeTopic);
router.post("/unsubscribe",checkAuth, validateBody, unsubscribeTopic);

export default router;
