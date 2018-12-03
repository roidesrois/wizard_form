// Core
import { Map } from 'immutable';

// Instruments
import { types } from './types';

const initialState = Map({
    isInitialized:    false,
    isAuthenticated:  false,
    userIsValid:      false,
    userIsRegistered: false,
});

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.INITIALIZE:
            return state.set('isInitialized', true);

        case types.AUTHENTICATE:
            return state.set('isAuthenticated', true);

        case types.LOGOUT:
            return state.set('isAuthenticated', false);

        case types.VALID:
            return state.set('userIsValid', true);

        case types.REGISTERED:
            return state.set('userIsRegistered', true);

        default:
            return state;
    }
};
