// Core
import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router";

// Instruments
import { book } from "./book";

// Containers
import {
  Feed,
  Questionnaire,
  NewPassword,
  UpdateEmail,
  PasswordVerification
} from "../pages";

export class Private extends Component {
  componentDidMount() {}

  render() {
    return (
      <Switch>
        {/* <Route
                    exact
                    component = { Feed }
                    path = { book.feed }
                /> */}
        <Route exact component={Questionnaire} path={book.questionnaire} />
        <Route exact component={NewPassword} path={book.newPassword} />
        <Route exact component={UpdateEmail} path={book.updateEmail} />
        <Route
          exact
          component={PasswordVerification}
          path={book.passwordVerification}
        />
        <Redirect to={book.questionnaire} />
      </Switch>
    );
  }
}
