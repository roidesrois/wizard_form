// Core
import { apply } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';

// Instruments
import { api } from '../../../API';
import { authenticateWorker } from '../saga/workers/authenticateWorker';
import { authActions } from '../actions';
import { uiActions } from '../../ui/actions';
import { profileActions } from '../../profile/actions';

const {
    testData: { userProfile, token, error },
} = global;

const action = authActions.authenticateAsync(token);

describe('authenticate saga:', () => {
    test('should complete main scenario', async () => {
        await expectSaga(authenticateWorker, action)
            .provide([[ apply(api, api.auth.authenticate), userProfile ]])
            .put(uiActions.startFetching())
            .apply(api, api.auth.authenticate)
            .put(profileActions.fillProfile(userProfile))
            .put(authActions.authenticate())
            .put(authActions.initialize())
            .put(uiActions.stopFetching())
            .run();
    });

    test('should complete catch scenario', async () => {
        await expectSaga(authenticateWorker, action)
            .provide({
                call() {
                    throw error;
                },
            })
            .put(uiActions.emitError(error, 'authenticate worker'))
            .put(authActions.initialize())
            .put(uiActions.stopFetching())
            .run();
    });
});
