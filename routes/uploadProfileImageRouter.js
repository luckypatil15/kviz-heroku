const express = require('express');

const uploadProfileImageController = require('../controllers/uploadProfileImageController.js');

router = express.Router();

router.route('/').post(uploadProfileImageController.getProfileImageUpload);

module.exports = router;