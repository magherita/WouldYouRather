import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import {
    Card,
    CardHeader,
    CardContent,
    Avatar,
    Button,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel
} from "@material-ui/core";
import { handleAddQuestionAnswer } from "../actions/questions";
import { formatDate } from "../utils/helpers";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(2),
        padding: theme.spacing(2),
    },
    formControl: {
        margin: theme.spacing(2),
    },
    btn: {
        textTransform: 'capitalize',
        margin: theme.spacing(1, 1, 0, 0),
    }
}));

const UnansweredQuestion = (props) => {
    const classes = useStyles();
    const { question, author, dispatch, history } = props;
    const formattedDate = formatDate(question.timestamp);

    const [answer, setAnswer] = React.useState("");

    const handleRadioChange = (event) => {
        setAnswer(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        dispatch(handleAddQuestionAnswer(question.id, answer));

        history.push(`/questions/${question.id}`);
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
                <form onSubmit={handleSubmit}>
                    <FormControl component="fieldset" className={classes.formControl}>
                        <FormLabel component="legend">Would you rather...</FormLabel>
                        <RadioGroup
                            aria-label="would-you-rather"
                            name="would-you-rather"
                            value={answer}
                            onChange={handleRadioChange}
                        >
                            <FormControlLabel
                                value="optionOne"
                                control={<Radio />}
                                label={`${question.optionOne.text}?`}
                            />
                            <FormControlLabel
                                value="optionTwo"
                                control={<Radio />}
                                label={`${question.optionTwo.text}?`}
                            />
                        </RadioGroup>
                        <Button
                            type="submit"
                            variant="outlined"
                            color="primary"
                            className={classes.btn}
                            disabled={answer === ""}
                        >
                            Answer
                        </Button>
                    </FormControl>
                </form>
            </CardContent>
        </Card>
    );
};

const mapStateToProps = ({ questions, users }, { id }) => {
    return {
        question: questions[id],
        author: users[questions[id].author]
    };
};

export default withRouter(connect(mapStateToProps)(UnansweredQuestion));