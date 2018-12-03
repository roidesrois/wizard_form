// Core
import { v4 } from 'uuid';

// Instruments
import { types } from './types';

export const uiActions = {
    startFetching: () => ({
        type: types.START_FETCHING,
    }),
    stopFetching: () => ({
        type: types.STOP_FETCHING,
    }),
    emitError: (error, meta = null) => ({
        type:    types.EMIT_ERROR,
        payload: error,
        error:   true,
        meta,
    }),
    showNotification: (message, type = 'info', source = '') => ({
        type:    types.SHOW_NOTIFICATION,
        payload: {
            id: v4(),
            message,
            type,
            source,
        },
    }),
    hideNotification: () => ({
        type: types.HIDE_NOTIFICATION,
    }),
    setOnlineState: () => ({
        type: types.SET_ONLINE_STATE,
    }),
    setOfflineState: () => ({
        type: types.SET_OFFLINE_STATE,
    }),
};
