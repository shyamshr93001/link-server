const express = require('express');
const router = express.Router();
const validateBody = require('../middleware/validateBody');
const { createTopic, getTopics, deleteTopic, updateTopic } = require('../controller/topic');

router.get("/getTopics", getTopics);
router.post("/createTopic", validateBody, createTopic);
router.post("/deleteTopic", validateBody, deleteTopic);
router.post("/updateTopic", validateBody, updateTopic);

module.exports = router;
