const express = require('express');
const router = express.Router();

// import controllers
const { authMiddleware, adminMiddleware, requiresSignIn } = require('../controllers/auth');
const { read} = require('../controllers/user');
router.get('/user' , requiresSignIn , authMiddleware , read);
router.get('/admin', requiresSignIn , adminMiddleware, read);
module.exports = router;
