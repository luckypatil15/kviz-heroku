
const db=require('../models/index');

module.exports.downloadFile=async(req,res)=>{
    var fullname = await db.users.findOne({where:{userid:req.session.userid}});
    var fullname = JSON.parse(JSON.stringify(fullname));
    console.log(fullname);
    var path = req.session.userid+"-"+fullname.fullname;
    console.log(path)
    var final =`C:\\Users\\lenovo\\OneDrive\\Desktop\\kviz project\\public\\student responses\\${path}.xlsx`
    res.download(final);
}