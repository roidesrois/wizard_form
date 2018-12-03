// Core
import { put, apply } from 'redux-saga/effects';

// Instruments
import { api } from '../../../../API';
import { uiActions } from '../../../ui/actions';
import { profileActions } from '../../actions';

export function* updateNameWorker({ payload: { firstName, lastName } }) {
    try {
        yield put(uiActions.startFetching());

        const updatedProfile = yield apply(api, api.profile.updateProfile, [
            {
                firstName,
                lastName,
            },
        ]);

        yield put(profileActions.fillProfile(updatedProfile));
    } catch (error) {
        yield put(uiActions.emitError(error, 'update profile worker'));
    } finally {
        yield put(uiActions.stopFetching());
    }
}
