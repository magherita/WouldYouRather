import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import { LoadingBar } from "react-redux-loading";

import { handleInitState } from "../actions/shared";

import {
  Container,
  Row,
  Col
} from "react-bootstrap";

import Login from "./Login";
import NavBar from "./NavBar";
import Home from "./Home";
import NewQuestion from "./NewQuestion";
import LeaderBoard from "./LeaderBoard";

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(handleInitState());
  }

  render() {
    const { unauthorized, user } = this.props;

    return (
      <BrowserRouter>
        <React.Fragment>
          <LoadingBar />
          <Container fluid>
            <Row>
              <Col sm></Col>
              <Col sm>
                {
                  unauthorized === true
                    ?
                    <Login />
                    :
                    <div>
                      <NavBar user={user} />
                      <Route path="/" exact component={Home} />
                      <Route path="/add" exact component={NewQuestion} />
                      <Route path="/leaderboard" exact component={LeaderBoard} />
                    </div>
                }
              </Col>
              <Col sm></Col>
            </Row>
          </Container >
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = ({ authedUser, users }) => {
  return {
    unauthorized: authedUser === "none",
    user: users[authedUser],
    users
  }
};

export default connect(mapStateToProps)(App);
