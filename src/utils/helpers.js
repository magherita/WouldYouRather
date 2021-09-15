export const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

    return formattedDate;
};

export const checkSignIn = () => {
    return localStorage.getItem("authedUser") !== "none"
        &&
        localStorage.getItem("authedUser") !== null;
};

export const getSignedInUser = () => checkSignIn() ? localStorage.getItem("authedUser") : "none";

export const getUserAnsweredQuestionIds = (questions, user) => {
    const optionOneAnsweredQuestions = Object.values(questions)
        .filter(q => q.optionOne.votes.includes(user));

    const optionTwoAnsweredQuestions = Object.values(questions)
        .filter(q => q.optionTwo.votes.includes(user));

    let allAnsweredQuestions = optionOneAnsweredQuestions.concat(optionTwoAnsweredQuestions);

    return allAnsweredQuestions
        .sort((a, b) => b.timestamp - a.timestamp)
        .map(q => q.id);
};

export const getUserAuthoredQuestionIds = (questions, user) => {
    return Object.values(questions)
        .filter(q => q.author === user)
        .map(q => q.id);
};