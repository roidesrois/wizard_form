// Core
import { put, apply } from 'redux-saga/effects';
import { actions } from 'react-redux-form';

// Instruments
import { api } from '../../../../API';
import { uiActions } from '../../../ui/actions';
import { authActions } from '../../actions';
import { profileActions } from '../../../profile/actions';

export function* loginWorker({ payload: credentials }) {
    try {
        yield put(uiActions.startFetching());

        const profile = yield apply(api, api.auth.login, [ credentials ]);
        // const { firstName, lastName } = profile;

        // if (credentials.remember) {
        //     yield apply(localStorage, localStorage.setItem, [ 'remember', true ]);
        // }

        if (profile) {
            yield apply(localStorage, localStorage.setItem, [ 'token', profile.access_token ]);
        }

        yield put(profileActions.fillProfile(profile));
        // yield put(actions.merge('forms.user.profile', { firstName, lastName }));
        yield put(authActions.authenticateAsync());
        yield put(uiActions.showNotification('Welcome!'));
    } catch (error) {
        yield put(uiActions.emitError(error, 'login worker'));
    } finally {
        yield put(uiActions.stopFetching());
    }
}
