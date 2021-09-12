import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import { LoadingBar } from "react-redux-loading";

import { handleInitState } from "../actions/shared";

import {
  CssBaseline,
  Container
} from "@material-ui/core";

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
    const { unauthorized } = this.props;

    return (
      <BrowserRouter>
        <React.Fragment>
          <CssBaseline />
          <LoadingBar />
          <Container fixed>
            {
              unauthorized === true
                ?
                <Login />
                :
                <div>
                  <NavBar />
                  <Route path="/" exact component={Home} />
                  <Route path="/add" exact component={NewQuestion} />
                  <Route path="/leaderboard" exact component={LeaderBoard} />
                </div>
            }
          </Container >
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = ({ authedUser }) => {
  return {
    unauthorized: authedUser === "none"
  }
};

export default connect(mapStateToProps)(App);
