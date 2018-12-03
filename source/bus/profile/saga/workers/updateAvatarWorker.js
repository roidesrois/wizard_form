// Core
import { put, apply } from 'redux-saga/effects';
import { actions } from 'react-redux-form';

// Instruments
import { api } from '../../../../API';
import { uiActions } from '../../../ui/actions';
import { profileActions } from '../../actions';

export function* updateAvatarWorker({ payload: [ newAvatar ] }) {
    try {
        yield put(uiActions.startFetching());
        const avatarFormData = yield new FormData();

        yield apply(avatarFormData, avatarFormData.append, [
            'avatar',
            newAvatar,
        ]);

        const newAvatarUrl = yield apply(api, api.profile.updateAvatar, [ avatarFormData ]);

        yield put(profileActions.updateAvatar(newAvatarUrl));
        yield put(actions.reset('forms.user.profile.avatar'));
    } catch (error) {
        yield put(uiActions.emitError(error, 'update avatar worker'));
    } finally {
        yield put(uiActions.stopFetching());
    }
}
