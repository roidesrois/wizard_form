// Core
import { put, apply } from "redux-saga/effects";
import { actions } from "react-redux-form";
import { delay } from "redux-saga";
// import { goBack  } from 'react-router-redux';
// Instruments
import { api } from "../../../../API";
import { uiActions } from "../../../ui/actions";

export function* resetPasswordWorker({ payload: email }) {
  try {
    yield put(uiActions.startFetching());

    const response = yield apply(api, api.profile.resetPassword, [email]);

    if (response.status !== 200) {
      const { message } = yield apply(response, response.json);

      throw new Error(message);
    }

    yield put(
      uiActions.showNotification(
        "We sent you instructions to your email account."
      )
    );

    yield delay(1000);
    // yield put(goBack());
  } catch (error) {
    yield put(uiActions.emitError(error, "reset password worker"));
  } finally {
    yield put(uiActions.stopFetching());
  }
}
