// Core
import { takeEvery } from 'redux-saga/effects';

// Types
import { types } from '../types';

// Workers
import { fetchQuestionnaireWorker } from './workers/fetchQuestionnaireWorker';

export function* watchQuestionnaire() {
    yield takeEvery(types.FETCH_QUESTIONNAIRE_ASYNC, fetchQuestionnaireWorker);
}
