// Core
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import cx from 'classnames';

// Actions
import { authActions } from '../../bus/auth/actions';


// Instruments
import Styles from './styles.m.css';
import { signup } from '../../bus/forms/shapes';

const mapState = (state) => {
    return {
        isFetching: state.ui.get('isFetching'),
    };
};

const mapDispatch = {
    signupAsync: authActions.signupAsync,
};

@connect(
    mapState,
    mapDispatch
)
export class SignupForm extends Component {

    _submitSignupForm = (user) => {
        this.props.signupAsync(user);
    };

    componentDidMount () {
        //tut parsim url
    }

    render () {
        const { isFetching } = this.props;

        return (
            <Formik
                initialValues = { signup.shape }
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
                    // const inviteStyle = cx({
                    //     [Styles.invalidInput]: !isValid && touched.invite && errors.invite,
                    // });
                    const buttonStyle = cx(Styles.signupSubmit, {
                        [Styles.disabledButton]: isFetching,
                    });
                    const buttonMessage = isFetching ? 'Загрузка...' : 'Создать аккаунт ✓';

                    return (
                        <Form className = { Styles.form }>
                            <div className = { centeredWrapperStyle }>
                                <div>
                                    <Field
                                        className = { passwordStyle }
                                        disabled = { isFetching }
                                        name = 'password'
                                        placeholder = 'Пароль'
                                        type = 'password'
                                    />
                                    <Field
                                        className = { passwordConfirmStyle }
                                        disabled = { isFetching }
                                        name = 'passwordConfirm'
                                        placeholder = 'Подтверждение пароля'
                                        type = 'password'
                                    />
                                    {/*<Field*/}
                                    {/*className = { inviteStyle }*/}
                                    {/*disabled = { isFetching }*/}
                                    {/*name = 'invite'*/}
                                    {/*placeholder = 'Секретное слово'*/}
                                    {/*type = 'password'*/}
                                    {/*/>*/}

                                    <button className = { buttonStyle } disabled = { isFetching } type = 'submit'>
                                        {buttonMessage}
                                    </button>
                                </div>
                            </div>
                        </Form>
                    );
                } }
                validationSchema = { signup.schema }
                onSubmit = { this._submitSignupForm }
            />
        );
    }
}
