const db = require('../models/index');
const fs = require('fs');

module.exports.editQuestion = async(req, res) => {

    try {
        quiz_id = req.session.quizzid.quiz_id;
        correct_option = req.body.correct_option;
        // console.log('cname = ' + req.body.cat)
        let question_id = await getQuestionId(quiz_id, req.body.serial_no);
        let Qid = await db.question.findByPk(question_id);
        if (req.body.question_type === "Fillup" || req.body.question_type === "Pooling") {
            correct_option = 0;
        }
        // console.log(Qid);
         obj =req.body.question_image;

        // if (req.body.tags) {
        //     console.log("tags = " + req.body.tags);
        //     await insertTags(req.body.tags, Qid.question_id);
        // }

        console.log(Qid);
        if (Qid) {
            Qid.quiz_id = quiz_id,
                Qid.question_type = req.body.question_type,
                Qid.question_statement = req.body.question_statement,
                Qid.serial_no = req.body.serial_no,
                Qid.difficulty = req.body.difficulty,
                Qid.question_timer = req.body.question_timer,
                Qid.correct_option = correct_option,
                Qid.max_points = req.body.max_points,
                Qid.question_image = obj

        } else {
            return false;
        }
        console.log("Editing Question");
        let save = await Qid.save();

        //console.log(save);
        if (save) {
            await editOptions(req.body.options, Qid.question_id);
            //console.log(save);
            res.json({
                status: true,
                data: save
            })
        } else {
            res.json({
                status: false
            })
        }

    } catch (err) {
        console.log("===================Failed============================");
        console.log(err);

        res.json({
            status: false
        })
        throw err;
    }
}

async function editOptions(option_state, Qid) {
    try {

        console.log("options = " + option_state);
        option_state = JSON.parse(JSON.stringify(option_state));
        for (let i = 0; i < option_state.length; i++) {
            console.log("option state = " + option_state[i].statement);
            const option = await db.options.findOne({
                where: {
                    serial_no: option_state[i].serial_no,
                    question_id: Qid
                }
            });
            console.log("option = " + JSON.stringify(option));
            if (option) {
                option.option_statement = option_state[i].statement;


            }
            await option.save();
        }
        return;
    } catch (err) {
        console.log(err);
    }
}
async function getQuestionId(qid, srno) {
    try {
        const question = await db.question.findOne({
            where: {
                quiz_id: qid,
                serial_no: srno
            }
        })
        return question.question_id;
    } catch (err) {
        console.log(err);
    }
}


// async function insertTags(tags, Qid) {
//     try {
//         let createTags;
//         let saveTag;
//         console.log("Qid = " + Qid);
//         let QtagId = await db.question_tag.findAll({
//             attributes: ['tag_id'],
//             where: {
//                 question_id: Qid,

//             }
//         });
//         console.log("Qtagid = " + JSON.stringify(QtagId));
//         // for(let i=0;i<tags.length;i++){
//         //     console.log(tags[i]);


//         //   if(QtagId){
//         //         let tag =  await db.tags.findOne({

//         //             where: { tag_name: tags[i]}
//         //         });
//         //         if(tag){
//         //             tag.tag_name = tags[i];
//         //             saveTag = await tag.save();
//         //         }

//         //       }else{
//         //         const [t, created] = await db.tags.findOrCreate({

//         //             where: { tag_name:tags[i]}
//         //         })

//         //        await db.question_tag.findOne({
//         //             where: {
//         //             tag_id:t.tag_id,
//         //             question_id : Qid
//         //             }
//         //     });

//         //     }



//         // }
//         return true;

//     } catch (err) {
//         console.log(err);
//         return false;
//     }
// }

// async function mergeQuestionTags(tags, Qid) {
//     try {
//         console.log("tags[0] = " + tags[0]);
//         for (let i = 0; i < tags.length; i++) {
//             console.log(tags[i]);
//             const t = await db.tags.findOne({

//                 where: { tag_name: tags[i] }
//             })
//             console.log("tag id = " + t.tag_id);
//             console.log("tag name = " + t.tag_iname);

//             db.question_tag.findOrCreate({
//                 where: {
//                     tag_id: t.tag_id,
//                     question_id: Qid
//                 }
//             });
//         }
//         return;

//     } catch (err) {
//         console.log(err);

//     }
// }

async function isQuestionExist(statement, quizId) {

    try {
        let data = await db.question.findOne({
            where: {
                quiz_id: quizId,
                question_statement: statement

            }
        });
        console.log("Exist or Not = " + data);
        if (data === null) return false;
        else return true;
    } catch {
        (err) => {
            res.status(500).send({
                message: 'Error adding question ',
            });
        };
    }
}