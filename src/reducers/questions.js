import {
    SET_QUESTIONS,
    ADD_QUESTION,
    ADD_QUESTION_ANSWER
} from "../actions/questions";

const questions = (state = {}, action) => {
    switch (action.type) {
        case SET_QUESTIONS:
            return {
                ...state,
                ...action.questions
            };

        case ADD_QUESTION:
            const { question } = action;

            return {
                ...state,
                [question.id]: question
            };

        case ADD_QUESTION_ANSWER:
            const { authedUser, qid, answer } = action;

            let q = {
                ...state[qid],
                [answer]: {
                    ...state[qid][answer],
                    votes: state[qid][answer].votes.concat([authedUser])
                }
            };

            return {
                ...state,
                [qid]: q
            };

        default:
            return state;
    }
};

export default questions;