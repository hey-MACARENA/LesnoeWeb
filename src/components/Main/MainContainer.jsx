import React, { useEffect } from "react";
import MainTable from "./MainTable";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewRow,
  fetchData,
  fetchExtras,
  setUrl,
} from "../../redux/rowReducer";
import { Divider } from "antd";
import { useLocation } from "react-router-dom";
import MainAdder from "./MainAdder";

function MainContainer() {
  const dispatch = useDispatch();
  const location = useLocation();

  const url = useSelector((state) => state.rows.url);
  const crudUrl = useSelector((state) => state.rows.crudUrl);
  const idName = useSelector((state) => state.rows.idName);
  const columns = useSelector((state) => state.rows.columns);
  const rows = useSelector((state) => state.rows.rows);
  const totalRows = useSelector((state) => state.rows.totalRows);
  const extras = useSelector((state) => state.rows.extras);

  useEffect(() => {
    dispatch(setUrl(location.pathname));
  }, [dispatch, location.pathname]);

  useEffect(() => {
    if (url) {
      dispatch(fetchData(url));
    }
  }, [dispatch, url]);

  return (
    <div>
      <Divider></Divider>
      <MainAdder
        columns={columns}
        extras={extras}
        url={url}
        crudUrl={crudUrl}
        dispatch={dispatch}
        fetchExtras={fetchExtras}
        addNewRow={addNewRow}
      />
      <Divider></Divider>
      <MainTable
        dispatch={dispatch}
        idName={idName}
        columns={columns}
        rows={rows}
      />
    </div>
  );
}

export default MainContainer;
