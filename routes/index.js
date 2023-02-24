const express = require('express');

const router = express.Router();

const homeController = require('../controllers/homeController');
// const userController = require('../controllers/userController');

// console.log("Router loaded");
router.get('/',homeController.home)
router.use('/users',require('./users'))
router.use('/posts',require('./posts'))
router.use('/comments',require('./comments'))
router.use('/api', require('./api/v1'));
module.exports = router;