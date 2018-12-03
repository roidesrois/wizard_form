// Core
import { takeEvery } from 'redux-saga/effects';

// Types
import { types } from '../types';

// Workers
import { updateNameWorker } from './workers/updateNameWorker';
import { updateAvatarWorker } from './workers/updateAvatarWorker';
import { changePasswordWorker } from './workers/changePasswordWorker';
import { changeEmailWorker } from './workers/changeEmailWorker';
import { resetPasswordWorker } from './workers/resetPasswordWorker';

export function* watchProfile() {
    yield takeEvery(types.UPDATE_NAME_ASYNC, updateNameWorker);
    yield takeEvery(types.UPDATE_AVATAR_ASYNC, updateAvatarWorker);
    yield takeEvery(types.UPDATE_PASSWORD_ASYNC, changePasswordWorker);
    yield takeEvery(types.UPDATE_EMAIL_ASYNC, changeEmailWorker);
    yield takeEvery(types.RESET_PASSWORD_ASYNC, resetPasswordWorker);
}
