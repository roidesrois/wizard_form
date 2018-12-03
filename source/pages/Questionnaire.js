// Core
import React, { Component } from "react";

// Components
import {
  Catcher,
  Spinner,
  Header,
  QuestionnaireForm,
  Notification
} from "../components";

export class Questionnaire extends Component {
  render() {
    return (
      <Catcher>
        <Spinner />
        <Header />
        <QuestionnaireForm />
        <Notification />
      </Catcher>
    );
  }
}
