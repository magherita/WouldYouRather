import {
    showLoading,
    hideLoading
} from "react-redux-loading";

export const SET_AUTH_USER = "SET_AUTH_USER";

export const setAuthUser = (authedUser) => {
    return {
        type: SET_AUTH_USER,
        authedUser
    };
};

export const handleSetAuthUser = (authedUser) => (dispatch) => {
    dispatch(showLoading());

    dispatch(setAuthUser(authedUser));

    // add to localstorage so that when 
    // a page is refreshed the signed in user is not lost
    localStorage.setItem("authedUser", authedUser);

    dispatch(hideLoading());
};

export const REMOVE_AUTH_USER = "REMOVE_AUTH_USER";

export const removeAuthUser = () => {
    return {
        type: REMOVE_AUTH_USER,
        authedUser: "none"
    }
};

export const handleRemoveAuthUser = () => (dispatch) => {
    dispatch(showLoading());

    dispatch(removeAuthUser());

    // set signed in user to 'none' on sign out
    localStorage.setItem("authedUser", "none");

    dispatch(hideLoading());
};