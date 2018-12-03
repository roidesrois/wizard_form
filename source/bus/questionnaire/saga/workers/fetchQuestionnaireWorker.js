// Core
import { put, apply } from 'redux-saga/effects';

// Instruments
import { api } from '../../../../API';
import { uiActions } from '../../../ui/actions';
import { questionnaireActions } from '../../actions';

export function* fetchQuestionnaireWorker() {
    try {
        yield put(uiActions.startFetching());

        const questionnaire = yield apply(api, api.questionnaire.get);

        yield put(questionnaireActions.fillQuestionnaire(questionnaire));
    } catch (error) {
        yield put(uiActions.emitError(error, 'fetch questionnaire worker'));
    } finally {
        yield put(uiActions.stopFetching());
    }
}
