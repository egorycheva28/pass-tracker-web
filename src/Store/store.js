import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
import userReducer from '../reducers/userReducer';

let reducers = combineReducers({
    registerPage: userReducer
});

let store = createStore(reducers, applyMiddleware(thunk));

export default store;