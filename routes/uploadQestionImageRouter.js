const express = require('express');

const uploadQuestionImageController = require('../controllers/uploadQuestionImageController.js');

router = express.Router();

router.route('/').post(uploadQuestionImageController.getQuestionImageUpload);

module.exports = router;