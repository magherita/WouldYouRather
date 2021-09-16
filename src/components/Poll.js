import React from "react";
import { connect } from "react-redux";

import UnansweredQuestion from "./UnansweredQuestion";
import AnsweredQuestion from "./AnsweredQuestion";
import { getUserAnsweredQuestionIds } from "../utils/helpers";

import NotFound from "./NotFound";

const Poll = (props) => {
    const { id, answered, exists } = props;

    return (
        <React.Fragment>
            {
                exists
                    ?
                    <React.Fragment>
                        {
                            answered
                                ?
                                <AnsweredQuestion id={id} />
                                :
                                <UnansweredQuestion id={id} />
                        }
                    </React.Fragment>
                    :
                    <NotFound />
            }
        </React.Fragment>
    );
};

const mapStateToProps = ({ authedUser, questions }, props) => {
    const { id } = props.match.params;
    const answeredIds = getUserAnsweredQuestionIds(questions, authedUser);

    return {
        id,
        answered: answeredIds.includes(id),
        exists: Object.keys(questions).includes(id)
    }
};

export default connect(mapStateToProps)(Poll);