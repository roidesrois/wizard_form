// Core
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import cx from "classnames";

// Actions
import { profileActions } from "../../bus/profile/actions";

// Instruments
import Styles from "./styles.m.css";
import { newPassword } from "../../bus/forms/shapes";
import { book } from "../../routes/book";

const mapState = state => {
  return {
    isFetching: state.ui.get("isFetching")
  };
};

const mapDispatch = {
  updatePasswordAsync: profileActions.updatePasswordAsync
};

@connect(
  mapState,
  mapDispatch
)
export class NewPasswordForm extends Component {
  _submitPassword = passwordData => {
    this.props.updatePasswordAsync(passwordData);
  };

  _getFormMarkup = formikProps => {
    const { isFetching } = this.props;
    const { isValid, touched, errors } = formikProps;

    const centeredWrapperStyle = cx(Styles.wrapper, Styles.centered, {
      [Styles.disabledInput]: isFetching
    });
    const oldPasswordStyle = cx({
      [Styles.invalidInput]:
        !isValid && touched.oldPassword && errors.oldPassword
    });
    const newPasswordStyle = cx({
      [Styles.invalidInput]:
        !isValid && touched.newPassword && errors.newPassword
    });
    const newPasswordConfirmStyle = cx({
      [Styles.invalidInput]:
        !isValid && touched.newPasswordConfirm && errors.newPasswordConfirm
    });

    const buttonStyle = cx(Styles.loginSubmit, {
      [Styles.disabledButton]: isFetching
    });
    const buttonMessage = isFetching ? "Loading..." : "Change password";

    return (
      <Form className={Styles.form}>
        <div className={centeredWrapperStyle}>
          <div>
            <Field
              className={oldPasswordStyle}
              disabled={isFetching}
              name="oldPassword"
              placeholder="Old password"
              type="password"
            />
            <Field
              className={newPasswordStyle}
              disabled={isFetching}
              name="newPassword"
              placeholder="New password"
              type="password"
            />
            <Field
              className={newPasswordConfirmStyle}
              disabled={isFetching}
              name="newPasswordConfirm"
              placeholder="New password confirm"
              type="password"
            />
            <button
              className={buttonStyle}
              disabled={isFetching}
              type="submit"
              onClick={this._changePassword}
            >
              {buttonMessage}
            </button>
          </div>
          <Link to={book.feed}>← back</Link>
        </div>
      </Form>
    );
  };

  render() {
    return (
      <Formik
        initialValues={newPassword.shape}
        render={this._getFormMarkup}
        validationSchema={newPassword.schema}
        onSubmit={this._submitPassword}
      />
    );
  }
}
