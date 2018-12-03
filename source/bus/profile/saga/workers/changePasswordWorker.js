// Core
import { put, apply } from 'redux-saga/effects';
import { actions } from 'react-redux-form';
import { delay } from 'redux-saga';
// Instruments
import { api } from '../../../../API';
import { uiActions } from '../../../ui/actions';
import { authActions } from '../../../auth/actions';
import { profileActions } from '../../../profile/actions';

export function* changePasswordWorker({
    payload: { oldPassword, newPassword: password, newPasswordConfirm: passwordConfirm },
}) {
    try {
        yield put(uiActions.startFetching());

        yield apply(api, api.profile.updatePassword, [
            {
                oldPassword,
                password,
                passwordConfirm,
            },
        ]);

        //yield put(actions.reset('forms.user.password'));
        yield put(uiActions.showNotification('Password successfully changed'));

        yield delay(1000);
        yield apply(localStorage, localStorage.removeItem, [ 'token' ]);
        yield put(profileActions.clearProfile());
        yield put(authActions.logout());

    } catch (error) {
        yield put(uiActions.emitError(error, 'update profile worker'));
    } finally {
        yield put(uiActions.stopFetching());
    }
}
