// Core
import { expectSaga } from 'redux-saga-test-plan';
import { apply } from 'redux-saga/effects';

// Instruments
import { initializeWorker } from '../saga/workers/initializeWorker';
import { authActions } from '../actions';

const {
    testData: { token },
} = global;

describe('initialize saga:', () => {
    test('should complete «authenticateAsync» scenario', async () => {
        await expectSaga(initializeWorker)
            .provide([
                [ apply(localStorage, localStorage.getItem, [ 'remember' ]), true ],
                [ apply(localStorage, localStorage.getItem, [ 'token' ]), token ],
            ])
            .apply(localStorage, localStorage.getItem, [ 'remember' ])
            .apply(localStorage, localStorage.getItem, [ 'token' ])
            .put(authActions.authenticateAsync())
            .run();
    });

    test('should complete «initialize» scenario', async () => {
        await expectSaga(initializeWorker)
            .provide([
                [ apply(localStorage, localStorage.getItem, [ 'remember' ]), null ],
                [ apply(localStorage, localStorage.getItem, [ 'token' ]), null ],
            ])
            .put(authActions.initialize())
            .run();
    });
});
