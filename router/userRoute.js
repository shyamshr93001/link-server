const express = require('express');
const router = express.Router();
const { createUser, getUser, loginUser, resetPassword, forgetPassword } = require('../controller/user');

router.post("/createUser", createUser);
router.post("/getUser", getUser);
router.post("/loginUser", loginUser);
router.post('/resetPassword/:token', resetPassword);
router.post('/forgetPassword', forgetPassword);

module.exports = router;
