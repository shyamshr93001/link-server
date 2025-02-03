const express = require('express');
const router = express.Router();
const { createTopic, getTopics, deleteTopic, updateTopic } = require('../controller/topic');

router.post("/createTopic", createTopic);
router.get("/getTopics", getTopics);
router.post("/deleteTopic", deleteTopic);
router.post("/updateTopic", updateTopic);

module.exports = router;
