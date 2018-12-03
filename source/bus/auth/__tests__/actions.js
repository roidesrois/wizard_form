// Instruments
import { authActions } from '../actions';
import { types } from '../types';

const {
    testData: { credentials, userProfile },
} = global;

describe('auth actions:', () => {
    test('authenticate', () => {
        expect(authActions.authenticate()).toEqual({
            type: types.AUTHENTICATE,
        });
    });

    test('initialize', () => {
        expect(authActions.initialize()).toEqual({
            type: types.INITIALIZE,
        });
    });

    test('logout', () => {
        expect(authActions.logout()).toEqual({
            type: types.LOGOUT,
        });
    });

    test('initialize async', () => {
        expect(authActions.initializeAsync()).toEqual({
            type: types.INITIALIZE_ASYNC,
        });
    });

    test('login async ', () => {
        expect(authActions.loginAsync(credentials)).toEqual({
            type:    types.LOGIN_ASYNC,
            payload: credentials,
        });
    });

    test('authenticate async ', () => {
        expect(authActions.authenticateAsync()).toEqual({
            type: types.AUTHENTICATE_ASYNC,
        });
    });

    test('signup async ', () => {
        expect(authActions.signupAsync(userProfile)).toEqual({
            type:    types.SIGNUP_ASYNC,
            payload: userProfile,
        });
    });

    test('logout async ', () => {
        expect(authActions.logoutAsync()).toEqual({
            type: types.LOGOUT_ASYNC,
        });
    });
});
