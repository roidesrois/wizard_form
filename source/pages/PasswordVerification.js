// Core
import React, { Component } from 'react';

// Components
import { Catcher, Spinner, Header, PasswordVerificationForm, Notification } from '../components';

export class PasswordVerification extends Component {
    render() {
        return (
            <Catcher>
                <Spinner />
                <Header />
                <PasswordVerificationForm />
                <Notification />
            </Catcher>
        );
    }
}
