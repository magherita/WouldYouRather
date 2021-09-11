import {
    showLoading,
    hideLoading
} from "react-redux-loading";

import { initState } from "../utils/api";
import { setUsers } from "./users";
import { setQuestions } from "./questions";

export const handleInitState = () => (dispatch) => {
    dispatch(showLoading());

    return initState()
        .then(({ questions, users }) => {
            dispatch(setUsers(users));
            dispatch(setQuestions(questions));
            dispatch(hideLoading());
        });
};