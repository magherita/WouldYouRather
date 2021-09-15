import React from "react";
import { connect } from "react-redux";

import {
    getUserAnsweredQuestionIds,
    getUserAuthoredQuestionIds
} from "../utils/helpers";


import ScoreCard from "./ScoreCard";

const LeaderBoard = (props) => {
    const { stats } = props;

    return (
        <div>
            {
                Array.isArray(stats)
                &&
                stats.map((stat, index) => (
                    <ScoreCard
                        key={stat.userId}
                        userId={stat.userId}
                        answered={stat.answered}
                        asked={stat.asked}
                        score={stat.score}
                        position={index + 1}
                    />
                ))
            }
        </div>
    );
};

const mapStateToProps = ({ users, questions }) => {
    const userStats = Object.keys(users).map(userId => {
        const answered = getUserAnsweredQuestionIds(questions, userId).length;
        const asked = getUserAuthoredQuestionIds(questions, userId).length;
        const score = answered + asked;

        return {
            userId,
            answered,
            asked,
            score,
        };
    });

    const stats = Object.values(userStats).sort((a, b) => b.score - a.score);

    return {
        stats
    };
};

export default connect(mapStateToProps)(LeaderBoard);

