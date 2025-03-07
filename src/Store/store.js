import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import userReducer from '../reducers/userReducer';
import teacherReducer from '../reducers/teacherReducer';
import deaneryReducer from '../reducers/deaneryReducer';
import deanReducer from '../reducers/deanReducer';

let reducers = combineReducers({
    registerPage: userReducer,
    teacherPage: teacherReducer,
    deaneryPage: deaneryReducer,
    deanPage: deanReducer

});

let store = createStore(reducers, applyMiddleware(thunk));

export default store;