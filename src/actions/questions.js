import {
    showLoading,
    hideLoading
} from "react-redux-loading";
import { saveQuestion, saveQuestionAnswer } from "../utils/api";

export const SET_QUESTIONS = "SET_QUESTIONS";

export const setQuestions = (questions) => {
    return {
        type: SET_QUESTIONS,
        questions
    };
};

export const ADD_QUESTION = "ADD_QUESTION";

export const addQuestion = (question) => {
    return {
        type: ADD_QUESTION,
        question
    };
};

export const handleAddQuestion = (optionOneText, optionTwoText) => (dispatch, getState) => {
    dispatch(showLoading());

    const { authedUser } = getState();

    return saveQuestion({
        optionOneText,
        optionTwoText,
        author: authedUser
    })
        .then((question) => dispatch(addQuestion(question)))
        .then(() => dispatch(hideLoading()));
};

export const ADD_QUESTION_ANSWER = "ADD_QUESTION_ANSWER";

export const addQuestionAnswer = ({ authedUser, qid, answer }) => {
    return {
        type: ADD_QUESTION_ANSWER,
        authedUser,
        qid,
        answer
    };
};

export const handleAddQuestionAnswer = (questionId, answer) => (dispatch, getState) => {
    dispatch(showLoading());

    const { authedUser } = getState();

    let questionAnswer = {
        authedUser,
        qid: questionId,
        answer
    };

    return saveQuestionAnswer(questionAnswer)
        .then(() => dispatch(addQuestionAnswer(questionAnswer)))
        .then(() => dispatch(hideLoading()));
};