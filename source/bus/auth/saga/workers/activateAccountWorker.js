// Core
import { put, apply } from 'redux-saga/effects';
import { actions } from 'react-redux-form';

// Instruments
import { api } from '../../../../API';
import { uiActions } from '../../../ui/actions';
import { authActions } from '../../actions';
import { profileActions } from '../../../profile/actions';

export function* activateAccountWorker ({ payload: userInfo }) {

    try {
        yield put(uiActions.startFetching());

        const response = yield apply(api, api.auth.activateAccount, [userInfo]);
        const { response: userData, message } = yield apply(
            response,
            response.json
        );

        // console.log(userData, message);
        if (response.status !== 200) {
            throw new Error(message);
        }

        yield apply(localStorage, localStorage.setItem, [
            'userVerified',
            'true',
        ]);
        

        //yield put(uiActions.showNotification('Password changed'));
        yield put(profileActions.clearProfile());
        yield put(authActions.logout());

        // yield apply(localStorage, localStorage.setItem, ['userImage', userData.image]);

        // yield put(profileActions.fillProfile(profile));
        // yield put(actions.change('forms.user.profile.firstName', profile.firstName));
        // yield put(actions.change('forms.user.profile.lastName', profile.lastName));
        // yield put(authActions.authenticate());
    } catch (error) {
        yield put(uiActions.emitError(error, 'activate account worker'));
    } finally {
        yield put(uiActions.stopFetching());
    }
}