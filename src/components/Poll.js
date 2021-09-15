import React from "react";
import { connect } from "react-redux";

import UnansweredQuestion from "./UnansweredQuestion";
import AnsweredQuestion from "./AnsweredQuestion";
import { getUserAnsweredQuestionIds } from "../utils/helpers";

const Poll = (props) => {
    const { id, answered } = props;

    return (
        <div>
            {
                answered
                    ?
                    <AnsweredQuestion id={id} />
                    :
                    <UnansweredQuestion id={id} />
            }
        </div>
    );
};

const mapStateToProps = ({ authedUser, questions }, props) => {
    const { id } = props.match.params;
    const answeredIds = getUserAnsweredQuestionIds(questions, authedUser);

    return {
        id,
        answered: answeredIds.includes(id)
    }
};

export default connect(mapStateToProps)(Poll);