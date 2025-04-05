import React, { useEffect } from "react";
import MainTable from "./MainTable";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, setUrl } from "../../redux/rowReducer";
import { Divider } from "antd";
import { useLocation } from "react-router-dom";

function MainContainer() {
  const dispatch = useDispatch();
  const location = useLocation();

  const url = useSelector((state) => state.rows.url);
  const idName = useSelector((state) => state.rows.idName);
  const columns = useSelector((state) => state.rows.columns);
  const rows = useSelector((state) => state.rows.rows);
  const totalRows = useSelector((state) => state.rows.totalRows);
  
  //const teams = useSelector((state) => state.row.teams);

  useEffect(() => {
    dispatch(setUrl(location.pathname));
  }, [dispatch, location.pathname]);

  useEffect(() => {
    if (url) {
      dispatch(fetchData(url));
      //dispatch(fetchTeams());
    }
  }, [dispatch, url]);

  return (
    <div>
      <Divider></Divider>
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
