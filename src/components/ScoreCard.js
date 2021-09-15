import React from "react";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import {
    Card,
    CardHeader,
    CardContent,
    Typography,
    Avatar,
    CardActions,
    Divider
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        margin: theme.spacing(0.5, 0, 0.5, 0),
        padding: theme.spacing(2),
    },
    signedIn: {
        color: '#4FC879',
    }
}));

const ScoreCard = (props) => {
    const classes = useStyles();
    const {
        user,
        answered,
        asked,
        score,
        position,
        isSignedIn
    } = props;

    return (
        <Card className={classes.root}>
            <CardHeader
                title={user.name}
                subheader={`Rank: ${position}`}
                avatar={
                    <Avatar
                        alt={user.name}
                        src={user.avatarURL}
                    />
                }
                className={isSignedIn ? classes.signedIn : ""}
            />
            <Divider orientation="vertical" flexItem />
            <CardContent className={isSignedIn ? classes.signedIn : ""}>
                <Typography variant="body2">
                    Answered: {answered}
                </Typography>
                <Typography variant="body2">
                    Asked: {asked}
                </Typography>
            </CardContent>
            <Divider orientation="vertical" flexItem />
            <CardActions className={isSignedIn ? classes.signedIn : ""}>
                <Typography variant="body2">
                    Points: {score}
                </Typography>
            </CardActions>
        </Card>
    )
};

const mapStateToProps = ({ users, authedUser }, { userId, answered, asked, score, position }) => {
    return {
        user: users[userId],
        answered,
        asked,
        score,
        position,
        isSignedIn: userId === authedUser,
    };
};

export default connect(mapStateToProps)(ScoreCard);