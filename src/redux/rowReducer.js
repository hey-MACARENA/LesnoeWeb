import { createSlice } from "@reduxjs/toolkit";
import { rowAPI } from "../api/rowApi";
import dayjs from 'dayjs';

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
        sorts: [],
        currentSort: '',
        filters: [],
        currentFilters: { },
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
        setExtras: (state, action) => {
            state.extras[action.payload.url] = action.payload.response;
        },
        setSorts: (state, action) => {
            state.sorts = action.payload;
        },
        setCurrentSort: (state, action) => {
            state.currentSort = action.payload;
        },
        setFilters: (state, action) => {
            state.filters = action.payload;
        },
        setCurrentFilter: (state, action) => {
            state.currentFilters = ({
                ...state.currentFilters,
                [action.payload['key']]: action.payload['value'],
            });
        },
        nullifyFilters: (state, action) => {
            state.sorts = [];
            state.currentSort = '';
            state.filters = [];
            state.currentFilters = { };
        },
    },
});

export const { setUrl, setCrudUrl, setIdName, setComlumns, setRows, setExtras , setSorts, setCurrentSort, setFilters, setCurrentFilter, nullifyFilters } = rowSlice.actions;

export const fetchData = (url, sortName, currentFilters) => async (dispatch) => {
    const response = await rowAPI.getData(url, sortName, currentFilters);
    dispatch(setCrudUrl(response.crudUrl));
    dispatch(setIdName(response.idName));
    dispatch(setComlumns(response.columns));
    dispatch(setRows({ rows: response.rows, totalRows: response.totalRows }));
    dispatch(setSorts(response.columns?.map(column => (
        column.type !== 'list' ? { name: column.name, label: column.label } : null
    )) || [].filter(number => number !== null)));
    dispatch(setFilters(response.filters));
};

export const fetchExtras = (url) => async (dispatch) => {
    const response = await rowAPI.getExtras(url);
    dispatch(setExtras({ url: url, response: response }));
}

export const changeCurrentSort = (currentSort) => async (dispatch) => {
    dispatch(setCurrentSort(currentSort));
}

export const changeCurrentFilter = (currentFilter) => async (dispatch) => {
    dispatch(setCurrentFilter(currentFilter));
}

export const addNewRow = (url, crudUrl, newRow) => async (dispatch) => {
    let transformedRow = newRow;

    if (newRow.start_date) {
        transformedRow = {
            ...newRow,
            start_date: newRow.start_date[0].format('YYYY-MM-DD'),
            end_date: newRow.start_date[1].format('YYYY-MM-DD')
        };
    }

    for (const key in newRow) {
        if (dayjs.isDayjs(newRow[key])) {
            transformedRow[key] = newRow[key].format('YYYY-MM-DD');
        }
    }

    await rowAPI.postRow(crudUrl, transformedRow);
    const response = await rowAPI.getData(url);
    dispatch(setRows(response));
};

export const editRow = (url, crudUrl, rowId, editableRow) => async (dispatch) => {
    let transformedRow = editableRow;

    if (editableRow.start_date) {
        transformedRow = {
            ...editableRow,
            start_date: editableRow.start_date[0].format('YYYY-MM-DD'),
            end_date: editableRow.start_date[1].format('YYYY-MM-DD')
        };
    }

    for (const key in editableRow) {
        if (dayjs.isDayjs(editableRow[key])) {
            transformedRow[key] = editableRow[key].format('YYYY-MM-DD');
        }
    }
    await rowAPI.putRow(crudUrl, rowId, transformedRow);
    const response = await rowAPI.getData(url);
    dispatch(setRows(response));
}

export const deleteRow = (url, crudUrl, rowId) => async (dispatch) => {
    await rowAPI.deletROw(crudUrl, rowId);
    const response = await rowAPI.getData(url);
    dispatch(setRows(response));
}

export default rowSlice.reducer;