import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import { makeStyles } from '@material-ui/core/styles';
import {
    Box
} from '@material-ui/core';

import Logout from "./Logout";

const useStyles = makeStyles((_) => ({
    root: {
        margin: 0,
    },
    active: {
        fontWeight: 'bold',
    },
    nav: {
        '& ul': {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            textDecoration: 'none',
            paddingLeft: 0,
        },
        '& li:first-child': {
            paddingLeft: 0,
        },
        '& li': {
            listStyleType: 'none',
            padding: 10,
            textDecoration: 'none',
        },
        '& a': {
            textDecoration: 'none',
            color: '#252525',
        },
    },
    btn: {
        textTransform: 'sentencecase',
        margin: '35 auto',
        padding: 10,
        border: '1px solid rgba(0, 0, 0, 0.29)',
        cursor: 'pointer',
        background: '#fff',
        fontSize: 14,
        width: 'auto',
        position: 'relative',
    }
}));

const NavBar = (props) => {
    const { authedUser } = props;
    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <nav className={classes.nav}>
                <ul>
                    <li>
                        <NavLink to="/" exact activeClassName={classes.active}>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/add" activeClassName={classes.active}>
                            New Question
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/leaderboard" activeClassName={classes.active}>
                            Leader Board
                        </NavLink>
                    </li>
                    {
                        authedUser !== "none"
                        &&
                        (
                            <li>
                                <Logout />
                            </li>
                        )
                    }
                </ul>
            </nav>
        </Box>
    );
};

const mapStateToProps = ({ authedUser }) => {
    return {
        authedUser
    };
};

export default connect(mapStateToProps)(NavBar);
