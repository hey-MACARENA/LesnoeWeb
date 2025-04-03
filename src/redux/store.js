import { configureStore } from "@reduxjs/toolkit";
import employeesReducer from './employeesReducer';
import sectionsReducer from './sectionsReducer';

const store = configureStore({
    reducer: {
        employees: employeesReducer,
        sections: sectionsReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(), 
});

export default store;