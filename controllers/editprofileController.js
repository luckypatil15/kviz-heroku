const session_check_controller = require('./session_check_controller.js');
var mysql = require('mysql');
var Config = require('../config');
const db = require('../models/index');

module.exports.getpage=async (req,res)=>{

    let userinfo =await db.users.findOne({where :{userid:req.session.userid}});
    if(userinfo){
        userinfo = JSON.parse(JSON.stringify(userinfo));
    }
    const Connection = mysql.createConnection(Config);
    await Connection.connect();
    var org_details = await db.sequelize.query(`SELECT * FROM org_details WHERE userid = :user`,{replacements:{
        user:req.session.userid
    }
    });
    if(org_details){
        org_details = JSON.parse(JSON.stringify(org_details));
    }

    if(!org_details){
        org_details.org_id = "1";
        org_details.organization = "kviz Team,cdac mumbai";
        org_details.lang = 'english';
        org_details.userid = req.session.userid;
        org_details.user_type = 'student';
    }
    //console.log("hii",org_details);
    await Connection.end();
    if(session_check_controller.check_session(req,res)){
     
        res.render('editprofile.ejs',{session:session_check_controller.check_session(req,res),
                                    username:req.session.user,
                                    userinfo:userinfo,
                                    org_details:org_details
                                     });
    }
    else{
       res.render('login.ejs',{session:session_check_controller.check_session(req,res), flag:true});
   }
}
//Laxman edit profiele
module.exports.editprofile=async (req,res)=>{
    let fullname = req.body.fullname;
    let email = req.body.email;
    let org_name = req.body.org_name;
    let langauage = req.body.langauage;
    let account = req.body.account_type;
    db.users.update(
        { fullname: fullname,email:email },
        { where: { userid: req.session.userid } }
      ).then(result=>{}
        ).catch(err =>{
            //console.log(err);
            res.render('homePage.ejs', {
              session: session_check_controller.check_session(req, res),
              username: req.session.user,
            });
        })
    try{
        const Connection = mysql.createConnection(Config);
    await Connection.connect();
    await Connection.queryAsync(
        'update  org_details set organization=?,lang=?,user_type=?  WHERE userid = ?',
        [org_name,langauage,account,req.session.userid]);

    await Connection.end();
    if(session_check_controller.check_session(req,res)){
     
        res.render('homepage.ejs',{session:session_check_controller.check_session(req,res),
                                    username:req.session.user,
                                   
                                     });
    }
    else{
       res.render('login.ejs',{session:session_check_controller.check_session(req,res), flag:true});
   }
    }
    catch(err){
        console.log(err);
    }
    
}