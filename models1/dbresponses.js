const db = require('../models/index');
const { Question } = require('./class');

exports.insert_response = async (response) => {
    let response1 = await db.responses.create({
        response_id: response.response_id,
        participant_id: response.participant_id,
        quiz_id: response.quiz_id,
        option_id: response.option_id,
        question_id: response.question_id,
        response_statement: response.response_statement,
        response_time: response.response_time,
        is_correct : response.is_correct
    });
};
