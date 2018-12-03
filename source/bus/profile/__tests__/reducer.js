// Core
import { Map } from 'immutable';

// Instruments
import { profileReducer } from '../reducer';
import { profileActions } from '../actions';

const {
    testData: { userProfile, url },
} = global;

const initialState = Map(userProfile);

describe('profile reducer:', () => {
    test('should return initial state by default', () => {
        expect(profileReducer(void 0, {})).toMatchSnapshot();
    });

    test('should handle fillProfile action', () => {
        expect(
            profileReducer(void 0, profileActions.fillProfile(userProfile)),
        ).toMatchSnapshot();
    });

    test('should handle updateAvatar action', () => {
        expect(
            profileReducer(void 0, profileActions.updateAvatar(url)),
        ).toMatchSnapshot();
    });

    test('should handle clearProfile action', () => {
        expect(
            profileReducer(initialState, profileActions.clearProfile()),
        ).toMatchSnapshot();
    });
});
