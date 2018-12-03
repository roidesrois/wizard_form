// Core
import { Map } from 'immutable';

// Instruments
import { uiReducer } from '../reducer';
import { uiActions } from '../actions';

const initialState = Map({
    notification: Map({
        id: '123',
        type: 'error',
        message: 'Fetch posts fail',
        source: 'fetch posts worker',
    }),
    isOnline: false,
    isFetching: false,
});

describe('ui reducer:', () => {
    test('should return initial state by default', () => {
        expect(uiReducer(void 0, {})).toMatchInlineSnapshot(`
Immutable.Map {
  "notification": Immutable.Map {},
  "isOnline": false,
  "isFetching": false,
}
`);
    });

    test('should handle startFetching action', () => {
        expect(uiReducer(void 0, uiActions.startFetching()))
            .toMatchInlineSnapshot(`
Immutable.Map {
  "notification": Immutable.Map {},
  "isOnline": false,
  "isFetching": true,
}
`);
    });

    test('should handle stopFetching action', () => {
        expect(uiReducer(void 0, uiActions.stopFetching()))
            .toMatchInlineSnapshot(`
Immutable.Map {
  "notification": Immutable.Map {},
  "isOnline": false,
  "isFetching": false,
}
`);
    });

    test('should handle showNotification action', () => {
        expect(uiReducer(void 0, uiActions.showNotification('Login success!')))
            .toMatchInlineSnapshot(`
Immutable.Map {
  "notification": Immutable.Map {
    "id": "123",
    "message": "Login success!",
    "type": "info",
    "source": "",
  },
  "isOnline": false,
  "isFetching": false,
}
`);
    });

    test('should handle hideNotification action', () => {
        expect(uiReducer(initialState, uiActions.hideNotification()))
            .toMatchInlineSnapshot(`
Immutable.Map {
  "notification": Immutable.Map {},
  "isOnline": false,
  "isFetching": false,
}
`);
    });

    test('should handle setOnlineState action', () => {
        expect(uiReducer(void 0, uiActions.setOnlineState()))
            .toMatchInlineSnapshot(`
Immutable.Map {
  "notification": Immutable.Map {},
  "isOnline": true,
  "isFetching": false,
}
`);
    });

    test('should handle setOfflineState action', () => {
        expect(uiReducer(void 0, uiActions.setOfflineState()))
            .toMatchInlineSnapshot(`
Immutable.Map {
  "notification": Immutable.Map {},
  "isOnline": false,
  "isFetching": false,
}
`);
    });
});
