// Core
import { Map, fromJS } from 'immutable';

// Instruments
import { types } from './types';

const initialState = Map({
    notification: Map(),
    isOnline:     false,
    isFetching:   false,
});

export const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.START_FETCHING:
            return state.set('isFetching', true);

        case types.STOP_FETCHING:
            return state.set('isFetching', false);

        case types.SHOW_NOTIFICATION:
            return state.set('notification', fromJS(action.payload));

        case types.HIDE_NOTIFICATION:
            return state.update('notification', (notification) => notification.clear());

        case types.SET_ONLINE_STATE:
            return state.set('isOnline', true);

        case types.SET_OFFLINE_STATE:
            return state.set('isOnline', false);

        default:
            return state;
    }
};
