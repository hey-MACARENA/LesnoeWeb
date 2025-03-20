import { configureStore } from "@reduxjs/toolkit";
import employeesReducer from './employeesReducer';

const store = configureStore({
    reducer: {
        employees: employeesReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(), 
});

export default store;