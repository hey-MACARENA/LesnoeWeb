import { createSlice } from "@reduxjs/toolkit";
import { employeesAPI } from "../api/employeesApi";

const employeesSlice = createSlice({
    name: 'employees',
    initialState: {
        list: [],
        count: 0,
    },
    reducers: {
        setEmployees: (state, action) => {
            state.list = action.payload.data;
            state.count = action.payload.count;
        },
    },
});

export const { setEmployees } = employeesSlice.actions;

// Асинхронный action creator
export const fetchEmployees = () => async (dispatch) => {
    try {
        const response = await employeesAPI.getEmployees();
        dispatch(setEmployees(response)); // Отправляем данные в редьюсер
    } catch (error) {
        console.error('Failed to fetch employees:', error);
    }
};

export default employeesSlice.reducer;