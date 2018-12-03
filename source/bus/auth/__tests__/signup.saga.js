// Core
import { put, apply } from 'redux-saga/effects';

// Instruments
import { api } from '../../../API';
import { uiActions } from '../../ui/actions';
import { authActions } from '../../auth/actions';
import { signupWorker } from '../saga/workers/signupWorker';

const {
    testData: { signupData, token, userProfile },
} = global;

const signupAction = authActions.signupAsync(signupData);

const saga = signupWorker(signupAction);

describe('signup saga:', () => {
    test('should dispatch startFetching action', () => {
        expect(saga.next().value).toEqual(put(uiActions.startFetching()));
    });

    test('should call a fetch request', () => {
        expect(saga.next().value).toEqual(
            apply(api, api.auth.signup, [ signupData ]),
        );
    });

    test('should write a token to localStorage', () => {
        expect(saga.next(userProfile).value).toEqual(
            apply(localStorage, localStorage.setItem, [ 'token', token ]),
        );
    });

    test('should dispatch «fillProfile» action', () => {
        expect(saga.next().value).toMatchInlineSnapshot(`
Object {
  "@@redux-saga/IO": true,
  "PUT": Object {
    "action": Object {
      "payload": Object {
        "avatar": "TEST_AVATAR",
        "firstName": "TEST_FIRST_NAME",
        "id": "TEST_ID",
        "lastName": "TEST_LAST_NAME",
        "token": "TEST_TOKEN",
      },
      "type": "FILL_PROFILE",
    },
    "channel": null,
  },
}
`);
    });

    test('should dispatch «authenticate» action', () => {
        saga.next(); // skip redux-form actions.merge test
        expect(saga.next().value).toMatchInlineSnapshot(`
Object {
  "@@redux-saga/IO": true,
  "PUT": Object {
    "action": Object {
      "type": "AUTHENTICATE",
    },
    "channel": null,
  },
}
`);
    });

    test('should dispatch showNotification action', () => {
        expect(saga.next().value).toMatchInlineSnapshot(`
Object {
  "@@redux-saga/IO": true,
  "PUT": Object {
    "action": Object {
      "payload": Object {
        "id": "123",
        "message": "Добро пожаловать!",
        "source": "",
        "type": "info",
      },
      "type": "SHOW_NOTIFICATION",
    },
    "channel": null,
  },
}
`);
    });

    test('should dispatch «stopFetching» action', () => {
        expect(saga.next().value).toMatchInlineSnapshot(`
Object {
  "@@redux-saga/IO": true,
  "PUT": Object {
    "action": Object {
      "type": "STOP_FETCHING",
    },
    "channel": null,
  },
}
`);
    });

    test('should finish', () => {
        expect(saga.next().done).toBe(true);
    });
});
