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
import { updateEmail } from '../../bus/forms/shapes';
import { book } from '../../routes/book';

const mapState = (state) => {
    return {
        isFetching: state.ui.get('isFetching'),
    };
};

const mapDispatch = {
    updateEmailAsync: profileActions.updateEmailAsync,
};

@connect(
    mapState,
    mapDispatch
)
export class UpdateEmailForm extends Component {
    _updateEmail = (emailData) => {
        this.props.updateEmailAsync(emailData);
    };

    render () {
        const { isFetching } = this.props;

        return (
            <Formik
                initialValues = { updateEmail.shape }
                render = { (props) => {
                    const { isValid, touched, errors } = props;

                    const centeredWrapperStyle = cx(Styles.wrapper, Styles.centered, {
                        [Styles.disabledInput]: isFetching,
                    });
                    const updateEmailStyle = cx({
                        [Styles.invalidInput]: !isValid && touched.email && errors.email,
                    });
                    const updateEmailConfirmStyle = cx({
                        [Styles.invalidInput]: !isValid && touched.emailConfirm && errors.emailConfirm,
                    });

                    const buttonStyle = cx(Styles.loginSubmit, {
                        [Styles.disabledButton]: isFetching,
                    });
                    const buttonMessage = isFetching ? 'Loading...' : 'Change email';

                    return (
                        <Form className = { Styles.form }>
                            <div className = { centeredWrapperStyle }>
                                <div>
                                    <Field
                                        className = { updateEmailStyle }
                                        disabled = { isFetching }
                                        name = 'email'
                                        placeholder = 'Email'
                                        type = 'email'
                                    />
                                    <Field
                                        className = { updateEmailConfirmStyle }
                                        disabled = { isFetching }
                                        name = 'emailConfirm'
                                        placeholder = 'Email confirm'
                                        type = 'email'
                                    />
                                    <button
                                        className = { buttonStyle }
                                        disabled = { isFetching }
                                        type = 'submit'>
                                        {buttonMessage}
                                    </button>
                                </div>
                                <Link to = { book.feed }>← back</Link>
                            </div>
                        </Form>
                    );
                } }
                validationSchema = { updateEmail.schema }
                onSubmit = { this._updateEmail }
            />
        );
    }
}
