import React, { useEffect } from "react";
import EmployeesTable from "./EmployeesTable";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchEmployees,
  fetchPositions,
  fetchSections,
  fetchTeams,
} from "../../redux/employeesReducer";
import EmployeesHeader from "./EmployeesHeader";
import { Divider } from "antd";
import EmployeesAdder from "./EmployeesAdder";

function Employees() {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees.employees);
  const teams = useSelector((state) => state.employees.teams);
  const count = useSelector((state) => state.employees.count);
  const positions = useSelector((state) => state.employees.positions);
  const sections = useSelector((state) => state.employees.sections);

  useEffect(() => {
    dispatch(fetchEmployees());
    dispatch(fetchTeams());
    dispatch(fetchPositions());
    dispatch(fetchSections());
    console.log(sections);
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
      <EmployeesAdder positions={positions} sections={sections} teams={teams} />
      <Divider></Divider>
      <EmployeesTable employees={employees} />
    </div>
  );
}

export default Employees;
