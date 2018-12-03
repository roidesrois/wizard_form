// Core
import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router';

// Instruments
import { book } from './book';

// Components
import { Login, Signup, PasswordVerification, ForgetPassword } from '../pages';

export class Public extends Component {
    render() {
        return (
            <Switch>
                <Route
                    exact
                    component = { Login }
                    path = { book.login }
                />
                <Route
                    exact
                    component = { Signup }
                    path = { book.signup }
                />
                <Route
                    exact
                    component = { PasswordVerification }
                    path = { book.passwordVerification }
                />
                <Route
                    exact
                    component = { ForgetPassword }
                    path = { book.forgetPassword }
                />
                <Redirect
                    to = {{
                        hash:     '#',
                        pathname: '/login',
                    }}
                />
            </Switch>
        );
    }
}
