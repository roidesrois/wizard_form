// Core
import { put, apply } from 'redux-saga/effects';
import { actions } from 'react-redux-form';

// Instruments
import { api } from '../../../../API';
import { uiActions } from '../../../ui/actions';
import { authActions } from '../../actions';
// import { profileActions } from '../../../profile/actions';

export function* signupWorker({ payload: signupData }) {
    try {
        yield put(uiActions.startFetching());

        const profile = yield apply(api, api.auth.signup, [ signupData ]);
        const { firstName, lastName, image, registrationHash } = profile;


        yield apply(localStorage, localStorage.setItem, [
            'userImage',
            image,
        ]);
        yield apply(localStorage, localStorage.setItem, [
            'firstName',
            firstName,
        ]);
        yield apply(localStorage, localStorage.setItem, [
            'lastName',
            lastName,
        ]);
        if (registrationHash) {
            yield put(authActions.valid());
        }
        yield apply(localStorage, localStorage.setItem, [
            'registrationHash',
            registrationHash,
        ]);

        // yield apply(localStorage, localStorage.setItem, [
        //     'token',
        //     profile.token,
        // ]);

        // yield put(profileActions.fillProfile(profile));
        // yield put(actions.merge('forms.user.profile', { firstName, lastName }));
        // yield put(authActions.authenticate());
        // yield put(uiActions.showNotification('Добро пожаловать!'));
    } catch (error) {
        yield put(uiActions.emitError(error, 'signup worker'));
    } finally {
        yield put(uiActions.stopFetching());
    }
}
