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

export const fetchEmployees = (team = null, filter = null) => async (dispatch) => {
    console.log(team, filter);
    const response = await employeesAPI.getEmployees(team, filter);
    dispatch(setEmployees(response));
};

export const fetchTeams = () => async (dispatch) => {
    const response = await employeesAPI.getTeams();
    dispatch(setTeams(response));
};

export default employeesSlice.reducer;