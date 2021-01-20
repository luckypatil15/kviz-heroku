const db = require('../models/index');

exports.getquizes = async (req, res) => {
    let quizes = await db.quiz.findAll({ attributes: { exclude: ['quiz_thumbnail'] } });
    let quizList = [];
    if (quizes) {
        quizes = JSON.parse(JSON.stringify(quizes));
        console.log(quizes);
        for (let i = 0; i < quizes.length; i++) {
            let data = {};
            data['quiz_id'] = quizes[i].quiz_id;
            data['title'] = quizes[i].title;
            data['description'] = quizes[i].description;
            data['overall_timer'] = quizes[i].overall_timer;
            const creator = await db.users.findOne({
                attributes: ['fullname'],
                where: { user_id: quizes[i].creator_id },
            });

            data['fullname'] = creator.fullname;
            quizList[i] = data;
        }
        console.log(quizList);
        res.json({
            status: 'success',
            QuizeList: quizList,
        });
    } else {
        res.json({
            status: 'error',
            message: 'Empty quizes',
        });
    }
};
exports.getQuizByid = async (id) => {
    let questionList = [];

    let questions = await db.question.findAll({ where: { quiz_id: id }, order: [['serial_no', 'ASC']] });
    //console.log(questions);
    if (questions === null) {
        console.log('Not found!');
    } else {
        questions = JSON.parse(JSON.stringify(questions));
       // console.log(questions);

        for (let i = 0; i < questions.length; i++) {
            let data = {};
            // data['quiz_id'] = questions[i].quiz_id;
            data['question_id'] = questions[i].question_id;
            data['question_type'] = questions[i].question_type;
            data['question_statement'] = questions[i].question_statement;
            data['question_timer'] = questions[i].question_timer;
            data['correct_option'] = questions[i].correct_option;
            data['max_points'] = questions[i].max_points;
            data['diffculty'] = questions[i].diffculty;
            data['serial_no'] = questions[i].serial_no;
            data['question_image'] = questions[i].question_image;
            data['is_done']=false;
            data['options'] = [];
            const options = await db.options.findAll({
                where: { question_id: questions[i].question_id },
            });

            for (let j = 0; j < options.length; j++) {
                //option_idquestion_idoption_statementserial_no
                //option={};
                // option[" option_id"]=options[j]
                 options1 = JSON.parse(JSON.stringify(options[j]));
                
                data['options'].push(options1);
            }
            //console.log('inserttedobject',data);
            questionList.push(data);
        }
    }
    return questionList;
};
