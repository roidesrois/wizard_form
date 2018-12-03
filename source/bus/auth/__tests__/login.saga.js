// Core
import { put, apply } from 'redux-saga/effects';

// Instruments
import { api } from '../../../API';
import { uiActions } from '../../ui/actions';
import { authActions } from '../../auth/actions';
import { profileActions } from '../../profile/actions';
import { loginWorker } from '../saga/workers/loginWorker';

const {
    testData: { credentials, token, userProfile, error },
} = global;

const action1 = authActions.loginAsync(credentials);
const action2 = authActions.loginAsync({ ...credentials, remember: false });

const saga1 = loginWorker(action1);
const saga2 = loginWorker(action2);

describe('login saga:', () => {
    test('should dispatch startFetching action', () => {
        expect(saga1.next().value).toEqual(put(uiActions.startFetching()));
    });

    test('should call a fetch request', () => {
        expect(saga1.next().value).toEqual(
            apply(api, api.auth.login, [ credentials ]),
        );
    });

    test('should write a remember flag to localStorage', () => {
        expect(saga1.next(userProfile).value).toEqual(
            apply(localStorage, localStorage.setItem, [ 'remember', true ]),
        );
    });

    test('should write a token to localStorage', () => {
        expect(saga1.next().value).toEqual(
            apply(localStorage, localStorage.setItem, [ 'token', token ]),
        );
    });

    test('should dispatch fillProfile action', () => {
        expect(saga1.next().value).toEqual(
            put(profileActions.fillProfile(userProfile)),
        );
    });

    test('should dispatch authenticate action', () => {
        saga1.next(); // skip redux-form actions.merge test
        expect(saga1.next().value).toEqual(put(authActions.authenticate()));
    });

    test('should dispatch showNotification action', () => {
        expect(saga1.next().value).toEqual(
            put(uiActions.showNotification('Добро пожаловать!')),
        );
    });

    test('should dispatch stopFetching action', () => {
        expect(saga1.next().value).toEqual(put(uiActions.stopFetching()));
    });

    test('should finish', () => {
        expect(saga1.next().done).toBe(true);
    });

    test('should catch errors', () => {
        saga2.next();
        saga2.next();
        saga2.next(userProfile);
        expect(saga2.throw(error).value).toEqual(
            put(uiActions.emitError(error, 'login worker')),
        );
    });
});
