import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import {
    Card,
    CardHeader,
    CardContent,
    Button,
    FormControl,
    Typography,
    OutlinedInput,
    InputAdornment
} from "@material-ui/core";

import { handleAddQuestion } from "../actions/questions";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
    formControl: {
        margin: theme.spacing(0.5, 0, 0.5, 0),
        padding: theme.spacing(0.5),
    },
    btn: {
        textTransform: 'capitalize',
        margin: theme.spacing(1, 1, 0, 0),
    },
}));

const AddQuestion = (props) => {
    const classes = useStyles();
    const { dispatch, history } = props;
    const [optionOne, setOptionOne] = React.useState("");
    const [optionTwo, setOptionTwo] = React.useState("");

    const handleOptionOneChange = (event) => setOptionOne(event.target.value);

    const handleOptionTwoChange = (event) => setOptionTwo(event.target.value);

    const handleSubmit = (event) => {
        event.preventDefault();

        dispatch(handleAddQuestion(optionOne, optionTwo));

        history.push("/");
    };

    return (
        <Card className={classes.root}>
            <CardHeader
                title="Add question"
                subheader="Complete the question below"
            />
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <FormControl className={classes.formControl}>
                        <Typography variant="subtitle1">
                            Would you rather...
                        </Typography>
                    </FormControl>
                    <FormControl
                        fullWidth
                        className={classes.formControl}
                        variant="outlined"
                    >
                        <OutlinedInput
                            value={optionOne}
                            placeholder="Option one"
                            onChange={handleOptionOneChange}
                            endAdornment={<InputAdornment position="end">?</InputAdornment>}
                        />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <Typography variant="subtitle2">
                            OR
                        </Typography>
                    </FormControl>
                    <FormControl
                        fullWidth
                        className={classes.formControl}
                        variant="outlined"
                    >
                        <OutlinedInput
                            value={optionTwo}
                            placeholder="Option two"
                            onChange={handleOptionTwoChange}
                            endAdornment={<InputAdornment position="end">?</InputAdornment>}
                        />
                    </FormControl>
                    <FormControl
                        fullWidth
                        className={classes.formControl}
                    >
                        <Button
                            type="submit"
                            variant="outlined"
                            color="primary"
                            className={classes.btn}
                            disabled={optionOne === "" || optionTwo === ""}
                        >
                            Add
                        </Button>
                    </FormControl>
                </form>
            </CardContent>
        </Card>
    );
};

export default withRouter(connect()(AddQuestion));

