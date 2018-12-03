// Core
import React, { Component } from "react";
import { connect } from "react-redux";

// Instruments
import Styles from "./styles.m.css";

const mapState = state => {
  return {
    isFetching: state.ui.get("isFetching")
  };
};

@connect(mapState)
export class Spinner extends Component {
  render() {
    const { isFetching } = this.props;

    return isFetching ? <div className={Styles.spinner} /> : null;
  }
}
