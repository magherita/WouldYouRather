import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";

import {
    makeStyles,
    useTheme
} from "@material-ui/core/styles";
import {
    AppBar,
    Tabs,
    Tab,
    Paper
} from "@material-ui/core";

import Question from "./Question";
import { getUserAnsweredQuestionIds } from "../utils/helpers";


const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Paper>{children}</Paper>
            )}
        </div>
    );
};

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

const a11yProps = (index) => {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
};

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
    },
    text: {
        textTransform: 'capitalize',
    }
}));

const QuestionTabs = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    const { answeredIds, unansweredIds } = props;

    const handleChange = (_, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                >
                    <Tab className={classes.text} label="Unanswered" {...a11yProps(0)} />
                    <Tab className={classes.text} label="Answered" {...a11yProps(1)} />
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <TabPanel value={value} index={0} dir={theme.direction}>
                    {
                        Array.isArray(unansweredIds)
                        &&
                        unansweredIds.map((id) => (
                            <Question key={id} id={id} />
                        ))
                    }
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    {
                        Array.isArray(answeredIds)
                        &&
                        answeredIds.map((id) => (
                            <Question key={id} id={id} />
                        ))
                    }
                </TabPanel>
            </SwipeableViews>
        </div>
    );
};

const mapStateToProps = ({ authedUser, questions }) => {
    const answeredIds = getUserAnsweredQuestionIds(questions, authedUser);

    const unansweredIds = Object.values(questions)
        .sort((a, b) => b.timestamp - a.timestamp)
        .filter(q => !answeredIds.includes(q.id))
        .map(q => q.id);

    return {
        answeredIds,
        unansweredIds,
    };
};

export default connect(mapStateToProps)(QuestionTabs);
