// Core
import { all } from "redux-saga/effects";

// Watchers
import { watchAuth } from "../bus/auth/saga/watchers";
import { watchProfile } from "../bus/profile/saga/watchers";
import { watchQuestionnaire } from "../bus/questionnaire/saga/watchers";

export function* rootSaga() {
  yield all([watchAuth(), watchProfile(), watchQuestionnaire()]);
}
