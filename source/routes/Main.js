// Core
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { hot } from "react-hot-loader";

// Components
import { Loading } from "../components";

// Routes
import { Public } from "./Public";
import { Private } from "./Private";

// Actions
import { authActions } from "../bus/auth/actions";

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.get("isAuthenticated"),
    isInitialized: state.auth.get("isInitialized")
  };
};

const mapDispatchToProps = {
  initializeAsync: authActions.initializeAsync
};

@hot(module)
@withRouter
@connect(
  mapStateToProps,
  mapDispatchToProps
)
export class Main extends Component {
  componentDidMount() {
    const { initializeAsync } = this.props;

    initializeAsync();

    const token = localStorage.getItem("token");

    localStorage.clear();
    if (token) {
      localStorage.setItem("token", token);
    }
  }

  componentWillUnmount() {}

  render() {
    const { isAuthenticated, isInitialized } = this.props;

    if (!isInitialized) {
      return <Loading />;
    }

    return isAuthenticated ? <Private /> : <Public />;
  }
}
