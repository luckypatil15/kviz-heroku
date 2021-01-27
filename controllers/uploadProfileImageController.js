const fs = require('fs');
const db = require('../models/index');
module.exports.getProfileImageUpload = async(req, res) => {
    console.log("filecontroller");

    console.log(req.file) // form files
    if (req.file) {
        let obj = req.file.filename;
        console.log("query s");

        const user = await db.users.findOne({
            where: { userid: req.session.userid }
        });
        console.log("end");

        if (user) {
            console.log(user);
            user.user_image = obj;
        }
        await user.save();

        res.send({
            status: 123,
            body: user.user_image
        })
    } else {
        res.json({
            status: 'failed'

        })
    }
}