const express = require('express');
const UserService = require('../services/user');
const User = require('../models/user');

const router = express.Router();

router.post('/login');
router.post('/sign', UserService.signup);

module.exports = router;
