import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
import userReducer from '../reducers/userReducer';
import teacherReducer from '../reducers/teacherReducer';

let reducers = combineReducers({
    registerPage: userReducer,
    teacherPage: teacherReducer
});

let store = createStore(reducers, applyMiddleware(thunk));

export default store;