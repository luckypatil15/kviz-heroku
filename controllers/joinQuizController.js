const session_check_controller = require('./session_check_controller.js');
const db=require('../models/index');
module.exports.getPage=async (req,res)=>{
    let profile = await db.users.findOne({where: { userid : req.session.userid}});
    if(profile){
        profile  = JSON.parse(JSON.stringify(profile));
    }
    if(session_check_controller.check_session(req,res)){
        //    console.log("inside checker")
            res.render('joinQuiz.ejs',
                        {session:session_check_controller.check_session(req,res),
                        username:req.session.user,
                        profile : profile
                        });
    }
    else{
        //console.log("outiside checker");
        res.render('login.ejs',{session:session_check_controller.check_session(req,res), flag:true});
    }
}
module.exports.joinquiz=(req,res)=>{
    
}