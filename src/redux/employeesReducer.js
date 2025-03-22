import { createSlice } from "@reduxjs/toolkit";
import { employeesAPI } from "../api/employeesApi";

const employeesSlice = createSlice({
    name: 'employees',
    initialState: {
        employees: [],
        count: 0,
        teams: [],
    },
    reducers: {
        setEmployees: (state, action) => {
            state.employees = action.payload.data;
            state.count = action.payload.count;
        },
        setTeams: (state, action) => {
            state.teams = action.payload;
        },
    },
});

export const { setEmployees, setTeams } = employeesSlice.actions;

export const fetchEmployees = () => async (dispatch) => {
    const response = await employeesAPI.getEmployees();
    dispatch(setEmployees(response));
};

export const fetchTeams = () => async (dispatch) => {
    const response = await employeesAPI.getTeams();
    console.log('reducer', response);
    dispatch(setTeams(response));
};

export default employeesSlice.reducer;