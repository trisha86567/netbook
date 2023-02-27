const express = require('express');

const router = express.Router();
const usersApi = require('../../../controllers/api/v1/users_api');


router.post('/signInUser', usersApi.signInUser);

module.exports = router;