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
    Avatar
} from "@material-ui/core";
import { formatDate } from "../utils/helpers";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(2),
        padding: theme.spacing(2),
    },
    btn: {
        textTransform: 'capitalize'
    },
    result: {
        margin: theme.spacing(2, 2, 2, 0),
        padding: theme.spacing(2),
        border: '1px solid rgba(0, 0, 0, 0.29)',
        borderRadius: 6,
    },
    voted: {
        color: '#4FC879',
    }
}));

const AnsweredQuestion = (props) => {
    const classes = useStyles();
    const { question, author } = props;

    const formattedDate = formatDate(question.timestamp);

    const optionOneVotes = question.optionOne.votes.length;
    const optionTwoVotes = question.optionTwo.votes.length;
    const totalVotes = optionOneVotes + optionTwoVotes;

    const optionOnePercentVote = Math.round(((optionOneVotes / totalVotes) * 100));
    const optionTwoPercentVote = Math.round(((optionTwoVotes / totalVotes) * 100));

    const votedOptionOne = question.optionOne.votes.includes(author.id);
    const votedOptionTwo = question.optionTwo.votes.includes(author.id);

    // styles
    const containerStyles = {
        height: 20,
        width: '100%',
        backgroundColor: "#a7c7e7",
        borderRadius: 50,
        margin: 2
    }

    const labelStyles = {
        padding: 8,
        color: 'white',
        fontWeight: 'bold'
    }

    const optionOnePollStatsStyles = {
        height: '100%',
        width: `${optionOnePercentVote}%`,
        backgroundColor: '#4169e1',
        borderRadius: 'inherit',
        textAlign: 'right'
    };

    const optionTwoPollStatsStyles = {
        height: '100%',
        width: `${optionTwoPercentVote}%`,
        backgroundColor: '#4169e1',
        borderRadius: 'inherit',
        textAlign: 'right'
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
                    Results
                </Typography>
                <CardContent className={classes.result}>
                    <span className={votedOptionOne ? classes.voted : ""}>
                        <Typography variant="subtitle1">
                            {`Would you rather ${question.optionOne.text}?`}
                        </Typography>

                        <div style={containerStyles}>
                            <div style={optionOnePollStatsStyles}>
                                <span style={labelStyles}>{`${optionOnePercentVote}%`}</span>
                            </div>
                        </div>

                        <Typography variant="subtitle2">
                            {`${optionOneVotes} out of ${totalVotes} votes`}
                        </Typography>
                    </span>
                </CardContent>
                <CardContent className={classes.result}>
                    <span className={votedOptionTwo ? classes.voted : ""}>
                        <Typography variant="subtitle1">
                            {`Would you rather ${question.optionTwo.text}?`}
                        </Typography>

                        <div style={containerStyles}>
                            <div style={optionTwoPollStatsStyles}>
                                <span style={labelStyles}>{`${optionTwoPercentVote}%`}</span>
                            </div>
                        </div>

                        <Typography variant="subtitle2">
                            {`${optionTwoVotes} out of ${totalVotes} votes`}
                        </Typography>
                    </span>
                </CardContent>
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

export default connect(mapStateToProps)(AnsweredQuestion);