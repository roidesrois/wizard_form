// Core
import { Map } from 'immutable';

// Instruments
import { authReducer } from '../reducer';
import { authActions } from '../actions';

const initialState = Map({
    isInitialized:   false,
    isAuthenticated: false,
});

describe('auth reducer:', () => {
    test('should return initial state by default', () => {
        expect(authReducer(void 0, {})).toEqual(initialState);
    });

    test('should handle AUTHENTICATE action', () => {
        expect(authReducer(void 0, authActions.authenticate())).toEqual(
            initialState.set('isAuthenticated', true),
        );
    });

    test('should handle INITIALIZE action', () => {
        expect(authReducer(void 0, authActions.initialize())).toEqual(
            initialState.set('isInitialized', true),
        );
    });

    test('should handle LOGOUT action', () => {
        expect(authReducer(void 0, authActions.logout())).toEqual(
            initialState.set('isAuthenticated', false),
        );
    });
});
