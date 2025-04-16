import React, { useEffect } from "react";
import MainTable from "./MainTable";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewRow,
  changeCurrentFilter,
  changeCurrentSort,
  deleteRow,
  editRow,
  fetchData,
  fetchExtras,
  nullifyFilters,
  setUrl,
} from "../../redux/rowReducer";
import { Divider } from "antd";
import { useLocation } from "react-router-dom";
import MainAdder from "./MainAdder";
import MainHeader from "./MainHeader";

function MainContainer() {
  const dispatch = useDispatch();
  const location = useLocation();

  const url = useSelector((state) => state.rows.url);
  const crudUrl = useSelector((state) => state.rows.crudUrl);
  const idName = useSelector((state) => state.rows.idName);
  const columns = useSelector((state) => state.rows.columns);
  const rows = useSelector((state) => state.rows.rows);
  const extras = useSelector((state) => state.rows.extras);
  const totalRows = useSelector((state) => state.rows.totalRows);
  const sorts = useSelector((state) => state.rows.sorts);
  const currentSort = useSelector((state) => state.rows.currentSort);
  const filters = useSelector((state) => state.rows.filters);
  const currentFilters = useSelector((state) => state.rows.currentFilters);

  useEffect(() => {
    dispatch(setUrl(location.pathname));
    dispatch(nullifyFilters());
  }, [dispatch, location.pathname]);

  useEffect(() => {
    if (url) {
      dispatch(fetchData(url));
    }
  }, [dispatch, url]);

  return (
    <div>
      <Divider></Divider>
      <MainHeader 
        dispatch={dispatch}
        fetchData={fetchData}
        fetchExtras={fetchExtras}
        changeCurrentSort={changeCurrentSort}
        changeCurrentFilter={changeCurrentFilter}
        extras={extras}
        url={url}
        totalRows={totalRows}
        sorts={sorts}
        currentSort={currentSort}
        filters={filters}
        currentFilters={currentFilters}
      />
      <MainAdder
        dispatch={dispatch}
        fetchExtras={fetchExtras}
        addNewRow={addNewRow}
        columns={columns}
        extras={extras}
        url={url}
        crudUrl={crudUrl}
      />
      <Divider></Divider>
      <MainTable
        dispatch={dispatch}
        fetchExtras={fetchExtras}
        editRow={editRow}
        deleteRow={deleteRow}
        idName={idName}
        columns={columns}
        rows={rows}
        extras={extras}
        url={url}
        crudUrl={crudUrl}
      />
    </div>
  );
}

export default MainContainer;
