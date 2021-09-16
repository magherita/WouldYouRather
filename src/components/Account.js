import React from "react";
import { connect } from "react-redux";

import {
    Typography,
    Avatar,
    Menu,
    MenuItem,
    IconButton
} from '@material-ui/core';

import { handleRemoveAuthUser } from "../actions/authedUser";

import Login from "./Login";

const Account = (props) => {
    const { user, exists, dispatch } = props;

    const [anchorElement, setAnchorElement] = React.useState(null);
    const open = Boolean(anchorElement);

    const handleSignOut = () => {
        dispatch(handleRemoveAuthUser(user.id));
    };

    const handleMenu = (event) => {
        setAnchorElement(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorElement(null);
    };

    return (
        <React.Fragment>
            {
                exists
                    ?
                    <React.Fragment>
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="false"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <Typography>Hi <strong>{user.name}</strong></Typography>
                            <Avatar
                                alt={user.name}
                                src={user.avatarURL}
                            />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElement}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={open}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
                        </Menu>
                    </React.Fragment>
                    :
                    <Login />
            }
        </React.Fragment>
    );
};

const mapStateToProps = ({ authedUser, users }) => {
    return {
        user: users[authedUser],
        exists: Object.keys(users).includes(authedUser)
    };
};

export default connect(mapStateToProps)(Account);