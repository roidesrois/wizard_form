// Core
import React, { Component } from 'react';

// Components
import { Catcher, Spinner, Header, Notification, UpdateEmailForm} from '../components';

export class UpdateEmail extends Component {
    render () {
        return (
            <Catcher>
                <Spinner />
                <Header />
                <UpdateEmailForm />
                <Notification />
            </Catcher>
        );
    }
}
