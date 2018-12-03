// Core
import React, { Component } from 'react';

// Components
import { Catcher, Spinner, Header, ForgetPasswordForm, Notification } from '../components';

export class ForgetPassword extends Component {
    render () {
        return (
            <Catcher>
                <Spinner />
                <Header />
                <ForgetPasswordForm />
                <Notification />
            </Catcher>
        );
    }
}
