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
    dispatch(hideLoading());
};