import React from "react";
import { connect } from "react-redux";

import UnansweredQuestion from "./UnansweredQuestion";
import AnsweredQuestion from "./AnsweredQuestion";

const Poll = (props) => {
    const { id, answered } = props;

    return (
        <div>
            {
                answered === true
                    ?
                    <AnsweredQuestion id={id} />
                    :
                    <UnansweredQuestion id={id} />
            }
        </div>
    );
};

const mapStateToProps = ({ authedUser, users }, props) => {
    const { id } = props.match.params;
    const answeredIds = Object.keys(users[authedUser].answers);

    return {
        id,
        answered: answeredIds.includes(id)
    }
};

export default connect(mapStateToProps)(Poll);