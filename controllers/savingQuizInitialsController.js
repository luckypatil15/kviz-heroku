const putFolderName = require('../models1/PutFolderName.js');
const loadFunction = require('../models1/loaderFunction.js');
const session_check_controller = require('./session_check_controller.js');


const db = require('../models/index');
exports.saveResult = async(req, res) => {
    // var questions = await loadFunction.questionLoader(req, res);
    const catId = await getCatId(req.body.newCategory);
    let quizname = req.body.QuizName;
    let quizdesc = req.body.QuizDesc;
    let userid = req.session.userid;
    //console.log(req.body.newCategory);
    req.session.catId = catId;
    //console.log(userid);
    const quizz = await db.quiz.create({
        creator_id: userid,
        created_at: new Date(),
        tittle: quizname,
        description: quizdesc,
    });
    //console.log(quizz);
    req.session.quizzid = quizz;

    if (quizz) {
        if (session_check_controller.check_session(req, res)) {
            // //console.log('inside checker');
            res.render('addQuestion.ejs', {
                session : session_check_controller.check_session(req, res),
                username: req.session.user,
                // results: questions

            });
        } else {
            //  //console.log('outiside checker');
            res.render('homePage.ejs', {
                session: session_check_controller.check_session(req, res),
                username: req.session.user,
            });
        }
    } else {
        res.render('homePage.ejs', {
            session: session_check_controller.check_session(req, res),
            username: req.session.user,
        });
    }
};

async function getCatId(catname) {
    try {
        const [cat, created] = await db.categories.findOrCreate({
            where: { Cat_name: catname }

        })
        //console.log(created);
        return cat.Cat_id;
    } catch (err) {
        //console.log(err);
    }
}