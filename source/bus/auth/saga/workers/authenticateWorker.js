// Core
import { put, apply } from 'redux-saga/effects';
import { actions } from 'react-redux-form';

// Instruments
import { api } from '../../../../API';
import { uiActions } from '../../../ui/actions';
import { authActions } from '../../actions';
import { profileActions } from '../../../profile/actions';

export function* authenticateWorker() {
    try {
        yield put(uiActions.startFetching());

        const profile = yield apply(api, api.auth.authenticate);
        const { firstName, lastName } = profile;

        yield put(actions.merge('forms.user.profile', { firstName, lastName }));
        yield put(profileActions.fillProfile(profile));
        yield put(authActions.authenticate());
    } catch (error) {
        yield apply(localStorage, localStorage.removeItem, [ 'token' ]);
        yield put(profileActions.clearProfile());
        yield put(authActions.logout());
        
        yield put(uiActions.emitError(error, 'authenticate worker'));
    } finally {
        yield put(authActions.initialize());
        yield put(uiActions.stopFetching());
    }
}
