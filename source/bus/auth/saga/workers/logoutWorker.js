// Core
import { put, apply } from "redux-saga/effects";
import { actions } from "react-redux-form";
import { replace } from "connected-react-router";

// Instruments
import { api } from "../../../../API";
import { uiActions } from "../../../ui/actions";
import { authActions } from "../../actions";
import { profileActions } from "../../../profile/actions";
// import { postsActions } from '../../../posts/actions';
// import { usersActions } from '../../../users/actions';
import { book } from "../../../../routes/book";

export function* logoutWorker() {
  try {
    yield put(uiActions.startFetching());
    // yield apply(api, api.auth.logout);
  } catch (error) {
    yield put(uiActions.emitError(error, "logout worker"));
  } finally {
    yield apply(localStorage, localStorage.removeItem, ["token"]);
    // yield apply(localStorage, localStorage.removeItem, [ 'remember' ]);
    yield put(profileActions.clearProfile());
    // yield put(postsActions.clearPosts());
    // yield put(usersActions.clearUsers());
    yield put(actions.reset("forms.user"));
    yield put(authActions.logout());
    yield put(uiActions.stopFetching());
    // yield put(replace(book.login));
  }
}
