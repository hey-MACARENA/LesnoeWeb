import { createSlice } from "@reduxjs/toolkit";
import { sectionsAPI } from "../api/sectionsApi";

const setionsSlice = createSlice({
    name: 'sections',
    initialState: {
        sections: [],
        count: 0,
        sortFilter: null,
        territories: [],
        fireHazardLevels: [],
    },
    reducers: {
        setSections: (state, action) => {
            state.sections = action.payload.data;
            state.count = action.payload.count;
        },
        setFilters: (state, action) => {
            state.sortFilter = action.payload.sort;
        },
        setTerritories: (state, action) => {
            state.territories = action.payload;
        },
        setFireHazardLevels: (state, action) => {
            state.fireHazardLevels = action.payload;
        },
    },
});

export const { setSections, setFilters, setTerritories, setFireHazardLevels } = setionsSlice.actions;

export const fetchSections = (sort = null) => async (dispatch) => {
    const response = await sectionsAPI.getSections(sort);
    dispatch(setSections(response));
    dispatch(setFilters({sort}));
};

export const fetchTerritories = () => async (dispatch) => {
    const response = await sectionsAPI.getTerritories();
    dispatch(setTerritories(response));
};

export const fetchFireHazardLevels = () => async (dispatch) => {
    const response = await sectionsAPI.getFireHazardLevels();
    dispatch(setFireHazardLevels(response));
};

export const addNewSection = (newSection, sort = null) => async (dispatch) => {
    await sectionsAPI.postSections(newSection);
    const response = await sectionsAPI.getSections(sort);
    dispatch(setSections(response));
};

export const editSection = (sectionId, values, sort = null) => async (dispatch) => {
    await sectionsAPI.putSection(sectionId, values);
    const response = await sectionsAPI.getSections(sort);
    dispatch(setSections(response));
}

export const deleteSection = (sectionId, sort = null) => async (dispatch) => {
    await sectionsAPI.deleteSection(sectionId);
    const response = await sectionsAPI.getSections(sort);
    dispatch(setSections(response));
}

export default setionsSlice.reducer;