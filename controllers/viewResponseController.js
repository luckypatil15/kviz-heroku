const session_check_controller = require('./session_check_controller.js');

const db = require('../models/index');
module.exports.getresponses=async (req,res)=>{

    let fullname = await db.users.findOne({
        where:{userid:req.session.userid}
    });
    if(fullname)
    fullname= JSON.parse(JSON.stringify(fullname));
    let quiz = await db.quiz.findOne({attributes:["quiz_id","tittle","description","overall_timer"],
    where: {quiz_id :req.query.id } 
    });
    if(quiz)
    quiz= JSON.parse(JSON.stringify(quiz));
    //console.log(quiz);
    let  questions = await db.question.findAll({
        where : {quiz_id : req.query.id}
    });
    //console.log(questions[0].dataValues.question_type)
    var question_array=[{}];
    let total_correct=0;
    for(let i = 0 ; i< questions.length ;i++){
        let data = {};
        data["question_type"] = questions[i].dataValues.question_type;
        data["question_statement"] = questions[i].dataValues.question_statement;
        data["question_timer"]= questions[i].dataValues.question_timer;
        data["difficulty"]=questions[i].dataValues.difficulty;
        data["correct_option"]=questions[i].dataValues.correct_option;
        data["max_points"]=questions[i].dataValues.max_points;
        data["serial_no"] = questions[i].dataValues.serial_no;
       
        const option = await db.options.findAll({exclude: ['question_id'],
                     where: {question_id : questions[i].dataValues.question_id} 
        });
        let responses = await db.sequelize.query(`select * from offline_responses where question_id =${questions[i].dataValues.question_id} limit 1`);
        responses = JSON.parse(JSON.stringify(responses));
        response=responses[0][0];
        console.log(response.response_statement);
        data['response']=response.response_statement;
        console.log("response array",);
        if(responses[0][0] && responses[0][0].is_correct){
            total_correct++;
        }
        let option_array=[];
        for(let j =0 ; j < option.length ;j++ ){
            let obj={};
            obj["question_id"]=option[j].dataValues.question_id;
            obj["option_id"]=option[j].dataValues.option_id;
            obj["option_statement"]=option[j].dataValues.option_statement;
            obj["serial_no"]=option[j].dataValues.serial_no;
            option_array[j]=obj;
            //  console.log(obj.option_id,responses.option_id);
            if(responses[0][0] && obj.option_id == responses[0][0].option_id){
                data['response']=obj.option_statement;
                console.log(obj.option_id,responses[0][0].option_id,data.correct_option)
            }
          
        }
        data["options"]=option_array;
       // console.log(data);
        question_array[i]=data
    }
    var results={
        name:quiz.tittle,
        description:quiz.description,
        overall_timer:quiz.overall_timer,
        number:questions.length,
        questions:question_array,
        total_correct:total_correct
    }
    if(session_check_controller.check_session(req,res)){
        // console.log("inside checker")
          res.render('viewresponses.ejs',{session:session_check_controller.check_session(req,res),
                                      username:req.session.user,
                                      fullname:fullname,
                                      results:results,
                                      quiz_id : req.query.id
                                       });
   }
      else{
      //console.log("outiside checker");
      res.render('login.ejs',{session:session_check_controller.check_session(req,res), flag:true});
  }
}