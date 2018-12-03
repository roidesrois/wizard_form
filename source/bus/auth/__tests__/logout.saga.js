// Core
import { apply } from 'redux-saga/effects';
import { replace } from 'connected-react-router';
import { actions } from 'react-redux-form';
import { expectSaga } from 'redux-saga-test-plan';

// Instruments
import { api } from '../../../API';
import { authActions } from '../../auth/actions';
import { uiActions } from '../../ui/actions';
import { profileActions } from '../../profile/actions';
import { postsActions } from '../../posts/actions';
import { usersActions } from '../../users/actions';
import { book } from '../../../routes/book';
import { logoutWorker } from '../saga/workers/logoutWorker';

describe('logout saga:', () => {
    test('should complete main scenario', async () => {
        await expectSaga(logoutWorker)
            .provide([[ apply(api, api.auth.logout) ]])
            .put(uiActions.startFetching())
            .apply(api, api.auth.logout)
            .apply(localStorage, localStorage.removeItem, [ 'token' ])
            .apply(localStorage, localStorage.removeItem, [ 'remember' ])
            .put(profileActions.clearProfile())
            .put(postsActions.clearPosts())
            .put(usersActions.clearUsers())
            .put(actions.reset('forms.user'))
            .put(authActions.logout())
            .put(uiActions.stopFetching())
            .put(replace(book.login))
            .run();
    });
});
