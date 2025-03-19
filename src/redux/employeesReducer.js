import { createSlice } from "@reduxjs/toolkit";

const employeesSlice = createSlice({
    name: 'employees',
    initialState: {
        list: [
            {id: 1, name: 'AAA'},
            {id: 2, name: 'BBB'},
            {id: 3, name: 'CCC'},
        ],
    },
    reducers: {
        setEmployees: (state) => {
            state.list.push({id: 4, name: 'DDD'});
        }
    }
})

export const { setEmployees } = employeesSlice.actions;
export default employeesSlice.reducer;