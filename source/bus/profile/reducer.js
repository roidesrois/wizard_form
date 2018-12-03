// Core
import { Map } from 'immutable';

// Instruments
import { types } from './types';

const initialState = Map({
    id:        '',
    avatar:    '',
    firstName: '',
    lastName:  '',
    token:     '',
});

export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FILL_PROFILE:
            return state.merge(action.payload);

        case types.UPDATE_AVATAR:
            return state.set('avatar', action.payload);

        case types.CLEAR_PROFILE:
            return state.clear();

        default:
            return state;
    }
};
