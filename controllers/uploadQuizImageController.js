const fs = require('fs');
const db = require('../models/index');
module.exports.getQuizImageUpload = async(req, res) => {
    console.log("filecontroller");

    //console.log(req.file) // form files
    if (req.file) {
        let obj = req.file.filename;
        console.log(req.file);
        console.log("query s");

        const quiz = await db.quiz.findOne({
            where: { quiz_id: req.session.quizzid.quiz_id }
        });
        console.log("end");
        console.log(quiz)

        if (quiz) {
            console.log(quiz);
            quiz.quiz_thumbnail = obj;
        }
        await quiz.save();

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