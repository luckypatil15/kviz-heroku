const fs = require('fs');
const db = require('../models/index');
module.exports.getQuestionImageUpload = async(req, res) => {
    console.log("filecontroller");

    console.log(req.file) // form files
    if (req.file) {
        let obj = req.file.filename;

        res.json({
            status: "success",
            body: obj
        })
    } else {
        res.json({
            status: 'failed'

        })
    }
}