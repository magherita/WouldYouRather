import React, { useState } from "react";
import { connect } from "react-redux";

import Question from "./Question";
import QuestionTabs from "./QuestionTabs";

import {
    makeStyles
} from "@material-ui/core/styles";
import {
    Card,
    CardContent,
    ButtonGroup,
    Button,
    Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    buttons: {
        display: 'flex',
        alignItems: 'center'
    },
    btn: {
        // margin: theme.spacing(2),
        textTransform: 'capitalize',
    }
}));

const Home = (props) => {
    const classes = useStyles();
    const { answeredIds, unansweredIds } = props;
    const [unanswered, setUnanswered] = useState(true);
    const [answered, setAnswered] = useState(false);

    const handleUnansweredQuestionsClick = () => {
        setUnanswered(!unanswered);
    };

    const handleAnsweredQuestionsClick = () => {
        setAnswered(!answered);
    };

    return (
        <div>
            <div className={classes.buttons}>
                <ButtonGroup
                    variant="text"
                >
                    <Button
                        color="secondary"
                        disabled={!Array.isArray(unansweredIds)}
                        className={classes.btn}
                        onClick={handleUnansweredQuestionsClick}
                    >
                        Unanswered Questions
                    </Button>
                    <Button
                        color="primary"
                        disabled={!Array.isArray(answeredIds)}
                        className={classes.btn}
                        onClick={handleAnsweredQuestionsClick}
                    >
                        Answered Questions
                    </Button>

                    {
                        unanswered
                        &&
                        unansweredIds.map((id) => (
                            <Question id={id} />
                        ))
                    }

                    {
                        answered
                        &&
                        answeredIds.map((id) => (
                            <Question id={id} />
                        ))
                    }
                </ButtonGroup>
            </div>
            <QuestionTabs />
        </div>
    );
};

const mapStateToProps = ({ authedUser, questions }) => {
    let optionOneAnsweredQuestions = Object.values(questions)
        .filter(q => q.optionOne.votes.includes(authedUser));

    let optionTwoAnsweredQuestions = Object.values(questions)
        .filter(q => q.optionTwo.votes.includes(authedUser));

    let totalAnsweredQuestions = optionOneAnsweredQuestions.concat(optionTwoAnsweredQuestions);

    let answeredIds = totalAnsweredQuestions
        // .sort((a, b) => totalAnsweredQuestions[b].timestamp - totalAnsweredQuestions[a].timestamp)
        .map(q => q.id);

    let unansweredIds = Object.values(questions)
        // .sort((a, b) => questions[a].timestamp - questions[b].timestamp)
        .filter(q => !answeredIds.includes(q.id))
        .map(q => q.id);

    return {
        answeredIds,
        unansweredIds,
    };
};

export default connect(mapStateToProps)(Home);

