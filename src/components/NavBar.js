import React from "react";
import { NavLink } from "react-router-dom";

import {
    Image
} from "react-bootstrap";

const NavBar = (props) => {
    const { user } = props;

    return (
        <nav className="nav">
            <ul>
                <li>
                    <NavLink to="/" exact activeClassName="active">
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/add" activeClassName="active">
                        New Question
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/leaderboard" activeClassName="active">
                        Leader Board
                    </NavLink>
                </li>
                {
                    user
                    &&
                    (
                        <li>
                            <Image
                                src={user.avatarURL}
                                alt={`Avatar of ${user.name}`}
                                roundedCircle
                            />
                        </li>
                    )
                }
            </ul>
        </nav>
    );
};

export default NavBar;
