const express = require('express');
const jwtAuth = require('../middleware/jwtAuth');
const UserService = require('../services/userServcie');
const router = express.Router();

router.post('/login', UserService.login);
router.post('/logout', jwtAuth, UserService.logout);
router.post('/signup', UserService.signup);

module.exports = router;
