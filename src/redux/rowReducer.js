import { createSlice } from "@reduxjs/toolkit";
import { rowAPI } from "../api/rowApi";

const rowSlice = createSlice({
    name: 'rows',
    initialState: {
        url: '',
        idName: '',
        columns: [],
        rows: [],
        totalRows: 0,
        teamFilter: null,
        sortFilter: null,
        teams: [],
    },
    reducers: {
        setUrl: (state, acion) => {
            state.url = acion.payload;
        },
        setIdName: (state, action) => {
            state.idName = action.payload;
        },
        setComlumns: (state, action) => {
            state.columns = action.payload;
        },
        setRows: (state, action) => {
            state.rows = action.payload.rows;
            state.totalRows = action.payload.totalRows;
        },
        setFilters: (state, action) => {
            state.teamFilterFilter = action.payload.team;
            state.sortFilter = action.payload.sort;
        },
        setTeams: (state, action) => {
            state.teams = action.payload;
        },
    },
});

export const { setUrl, setIdName, setComlumns, setRows, setFilters, setTeams } = rowSlice.actions;

export const fetchData = (url) => async (dispatch) => {
    const response = await rowAPI.getData(url);
    dispatch(setIdName(response.idName));
    dispatch(setComlumns(response.columns));
    dispatch(setRows({ rows: response.rows, totalRows: response.totalRows }));
};

export const fetchTeams = () => async (dispatch) => {
    const response = await rowAPI.getExtras();
    dispatch(setTeams(response));
}

export const addNewEmployee = (newEmployee, team = null, sort = null) => async (dispatch) => {
    await rowAPI.postRow(newEmployee);
    const response = await rowAPI.getData(team, sort);
    dispatch(setRows(response));
};

export const editEmployee = (employeeId, values, team = null, sort = null) => async (dispatch) => {
    await rowAPI.putRow(employeeId, values);
    const response = await rowAPI.getData(team, sort);
    dispatch(setRows(response));
}

export const deleteEmployee = (employeeId, team = null, sort = null) => async (dispatch) => {
    await rowAPI.deleteEmployee(employeeId);
    const response = await rowAPI.getData(team, sort);
    dispatch(setRows(response));
}

export default rowSlice.reducer;