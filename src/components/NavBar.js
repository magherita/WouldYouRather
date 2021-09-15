import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import { makeStyles } from '@material-ui/core/styles';
import {
    AppBar,
    Toolbar,
    IconButton
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import Account from "./Account";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginBottom: theme.spacing(10)
    },
    active: {
        fontWeight: 'bold',
    },
    menu: {
        textDecoration: 'none',
        color: 'white',
        fontSize: 16
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    account: {
        marginLeft: 'auto',
    }
}));

const NavBar = (props) => {
    const { authedUser } = props;
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar
                position="fixed"
                color="primary"
            >
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="menu"
                    >
                        <MenuIcon />
                    </IconButton>
                    <IconButton
                        color="inherit"
                    >
                        <NavLink
                            to="/"
                            exact
                            activeClassName={classes.active}
                            className={classes.menu}
                        >
                            Home
                        </NavLink>
                    </IconButton>
                    <IconButton
                        color="inherit"
                    >
                        <NavLink
                            to="/add"
                            activeClassName={classes.active}
                            className={classes.menu}
                        >
                            New Question
                        </NavLink>
                    </IconButton>
                    <IconButton
                        color="inherit"
                    >
                        <NavLink
                            to="/leaderboard"
                            activeClassName={classes.active}
                            className={classes.menu}
                        >
                            Leader Board
                        </NavLink>
                    </IconButton>
                    {
                        authedUser !== "none"
                        &&
                        (
                            <span className={classes.account}>
                                <Account />
                            </span>
                        )
                    }
                </Toolbar>
            </AppBar>
        </div>
    );
};

const mapStateToProps = ({ authedUser }) => {
    return {
        authedUser
    };
};

export default connect(mapStateToProps)(NavBar);
