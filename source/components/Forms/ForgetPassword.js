// Core
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import cx from 'classnames';

// Actions
import { profileActions } from '../../bus/profile/actions';

// Instruments
import Styles from './styles.m.css';
import { forgetPassword } from '../../bus/forms/shapes';
import { book } from '../../routes/book';

const mapState = (state) => {
    return {
        isFetching: state.ui.get('isFetching'),
    };
};

const mapDispatch = {
    resetPasswordAsync: profileActions.resetPasswordAsync,
};

@connect(
    mapState,
    mapDispatch
)
export class ForgetPasswordForm extends Component {
    _resetPassword = (userData) => {
        const { email } = userData;
        this.props.resetPasswordAsync(email);
    };

    render () {
        const { isFetching } = this.props;

        return (
            <Formik
                initialValues = { forgetPassword.shape }
                render = { (props) => {
                    const { isValid, touched, errors } = props;

                    const centeredWrapperStyle = cx(Styles.wrapper, Styles.centered, {
                        [Styles.disabledInput]: isFetching,
                    });
                    const emailStyle = cx({
                        [Styles.invalidInput]: !isValid && touched.email && errors.email,
                    });

                    const buttonStyle = cx(Styles.loginSubmit, {
                        [Styles.disabledButton]: isFetching,
                    });
                    const buttonMessage = isFetching ? 'Загрузка...' : 'Submit';

                    return (
                        <Form className = { Styles.form }>
                            <div className = { centeredWrapperStyle }>
                                <div>
                                    <Field
                                        className = { emailStyle }
                                        disabled = { isFetching }
                                        name = 'email'
                                        placeholder = 'Email'
                                        type = 'email'
                                    />
                                    <button
                                        className = { buttonStyle }
                                        disabled = { isFetching }
                                        type = 'submit' >
                                        {buttonMessage}
                                    </button>
                                </div>
                                <Link to = { book.login }>← back</Link>
                            </div>
                        </Form>
                    );
                } }
                validationSchema = { forgetPassword.schema }
                onSubmit = { this._resetPassword }
            />
        );
    }
}
