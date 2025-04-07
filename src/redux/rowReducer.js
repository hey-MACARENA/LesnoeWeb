import { createSlice } from "@reduxjs/toolkit";
import { rowAPI } from "../api/rowApi";

const rowSlice = createSlice({
    name: 'rows',
    initialState: {
        url: '',
        crudUrl: '',
        idName: '',
        columns: [],
        rows: [],
        totalRows: 0,
        extras: { },
        teamFilter: null,
        sortFilter: null,
    },
    reducers: {
        setUrl: (state, acion) => {
            state.url = acion.payload;
        },
        setCrudUrl: (state, acion) => {
            state.crudUrl = acion.payload;
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
        setExtras: (state, action) => {
            state.extras[action.payload.url] = action.payload.response;
        },
    },
});

export const { setUrl, setCrudUrl, setIdName, setComlumns, setRows, setFilters, setExtras } = rowSlice.actions;

export const fetchData = (url) => async (dispatch) => {
    const response = await rowAPI.getData(url);
    dispatch(setCrudUrl(response.crudUrl));
    dispatch(setIdName(response.idName));
    dispatch(setComlumns(response.columns));
    dispatch(setRows({ rows: response.rows, totalRows: response.totalRows }));
};

export const fetchExtras = (url) => async (dispatch) => {
    const response = await rowAPI.getExtras(url);
    dispatch(setExtras({ url: url, response: response }));
}

export const addNewRow = (url, crudUrl, newRow) => async (dispatch) => {
    let transformedRow = newRow;

    if (newRow.start_date) {
    transformedRow = {
            ...newRow,
            start_date: new Date(newRow.start_date[0]).toISOString().split('T')[0],
            end_date: new Date(newRow.start_date[1]).toISOString().split('T')[0]
        };
    }

    if (newRow.departure_date) {
    transformedRow = {
            ...newRow,
            departure_date: new Date(newRow.departure_date).toISOString().split('T')[0],
        };
    }

    console.log(transformedRow);
    await rowAPI.postRow(crudUrl, transformedRow);
    const response = await rowAPI.getData(url);
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