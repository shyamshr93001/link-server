const express = require('express');
const router = express.Router();
const { createUser, getUser, loginUser } = require('../controller/user');

router.post("/createUser", createUser);
router.post("/getUser", getUser);
router.post("/loginUser", loginUser);

module.exports = router;
