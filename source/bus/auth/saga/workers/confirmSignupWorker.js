// Core
import { put, apply } from 'redux-saga/effects';
import { actions } from 'react-redux-form';

// Instruments
import { api } from '../../../../API';
import { uiActions } from '../../../ui/actions';
import { authActions } from '../../actions';

export function* confirmSignupWorker ({ payload: registrationHash }) {
    try {
        yield put(uiActions.startFetching());

        const response = yield apply(api, api.auth.confirmSignup, [registrationHash]);
        const { response: userData, message } = yield apply(
            response,
            response.json,
        );

        if (response.status == 200) {
            // yield put(
            //     uiActions.showNotification(
            //         "You registered successfully. We will send you a confirmation message to your email account."
            //     )
            // );

            yield put(authActions.registered());
            
            // yield apply(localStorage, localStorage.setItem, [
            //     'isRegistered',
            //     'true',
            // ]);
        } else {
            throw new Error(message);
        }

        // yield apply(localStorage, localStorage.setItem, ['userImage', userData.image]);

    // yield put(profileActions.fillProfile(profile));
    // yield put(actions.change('forms.user.profile.firstName', profile.firstName));
    // yield put(actions.change('forms.user.profile.lastName', profile.lastName));
    // yield put(authActions.authenticate());
    } catch (error) {
        yield put(uiActions.emitError(error, 'confirm signup worker'));
    } finally {
        yield put(uiActions.stopFetching());
    }
}