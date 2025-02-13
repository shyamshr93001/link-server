import express from "express";
import validateBody from "../middleware/validateBody.middleware.js";
import checkAuth from "../middleware/auth.middleware.js";
import {
  getSubscribers,
  subscribeTopic,
  testFunc,
  testReadFunc,
  unsubscribeTopic,
} from "../controller/subscribe.controller.js";

const router = express.Router();

router.get("/getSubscribers", getSubscribers);
router.post("/subscribe", checkAuth, validateBody, subscribeTopic);
router.delete("/unsubscribe", checkAuth, validateBody, unsubscribeTopic);

router.post("/test", testFunc);
router.post("/test1", testReadFunc);

export default router;
