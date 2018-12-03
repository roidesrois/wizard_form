// Core
import { put, apply } from 'redux-saga/effects';
import { actions } from 'react-redux-form';
import { delay } from 'redux-saga';

// Instruments
import { api } from '../../../../API';
import { uiActions } from '../../../ui/actions';
import { authActions } from '../../../auth/actions';
import { profileActions } from '../../../profile/actions';

export function* changeEmailWorker ({ payload: { email, emailConfirm }}) {

    try {
        yield put(uiActions.startFetching());

        const response = yield apply(api, api.profile.updateEmail, [
            {
                email,
                emailConfirm,
            }
        ]);

        yield put(uiActions.showNotification('We sent you instructions to your email account.'));

        yield delay(1000);
        yield apply(localStorage, localStorage.removeItem, [ 'token' ]);
        yield put(profileActions.clearProfile());
        yield put(authActions.logout());

    } catch (error) {
        yield put(uiActions.emitError(error, 'change email worker'));
    } finally {
        yield put(uiActions.stopFetching());
    }
}


