// Core
import { createStore } from 'redux';
import { connectRouter } from 'connected-react-router';

// Roots
import { rootReducer } from './rootReducer';
import { rootSaga } from './rootSaga';

// Middleware
import { enhancedStore, sagaMiddleware, history } from './middleware/core';

const store = createStore(connectRouter(history)(rootReducer), enhancedStore);

sagaMiddleware.run(rootSaga);

export { store, history };
