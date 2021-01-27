const loadFunction = require('../models1/loaderFunction');
const session_check_controller = require('./session_check_controller');

exports.getquestions = async(req, res) => {
    //var questions = await loadFunction.questionLoader(req, res);
    console.log(questions);
    if (session_check_controller.check_session(req, res)) {

        // console.log('inside checker');

        res.json('addQuestion.ejs', {
            session: session_check_controller.check_session(req, res),
            username: req.session.user,


        });
    } else {
        //  console.log('outiside checker');
        res.render('homePage.ejs', {
            session: session_check_controller.check_session(req, res),
            username: req.session.user,
        });
    }
};