// Core
import { put, apply } from 'redux-saga/effects';

// Instruments
import { authActions } from '../../actions';
import { profileActions } from '../../../profile/actions';

export function* initializeWorker() {
    // const remember = yield apply(localStorage, localStorage.getItem, [ 'remember' ]);
    const token = yield apply(localStorage, localStorage.getItem, [ 'token' ]);

    if (token) {
        yield put(authActions.authenticateAsync());
    } else {
        yield put(profileActions.clearProfile());
        yield put(authActions.logout());

        yield put(authActions.initialize());
    }
}
