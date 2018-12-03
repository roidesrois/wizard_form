// Core
import { fromJS, List } from 'immutable';

// Instruments
import { types } from './types';

const initialState = List();

export const questionnaireReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FILL_QUESTIONNAIRE:
            return fromJS(action.payload);

        // case types.SET_QUESTIONNAIRE:
        //     return action.payload;

        default:
            return state;
    }
};
