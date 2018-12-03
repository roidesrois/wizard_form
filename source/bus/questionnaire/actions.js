// Types
import { types } from './types';

export const questionnaireActions = {
    // Sync
    fillQuestionnaire: (questionnaire) => ({
        type:    types.FILL_QUESTIONNAIRE,
        payload: questionnaire,
    }),

    // setQuestionnaireValidation: (validation) => ({
    //     type:    types.SET_QUESTIONNAIRE,
    //     payload: validation,
    // }),

    // Async
    fetchQuestionnaireAsync: () => ({
        type: types.FETCH_QUESTIONNAIRE_ASYNC,
    }),
};
