import React, { useEffect } from "react";
import EmployeesTable from "./EmployeesTable";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewEmployee,
  deleteEmployee,
  fetchEmployees,
  fetchPositions,
  fetchSections,
  fetchTeams,
  setFilters,
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

  const teamFilter = useSelector((state) => state.employees.teamFilter);
  const sortFilter = useSelector((state) => state.employees.sortFilter);

  useEffect(() => {
    dispatch(fetchEmployees());
    dispatch(fetchTeams());
    dispatch(fetchPositions());
    dispatch(fetchSections(true));
  }, []);

  return (
    <div>
      <Divider> </Divider>
      <EmployeesHeader
        dispatch={dispatch}
        fetchEmployees={fetchEmployees}
        teams={teams}
        count={count}
        setFilters={setFilters}
        teamFilter={teamFilter}
        sortFilter={sortFilter}
      />
      <EmployeesAdder
        dispatch={dispatch}
        addNewEmployee={addNewEmployee}
        positions={positions}
        sections={sections}
        teams={teams}
        teamFilter={teamFilter}
        sortFilter={sortFilter}
      />
      <Divider></Divider>
      <EmployeesTable
        dispatch={dispatch}
        deleteEmployee={deleteEmployee}
        employees={employees}
        teamFilter={teamFilter}
        sortFilter={sortFilter}
      />
    </div>
  );
}

export default Employees;
