import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Divider } from "antd";
import SectionsHeader from "./SectionsHeader";
import SectionsTable from "./SectionsTable";
import {
  addNewSection,
  deleteSection,
  editSection,
  fetchFireHazardLevels,
  fetchSections,
  fetchTerritories,
  setFilters,
} from "../../redux/sectionsReducer";
import SectionsAdder from "./SectionsAdder";

function Sections() {
  const dispatch = useDispatch();

  const sections = useSelector((state) => state.sections.sections);
  const count = useSelector((state) => state.sections.count);

  const territories = useSelector((state) => state.sections.territories);
  const fireHazardLevels = useSelector((state) => state.sections.fireHazardLevels);

  const sortFilter = useSelector((state) => state.sections.sortFilter);

  useEffect(() => {
    dispatch(fetchSections());
    dispatch(fetchTerritories());
    dispatch(fetchFireHazardLevels());
  }, []);

  return (
    <div>
      <Divider> </Divider>
      <SectionsHeader
        dispatch={dispatch}
        fetchSections={fetchSections}
        count={count}
        setFilters={setFilters}
        sortFilter={sortFilter}
      />
      <SectionsAdder 
        dispatch={dispatch}
        addNewSection={addNewSection}
        territories={territories}
        fireHazardLevels={fireHazardLevels}
        sortFilter={sortFilter}
      />
      <Divider></Divider>
      <SectionsTable
        dispatch={dispatch}
        deleteSection={deleteSection}
        editSection={editSection}
        sections={sections}
        territories={territories}
        fireHazardLevels={fireHazardLevels}
        sortFilter={sortFilter}
      />
    </div>
  );
}

export default Sections;
