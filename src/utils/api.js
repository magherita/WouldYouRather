import {
    _getQuestions,
    _getUsers,
    _saveQuestion,
    _saveQuestionAnswer
} from "./_DATA";

export const initState = () => {
    return Promise.all([
        _getQuestions(),
        _getUsers()
    ]).then(([questions, users]) => ({
        questions,
        users
    }));
};

export const saveQuestion = (question) => {
    return _saveQuestion(question);
};

export const saveQuestionAnswer = (info) => {
    return _saveQuestionAnswer(info);
};