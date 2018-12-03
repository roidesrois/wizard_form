// Core
import { takeEvery } from 'redux-saga/effects';

// Types
import { types } from '../types';

// Workers
import { initializeWorker } from './workers/initializeWorker';
import { loginWorker } from './workers/loginWorker';
import { authenticateWorker } from './workers/authenticateWorker';
import { signupWorker } from './workers/signupWorker';
import { confirmSignupWorker } from './workers/confirmSignupWorker';
import { activateAccountWorker } from './workers/activateAccountWorker';
import { logoutWorker } from './workers/logoutWorker';

export function* watchAuth() {
    yield takeEvery(types.INITIALIZE_ASYNC, initializeWorker);
    yield takeEvery(types.LOGIN_ASYNC, loginWorker);
    yield takeEvery(types.AUTHENTICATE_ASYNC, authenticateWorker);
    yield takeEvery(types.SIGNUP_ASYNC, signupWorker);
    yield takeEvery(types.CONFIRM_SIGNUP_ASYNC, confirmSignupWorker);
    yield takeEvery(types.ACTIVATE_ACCOUNT_ASYNC, activateAccountWorker);
    yield takeEvery(types.LOGOUT_ASYNC, logoutWorker);
}
