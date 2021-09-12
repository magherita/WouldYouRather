import React from "react";
import { connect } from "react-redux";

import {
    makeStyles
} from "@material-ui/core/styles";
import {
    Card,
    CardHeader,
    CardContent,
    Typography,
    Avatar,
    CardActions,
    Button
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(2),
        padding: theme.spacing(4),
    },
    btn: {
        textTransform: 'capitalize'
    }
}));

const Question = (props) => {
    const classes = useStyles();
    const { question, author } = props;

    const date = new Date(question.timestamp);
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

    return (
        <Card className={classes.root}>
            <CardHeader
                title={`${author.name} asks`}
                subheader={formattedDate}
                avatar={
                    <Avatar
                        alt={author.name}
                        src={author.avatarURL}
                    />
                }
            />
            <CardContent>
                <Typography component="h6" variant="h6">
                    Would you rather
                </Typography>
                <Typography variant="body2" component="p">
                    {`${question.optionOne.text}...`}
                </Typography>
            </CardContent>
            <CardActions>
                <Button
                    size="small"
                    variant="outlined"
                    color="primary"
                    className={classes.btn}
                >
                    View Poll
                </Button>
            </CardActions>
        </Card>
    );
}

const mapStateToProps = ({ questions, users }, { id }) => {
    return {
        question: questions[id],
        author: users[questions[id].author]
    };
}

export default connect(mapStateToProps)(Question);