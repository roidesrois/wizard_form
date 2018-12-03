// Core
import React, { Component } from "react";
import { connect } from "react-redux";
import { Formik, Form, Field } from "formik";
import cx from "classnames";

// Actions
import { authActions } from "../../bus/auth/actions";

// Instruments
import Styles from "./styles.m.css";
import { signup } from "../../bus/forms/shapes";

const mapState = state => {
  return {
    isFetching: state.ui.get("isFetching"),
    userIsValid: state.auth.get("userIsValid"),
    userIsRegistered: state.auth.get("userIsRegistered")
  };
};

const mapDispatch = {
  signupAsync: authActions.signupAsync,
  confirmSignupAsync: authActions.confirmSignupAsync
};

@connect(
  mapState,
  mapDispatch
)
export class SignupForm extends Component {
  // state = {
  //     userIsValid: false,
  // };

  componentWillUnmount() {
    localStorage.clear();
  }

  _submitSignupForm = user => {
    this.props.signupAsync(user);
  };

  _confirmRegistration = () => {
    const registrationHash = localStorage.getItem("registrationHash");

    if (registrationHash) {
      this.props.confirmSignupAsync(registrationHash);
    }
  };

  _getFormMarkup = formikProps => {
    const { isFetching, userIsValid, userIsRegistered } = this.props;
    const { isValid, touched, errors } = formikProps;

    const centeredWrapperStyle = cx(Styles.wrapper, Styles.centered, {
      [Styles.disabledInput]: isFetching
    });
    const firstNameStyle = cx({
      [Styles.invalidInput]: !isValid && touched.firstName && errors.firstName
    });
    const lastNameStyle = cx({
      [Styles.invalidInput]: !isValid && touched.lastName && errors.lastName
    });
    const pinCodeStyle = cx({
      [Styles.invalidInput]: !isValid && touched.pinCode && errors.pinCode
    });
    const serialNumberStyle = cx({
      [Styles.invalidInput]:
        !isValid && touched.serialNumber && errors.serialNumber
    });
    const emailStyle = cx({
      [Styles.invalidInput]: !isValid && touched.email && errors.email
    });
    const emailConfirmStyle = cx({
      [Styles.invalidInput]:
        !isValid && touched.emailConfirm && errors.emailConfirm
    });

    const buttonStyle = cx(Styles.signupSubmit, {
      [Styles.disabledButton]: isFetching
    });
    const buttonMessage = isFetching ? "Loading..." : "Registration ✓";

    const confirmButtonMessage = isFetching ? "Loading..." : "Confirm ?";

    // const userIsValid = localStorage.getItem('registrationHash');

    return (
      <Form className={Styles.form}>
        <div className={centeredWrapperStyle}>
          <div>
            {userIsValid ? (
              <>
                <img
                  src={`data:image/jpeg;base64,${localStorage.getItem(
                    "userImage"
                  )}`}
                />
                <Field
                  className={firstNameStyle}
                  disabled={isFetching}
                  name="firstName"
                  placeholder="First name"
                  readOnly={userIsValid}
                  type="text"
                  value={localStorage.getItem("firstName")}
                />
                <Field
                  className={lastNameStyle}
                  disabled={isFetching}
                  name="lastName"
                  placeholder="Last name"
                  readOnly={userIsValid}
                  type="text"
                  value={localStorage.getItem("lastName")}
                />
              </>
            ) : null}
            <Field
              className={serialNumberStyle}
              disabled={isFetching}
              name="serialNumber"
              placeholder="Serial number"
              readOnly={userIsValid}
              type="text"
            />
            <Field
              className={pinCodeStyle}
              disabled={isFetching}
              name="pinCode"
              placeholder="PIN code"
              readOnly={userIsValid}
              type="text"
            />
            {!userIsValid ? (
              <>
                <Field
                  className={emailStyle}
                  disabled={isFetching}
                  name="email"
                  placeholder="Email"
                  type="email"
                />
                <Field
                  className={emailConfirmStyle}
                  disabled={isFetching}
                  name="emailConfirm"
                  placeholder="Confirm email"
                  type="email"
                />
                <button
                  className={buttonStyle}
                  disabled={isFetching}
                  type="submit"
                >
                  {buttonMessage}
                </button>
              </>
            ) : null}

            {userIsValid ? (
              <button
                className={buttonStyle}
                disabled={isFetching || userIsRegistered === true}
                type="submit"
              >
                {confirmButtonMessage}
              </button>
            ) : null}
          </div>
        </div>
      </Form>
    );
  };

  render() {
    const { userIsRegistered, userIsValid } = this.props;
    // const isRegistered = localStorage.getItem('isRegistered');
    // const userIsValid = localStorage.getItem('registrationHash');
    console.log(userIsRegistered);

    return userIsRegistered !== true ? (
      <Formik
        initialValues={signup.shape}
        render={this._getFormMarkup}
        validationSchema={signup.schema}
        onSubmit={
          !userIsValid ? this._submitSignupForm : this._confirmRegistration
        }
      />
    ) : (
      <>
        <div className={Styles.notification}>
          <h1>
            You registered successfully. We will send you a confirmation message
            to your email account.
          </h1>
        </div>
      </>
    );
  }
}
