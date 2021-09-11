import {
    SET_AUTH_USER,
    REMOVE_AUTH_USER
} from "../actions/authedUser";

const authedUser = (state = "none", action) => {
    switch (action.type) {
        case SET_AUTH_USER:
            return action.authedUser;

        case REMOVE_AUTH_USER:
            return action.authedUser;

        default:
            return state;
    }
};

export default authedUser;