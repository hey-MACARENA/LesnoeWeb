import React, { useEffect } from "react";
import EmployeesTable from "./EmployeesTable";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployees, fetchTeams } from "../../redux/employeesReducer";
import EmployeesHeader from "./EmployeesHeader";
import { Divider } from "antd";

function Employees() {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees.employees);
  const teams = useSelector((state) => state.employees.teams);
  const count = useSelector((state) => state.employees.count);

  useEffect(() => {
    dispatch(fetchEmployees());
    dispatch(fetchTeams());
  }, []);

  return (
    <div>
      <Divider> </Divider>
      <EmployeesHeader
        dispatch={dispatch}
        fetchEmployees={fetchEmployees}
        teams={teams}
        count={count}
      />
      <Divider></Divider>
      <EmployeesTable employees={employees} />
    </div>
  );
}

export default Employees;
