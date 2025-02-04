const express = require('express');
const router = express.Router();
const validateBody = require('../middleware/validateBody');
const { createUser, getUser, loginUser, resetPassword, forgetPassword } = require('../controller/user');

router.post("/createUser", validateBody, createUser);
router.post("/getUser", validateBody, getUser);
router.post("/loginUser", validateBody, loginUser);
router.post('/resetPassword/:token', validateBody, resetPassword);
router.post('/forgetPassword', validateBody, forgetPassword);

module.exports = router;
