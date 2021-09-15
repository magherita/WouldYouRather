import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

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
import { formatDate } from "../utils/helpers";

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
    const { question, author, history } = props;

    const formattedDate = formatDate(question.timestamp);

    const toPoll = (event, id) => {
        event.preventDefault();

        history.push(`/questions/${id}`);
    };

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
                    onClick={(event) => toPoll(event, question.id)}
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

export default withRouter(connect(mapStateToProps)(Question));