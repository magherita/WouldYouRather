import {
    showLoading,
    hideLoading
} from "react-redux-loading";

import { initState } from "../utils/api";
import { setUsers } from "./users";
import { setQuestions } from "./questions";
import { setAuthUser } from "./authedUser";
import { getSignedInUser } from "../utils/helpers";

export const handleInitState = () => (dispatch) => {
    dispatch(showLoading());

    return initState()
        .then(({ questions, users }) => {
            dispatch(setUsers(users));
            dispatch(setQuestions(questions));
        })
        .then(() => {
            // load signed in user from localstorage in case there is any
            // done after users are loaded
            const signedInUser = getSignedInUser();

            dispatch(setAuthUser(signedInUser));
        })
        .then(() => dispatch(hideLoading()));
};