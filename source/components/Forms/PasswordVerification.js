// Core
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import cx from 'classnames';

import { Route, Redirect } from 'react-router';
// Actions
import { authActions } from '../../bus/auth/actions';

// Instruments
import Styles from './styles.m.css';
import { passwordVerification } from '../../bus/forms/shapes';

const mapState = (state) => {
    return {
        isFetching: state.ui.get('isFetching'),
    };
};

const mapDispatch = {
    activateAccountAsync: authActions.activateAccountAsync,
};

@connect(
    mapState,
    mapDispatch
)
export class PasswordVerificationForm extends Component {

    state = {
        confirmationHash: '',
        emailChange:      '',
    };

    componentDidMount () {
        //tut parsim url
        const queryString = require('query-string');
        // const parsedHash = queryString.parse(location.hash);
        console.log(queryString);
        if (queryString.parseUrl(location.hash).query.confirmationHash) {
            this.setState({
                confirmationHash: queryString.parseUrl(location.hash).query.confirmationHash,
                emailChange:      queryString.parseUrl(location.hash).query.emailChange,
            });
        }
        // renderRedirect = () => {
        //     if (localStorage.getItem('userVerified') === 'true') {
        //         return <Redirect to='/login' />
        //     }
        // };
        const parsed = queryString.parse(location.search);
        // renderRedirect();
        localStorage.setItem('confirmationHash', queryString.parseUrl(location.hash).query.confirmationHash);
        localStorage.setItem('emailChange', queryString.parseUrl(location.hash).query.emailChange);

        console.log(parsed);
    }

    componentWillUnmount () {
        localStorage.clear();
    }

    _submitActivateForm = (user) => {
        this.props.activateAccountAsync(user);
    };

    render () {
        const { isFetching } = this.props;
        const { confirmationHash, emailChange } = this.state;

        return (
            <Formik
                initialValues = { passwordVerification.shape }
                render = { (props) => {
                    const { isValid, touched, errors } = props;

                    const centeredWrapperStyle = cx(Styles.wrapper, Styles.centered, {
                        [Styles.disabledInput]: isFetching,
                    });

                    const passwordStyle = cx({
                        [Styles.invalidInput]: !isValid && touched.password && errors.password,
                    });

                    const passwordConfirmStyle = cx({
                        [Styles.invalidInput]: !isValid && touched.passwordConfirm && errors.passwordConfirm,
                    });
                    const buttonStyle = cx(Styles.signupSubmit, {
                        [Styles.disabledButton]: isFetching,
                    });
                    const buttonMessage = isFetching ? 'Loading...' : 'Activate account ✓';

                    //localStorage.setItem('userVerified', 'true');
                    if (localStorage.getItem('userVerified') === 'true') {
                        return <Redirect to = '/login' />;
                    }

                    return (
                        <Form className = { Styles.form }>
                            <div className = { centeredWrapperStyle }>
                                <div>
                                    <Field
                                        className = { passwordStyle }
                                        disabled = { isFetching }
                                        name = 'password'
                                        placeholder = 'Password'
                                        type = 'password'
                                    />
                                    <Field
                                        className = { passwordConfirmStyle }
                                        disabled = { isFetching }
                                        name = 'passwordConfirm'
                                        placeholder = 'Confirm password'
                                        type = 'password'
                                    />
                                    <Field
                                        name = 'confirmationHash'
                                        type = 'hidden'
                                        value = { confirmationHash }
                                    />
                                    <Field
                                        name = 'emailChange'
                                        type = 'hidden'
                                        value = { emailChange }
                                    />

                                    <button className = { buttonStyle } disabled = { isFetching } type = 'submit'>
                                        {buttonMessage}
                                    </button>
                                </div>
                            </div>
                        </Form>
                    );
                } }
                validationSchema = { passwordVerification.schema }
                onSubmit = { this._submitActivateForm }
            />
        );
    }
}
