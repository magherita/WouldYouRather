import React, { useState } from "react";
import { connect } from "react-redux";

import {
    makeStyles
} from "@material-ui/core/styles";
import {
    Box,
    Card,
    CardContent,
    CardMedia,
    Button,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from "@material-ui/core";

import { handleSetAuthUser } from "../actions/authedUser";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: 8,
        marginTop: 50,
        marginBottom: 50,
        display: 'flex',
        justifyContent: 'center',
        width: 550,
        flex: '1 0 auto',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
    logo: {
        margin: 10,
        width: 50,
        flex: '1 0 auto',
    },
    formControl: {
        margin: theme.spacing(3),
        minWidth: 200,
    },
    button: {
        padding: 8,
        marginTop: 30,
    }
}));

const Login = (props) => {
    const classes = useStyles();
    const [selectedUser, setSelectedUser] = useState("none");
    const { users, dispatch } = props;

    const handleChange = (evt) => setSelectedUser(evt.target.value);

    const handleSubmit = (evt) => {
        evt.preventDefault();

        dispatch(handleSetAuthUser(selectedUser));
    };

    return (
        <Box>
            <Card className={classes.root}>
                <div className={classes.details}>
                    <CardContent className={classes.content}>
                        <Typography component="h5" variant="h5">
                            Sign in
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <FormControl
                                variant="outlined"
                                className={classes.formControl}
                            >
                                <InputLabel id="user-dropdown-label">User</InputLabel>
                                <Select
                                    id="user-dropdown"
                                    labelId="user-dropdown-label"
                                    label="User"
                                    value={selectedUser}
                                    onChange={handleChange}
                                    color="primary"
                                >
                                    <MenuItem
                                        key="none"
                                        value="none"
                                    >
                                        None
                                    </MenuItem>
                                    {
                                        users
                                        &&
                                        Object.values(users).map((user) => (
                                            <MenuItem
                                                key={user.id}
                                                value={user.id}
                                            >
                                                {user.name}
                                            </MenuItem>
                                        ))
                                    }
                                </Select>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    type="submit"
                                    disabled={selectedUser === "none"}
                                    className={classes.button}
                                >
                                    Sign in
                                </Button>
                            </FormControl>
                        </form>
                    </CardContent>
                </div>
                <CardMedia
                    className={classes.logo}
                    image="/logo/logo.jpg"
                    title="would you rather logo"
                />
            </Card>
        </Box >
    );
};

const mapStateToProps = ({ users }) => {
    return {
        users
    };
}

export default connect(mapStateToProps)(Login);

