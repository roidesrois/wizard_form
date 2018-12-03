// Core
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import cx from "classnames";

// Actions
import { authActions } from "../../bus/auth/actions";

// Instruments
import Styles from "./styles.m.css";
import { login } from "../../bus/forms/shapes";
import { book } from "../../routes/book";

const mapState = state => {
  return {
    isFetching: state.ui.get("isFetching")
  };
};

const mapDispatch = {
  loginAsync: authActions.loginAsync
};

@connect(
  mapState,
  mapDispatch
)
export class LoginForm extends Component {
  _submitLoginForm = credentials => {
    this.props.loginAsync(credentials);
  };

  _getFormMarkup = formikProps => {
    const { isFetching } = this.props;
    const { isValid, touched, errors } = formikProps;

    const centeredWrapperStyle = cx(Styles.wrapper, Styles.centered, {
      [Styles.disabledInput]: isFetching
    });
    const emailStyle = cx({
      [Styles.invalidInput]: !isValid && touched.email && errors.email
    });
    const passwordStyle = cx({
      [Styles.invalidInput]: !isValid && touched.password && errors.password
    });
    const buttonStyle = cx(Styles.loginSubmit, {
      [Styles.disabledButton]: isFetching
    });
    const buttonMessage = isFetching ? "Loading..." : "Log in";

    return (
      <Form className={Styles.form}>
        <div className={centeredWrapperStyle}>
          <div>
            <Field
              className={emailStyle}
              disabled={isFetching}
              name="email"
              placeholder="Email"
              type="email"
            />
            <Field
              className={passwordStyle}
              disabled={isFetching}
              name="password"
              placeholder="Password"
              type="password"
            />
            {/* <label className={Styles.rememberMe}>
                            <Field
                                checked={formikProps.values.remember}
                                name="remember"
                                type="checkbox"
                            />
                            Запомнить меня
                        </label> */}
            <button className={buttonStyle} disabled={isFetching} type="submit">
              {buttonMessage}
            </button>

            <Link to={book.forgetPassword}>Forgot password ?</Link>
          </div>
        </div>
      </Form>
    );
  };

  render() {
    return (
      <Formik
        initialValues={login.shape}
        render={this._getFormMarkup}
        validationSchema={login.schema}
        onSubmit={this._submitLoginForm}
      />
    );
  }
}
