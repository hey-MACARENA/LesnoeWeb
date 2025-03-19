import {applyMiddleware, combineReducers} from "redux";
import { thunk } from 'redux-thunk'
import { configureStore } from "@reduxjs/toolkit";
import employeesReducer from './employeesReducer';

const reducers = combineReducers({
    employees: employeesReducer,
});

let store = configureStore({reducer: reducers}, applyMiddleware(thunk));

export default store;