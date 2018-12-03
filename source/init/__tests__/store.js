// Store
import { store } from '../store';

describe('store:', () => {
    test('should have a valid state shape', () => {
        expect(store.getState()).toMatchSnapshot();
    });
});
