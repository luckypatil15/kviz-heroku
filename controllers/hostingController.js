
const session_check_controller = require('./session_check_controller.js');
const db=require('../models/index');

module.exports.getHosting=(req,res)=>{
    //console.log(req.query.id)
    if(session_check_controller.check_session(req,res)){
        res.render('hostingQuiz.ejs',{
            session:session_check_controller.check_session(req,res),
            username:req.session.user,
            quiz : req.query.id});
    }
    else{
        res.render('login.ejs',{session:session_check_controller.check_session(req,res), flag:true});
    }
}
module.exports.joinquiz=()=>{

}