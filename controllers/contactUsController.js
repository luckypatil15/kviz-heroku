const session_check_controller = require('./session_check_controller.js');

const db = require('../models/index');
module.exports.getpage=async (req,res)=>{
    res.render('contact.ejs',{
        session: session_check_controller.check_session(req, res),
        username: req.session.user
    })
}