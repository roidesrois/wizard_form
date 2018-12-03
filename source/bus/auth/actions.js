// Types
import { types } from './types';

export const authActions = {
    // Sync
    initialize: () => ({
        type: types.INITIALIZE,
    }),
    authenticate: () => ({
        type: types.AUTHENTICATE,
    }),
    logout: () => ({
        type: types.LOGOUT,
    }),
    valid: () => ({
        type: types.VALID,
    }),
    registered: () => ({
        type: types.REGISTERED,
    }),

    // Async
    initializeAsync: () => ({
        type: types.INITIALIZE_ASYNC,
    }),
    loginAsync: (credentials) => ({
        type:    types.LOGIN_ASYNC,
        payload: credentials,
    }),
    authenticateAsync: () => ({
        type: types.AUTHENTICATE_ASYNC,
    }),
    signupAsync: (userData) => ({
        type:    types.SIGNUP_ASYNC,
        payload: userData,
    }),
    confirmSignupAsync: (registrationHash) => ({
        type:    types.CONFIRM_SIGNUP_ASYNC,
        payload: registrationHash,
    }),
    activateAccountAsync: (userData) => ({
        type:    types.ACTIVATE_ACCOUNT_ASYNC,
        payload: userData,
    }),
    logoutAsync: () => ({
        type: types.LOGOUT_ASYNC,
    }),
};
