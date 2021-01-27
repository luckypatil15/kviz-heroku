const express = require('express');

const uploadQuizImageController = require('../controllers/uploadQuizImageController.js');

router = express.Router();

router.route('/').post(uploadQuizImageController.getQuizImageUpload);

module.exports = router;