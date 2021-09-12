import React from "react";
import { connect } from "react-redux";

import { makeStyles } from '@material-ui/core/styles';
import {
    Typography,
    Avatar
} from '@material-ui/core';

import { handleRemoveAuthUser } from "../actions/authedUser";

const useStyles = makeStyles((theme) => ({
    btn: {
        textTransform: 'sentencecase',
        marginLeft: theme.spacing(17),
        padding: theme.spacing(1),
        border: '1px solid rgba(0, 0, 0, 0.29)',
        borderRadius: 6,
        cursor: 'pointer',
        background: '#fff',
        fontSize: 14,
        position: 'relative',
    },
    content: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(1),
        height: 17,
        paddingLeft: theme.spacing(50),
    },
    avatar: {
        margin: theme.spacing(1),
    }
}));

const Logout = (props) => {
    const { user, dispatch } = props;
    const classes = useStyles();

    const handleClick = () => dispatch(handleRemoveAuthUser(user.id));

    return (
        <div className={classes.content}>
            <Typography>Hi <strong>{user.name}</strong></Typography>
            <Avatar
                alt={user.name}
                src={user.avatarURL}
                className={classes.avatar}
            />
            <button
                className={classes.btn}
                onClick={handleClick}
            >
                Logout
            </button>
        </div>
    );
};

const mapStateToProps = ({ authedUser, users }) => {
    return {
        user: users[authedUser]
    };
};

export default connect(mapStateToProps)(Logout);