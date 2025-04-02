import { createSlice } from "@reduxjs/toolkit";
import { employeesAPI } from "../api/employeesApi";

const employeesSlice = createSlice({
    name: 'employees',
    initialState: {
        employees: [],
        count: 0,
        teamFilter: null,
        sortFilter: null,
        teams: [],
        positions: [],
        sections: [],
    },
    reducers: {
        setEmployees: (state, action) => {
            state.employees = action.payload.data;
            state.count = action.payload.count;
        },
        setFilters: (state, action) => {
            state.teamFilterFilter = action.payload.team;
            state.sortFilter = action.payload.sort;
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

export const { setEmployees, setFilters, setTeams, setPositions, setSections } = employeesSlice.actions;

export const fetchEmployees = (team = null, sort = null) => async (dispatch) => {
    const response = await employeesAPI.getEmployees(team, sort);
    dispatch(setEmployees(response));
    dispatch(setFilters({team, sort}));
};

export const fetchTeams = () => async (dispatch) => {
    const response = await employeesAPI.getTeams();
    dispatch(setTeams(response));
};

export const fetchPositions = () => async (dispatch) => {
    const response = await employeesAPI.getPositions();
    dispatch(setPositions(response));
};

export const fetchSections = (getClear) => async (dispatch) => {
    const response = await employeesAPI.getSections(getClear);
    dispatch(setSections(response));
};

export const addNewEmployee = (newEmployee, team = null, sort = null) => async (dispatch) => {
    await employeesAPI.postEmployee(newEmployee);
    const response = await employeesAPI.getEmployees(team, sort);
    dispatch(setEmployees(response));
};

export const editEmployee = (employeeId, values, team = null, sort = null) => async (dispatch) => {
    await employeesAPI.putEmployee(employeeId, values);
    const response = await employeesAPI.getEmployees(team, sort);
    dispatch(setEmployees(response));
}

export const deleteEmployee = (employeeId, team = null, sort = null) => async (dispatch) => {
    await employeesAPI.deleteEmployee(employeeId);
    const response = await employeesAPI.getEmployees(team, sort);
    dispatch(setEmployees(response));
}

export default employeesSlice.reducer;