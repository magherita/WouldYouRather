import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import LoadingBar from "react-redux-loading";

import { handleInitState } from "../actions/shared";

import {
  CssBaseline,
  Container
} from "@material-ui/core";

import Login from "./Login";
import NavBar from "./NavBar";
import Home from "./Home";
import NewQuestion from "./NewQuestion";
import Poll from "./Poll";
import LeaderBoard from "./LeaderBoard";

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(handleInitState());
  }

  render() {
    const { isSignedIn, isLoaded } = this.props;

    return (
      <BrowserRouter>
        <React.Fragment>
          <CssBaseline />
          <LoadingBar />
          <Container fixed>
            {
              isLoaded
              &&
              (
                <div>
                  {
                    isSignedIn
                      ?
                      (
                        <div>
                          <NavBar />
                          <Route path="/" exact component={Home} />
                          <Route path="/add" exact component={NewQuestion} />
                          <Route path="/questions/:id" exact component={Poll} />
                          <Route path="/leaderboard" exact component={LeaderBoard} />
                        </div>
                      )
                      :
                      <Login />
                  }
                </div>
              )
            }
          </Container >
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = ({ authedUser, users, questions }) => {
  const stateIsLoaded = Object.keys(users).length > 0
    &&
    Object.keys(questions).length > 0;

  return {
    isSignedIn: authedUser !== "none",
    isLoaded: stateIsLoaded
  };
};

export default connect(mapStateToProps)(App);
