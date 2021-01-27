var mysql = require('mysql');
var Config = require('../config');
const fs = require('fs');
var Promise = require("bluebird");
const session_check_controller = require('./session_check_controller.js');
const db=require('../models/index');

exports.listQuizzes= async (req,res)=>{


    let quizes = await db.quiz.findAll({attributes: { exclude: ['quiz_thumbnail'] }});
    let quizList =[]; 
    if(quizes){
        quizes = JSON.parse(JSON.stringify(quizes));
       console.log(quizes);
        for(let i=0;i<quizes.length;i++){
            let data = {};
            data["quiz_id"] = quizes[i].quiz_id;
            data["tittle"] = quizes[i].tittle;
            data["description"] = quizes[i].description;
            data["overall_timer"] = quizes[i].overall_timer;
            const creator = await db.users.findOne({attributes:["fullname"],
                     where: {userid : quizes[i].creator_id} 
                });
            
           data["fullname"] = creator.fullname; 
           quizList[i] = data;
        }
        console.log(quizList);
        if(session_check_controller.check_session(req,res)){
               console.log("inside checker")
                res.render('ListQuizes.ejs',{session:session_check_controller.check_session(req,res),
                                            username:req.session.user,
                                            results:quizList
                                             });
         }
            else{
            console.log("outiside checker");
            res.render('login.ejs',{session:session_check_controller.check_session(req,res), flag:true});
        }
    }
}
exports.fetchQuizz=async (req,res)=>{
   // console.log(req.query);
    const quiz = await db.quiz.findOne({attributes:["quiz_id","tittle","description","overall_timer", "quiz_thumbnail"],
    where: {quiz_id :req.query.id } 
    });
    //console.log(quiz);
    const questions = await db.question.findAll({
        where : {quiz_id : req.query.id}
    });
    //console.log(questions[0].dataValues.question_type)
    var question_array=[{}];
    
    for(let i = 0 ; i< questions.length ;i++){
        let data = {};
        data["question_type"] = questions[i].dataValues.question_type;
        data["question_statement"] = questions[i].dataValues.question_statement;
        data["question_timer"]= questions[i].dataValues.question_timer;
        data["difficulty"]=questions[i].dataValues.difficulty;
        data["correct_option"]=questions[i].dataValues.correct_option;
        data["max_points"]=questions[i].dataValues.max_points;
        data["serial_no"] = questions[i].dataValues.serial_no;
        data["quiz_thumbnail"] = questions[i].dataValues.quiz_thumbnail;

        const option = await db.options.findAll({exclude: ['question_id'],
                     where: {question_id : questions[i].dataValues.question_id} 
        });
        let option_array=[];
        for(let j =0 ; j < option.length ;j++ ){
            let obj={};
            obj["question_id"]=option[j].dataValues.question_id;
            obj["option_id"]=option[j].dataValues.option_id;
            obj["option_statement"]=option[j].dataValues.option_statement;
            obj["serial_no"]=option[j].dataValues.serial_no;
            option_array[j]=obj;
          
        }
        data["options"]=option_array;
       // console.log(data);
        question_array[i]=data
    }
   //console.log(quiz.tittle);
   var question_list = JSON.stringify(question_array);
    var results={
        name:quiz.dataValues.tittle,
        description:quiz.dataValues.description,
        overall_timer:quiz.dataValues.overall_timer,
        number:questions.length,
        questions:question_list,
        quiz_thumbnail: quiz.dataValues.quiz_thumbnail,
    }
    //req.session.questions = question_array;
    //console.log("hello",question_array);
    if(session_check_controller.check_session(req,res)){
       // console.log("inside checker")
         res.render('playQuiz.ejs',{session:session_check_controller.check_session(req,res),
                                     username:req.session.user,
                                     results:results,
                                     quiz_id : req.query.id
                                      });
  }
     else{
     //console.log("outiside checker");
     res.render('login.ejs',{session:session_check_controller.check_session(req,res), flag:true});
 }
   
}