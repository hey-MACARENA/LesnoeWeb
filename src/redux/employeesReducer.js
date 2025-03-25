import { createSlice } from "@reduxjs/toolkit";
import { employeesAPI } from "../api/employeesApi";

const employeesSlice = createSlice({
    name: 'employees',
    initialState: {
        employees: [],
        count: 0,
        teams: [],
        positions: [],
        sections: [],
    },
    reducers: {
        setEmployees: (state, action) => {
            state.employees = action.payload.data;
            state.count = action.payload.count;
        },
        setTeams: (state, action) => {
            state.teams = action.payload;
        },
        setPositions: (state, action) => {
            state.positions = action.payload;
        },
        setSections: (state, action) => {
            state.sections = action.payload.data;
        },
    },
});

export const { setEmployees, setTeams, setPositions, setSections } = employeesSlice.actions;

export const fetchEmployees = (team = null, filter = null) => async (dispatch) => {
    const response = await employeesAPI.getEmployees(team, filter);
    dispatch(setEmployees(response));
};

export const fetchTeams = () => async (dispatch) => {
    const response = await employeesAPI.getTeams();
    dispatch(setTeams(response));
};

export const fetchPositions = () => async (dispatch) => {
    const response = await employeesAPI.getPositions();
    dispatch(setPositions(response));
};

export const fetchSections = () => async (dispatch) => {
    const response = await employeesAPI.getSections();
    dispatch(setSections(response));
};

export default employeesSlice.reducer;