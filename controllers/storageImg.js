const multer = require('multer')
const __basedir = require('../rootPath')

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __basedir + "/public/assets/img");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${file.originalname}`);
    },
});

module.exports = storage;