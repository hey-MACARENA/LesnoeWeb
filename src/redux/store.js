import { configureStore } from "@reduxjs/toolkit";
import rowReducer from './rowReducer';

const store = configureStore({
    reducer: {
        rows: rowReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(), 
});

export default store;