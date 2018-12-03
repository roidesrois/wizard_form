// Core
import { profileActions } from '../actions';

const {
    testData: { userProfile, url },
} = global;

describe('profile actions:', () => {
    // Sync
    test('fillProfile snapshot', () => {
        expect(profileActions.fillProfile(userProfile)).toMatchSnapshot();
    });

    test('updateAvatar snapshot', () => {
        expect(profileActions.updateAvatar(url)).toMatchSnapshot();
    });

    test('clearProfile snapshot', () => {
        expect(profileActions.clearProfile()).toMatchSnapshot();
    });

    // Async
    test('updateNameAsync snapshot', () => {
        expect(profileActions.updateNameAsync(userProfile)).toMatchSnapshot();
    });

    test('updateAvatarAsync snapshot', () => {
        expect(profileActions.updateAvatarAsync(userProfile)).toMatchSnapshot();
    });

    test('updatePasswordAsync snapshot', () => {
        expect(
            profileActions.updatePasswordAsync(userProfile),
        ).toMatchSnapshot();
    });
});
