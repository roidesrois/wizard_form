// Core
import React, { Component } from "react";

// Components
import { Catcher, Spinner, Header, Notification } from "../components";
import { Questionnaire } from "../components/Questionnaire";

export class Feed extends Component {
  render() {
    return (
      <Catcher>
        <Spinner />
        <Header />
        <Questionnaire />
        <Notification />
      </Catcher>
    );
  }
}
