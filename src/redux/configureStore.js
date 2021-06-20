import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import commonReducer from '../pages/duck';
import userReducer from '../pages/users/duck';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
//import { countWatcher } from './sagas/countSaga';
//import { userWatcher } from './sagas/userSaga';

const initialState = {};
const rootReducer = combineReducers({
    common: commonReducer,
    user: userReducer,
})

const sagaMiddleware = createSagaMiddleware();
const middlewares = [
    thunk,
    sagaMiddleware
];
const middlewareEnhancer = applyMiddleware(...middlewares);
const enhancers = [];
const composedEnhancers = composeWithDevTools(
    middlewareEnhancer,
    ...enhancers
);

//const store = createStore(rootReducer, initialState , middlewareEnhancer);
const store = createStore(rootReducer, initialState ,composedEnhancers);

//sagaMiddleware.run(userWatcher);

export default store;