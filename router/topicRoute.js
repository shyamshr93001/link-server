const express = require('express');
const router = express.Router();
const { createTopic, getTopics } = require('../controller/topic');

router.post("/createTopic", createTopic);
router.get("/getTopics", getTopics);

module.exports = router;
