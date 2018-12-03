// Core
import { uiActions } from '../actions';

const {
    testData: { error },
} = global;

describe('ui actions:', () => {
    test('startFetching snapshot', () => {
        expect(uiActions.startFetching()).toMatchSnapshot();
    });

    test('stopFetching snapshot', () => {
        expect(uiActions.stopFetching()).toMatchSnapshot();
    });

    test('emitError snapshot', () => {
        expect(uiActions.emitError(error, 'meta info')).toMatchSnapshot();
    });

    test('emitError with fallback params snapshot', () => {
        expect(uiActions.emitError(error, void 0)).toMatchSnapshot();
    });

    test('showNotification snapshot', () => {
        expect(
            uiActions.showNotification('login fail', 'error', 'login worker'),
        ).toMatchSnapshot();
    });

    test('showNotification with fallback params snapshot', () => {
        expect(
            uiActions.showNotification(void 0, 'login fail', void 0),
        ).toMatchSnapshot();
    });

    test('hideNotification', () => {
        expect(uiActions.hideNotification('123')).toMatchSnapshot();
    });

    test('setOnlineState snapshot', () => {
        expect(uiActions.setOnlineState()).toMatchSnapshot();
    });

    test('setOfflineState snapshot', () => {
        expect(uiActions.setOfflineState()).toMatchSnapshot();
    });
});
