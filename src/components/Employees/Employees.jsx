import React, { useEffect } from 'react';
import EmployeesTable from './EmployeesTable';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployees, fetchTeams } from '../../redux/employeesReducer';
import EmployeesHeader from './EmployeesHeader';
import { Divider } from 'antd';

function Employees() {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees.employees);
  const teams = useSelector((state) => state.employees.teams);

  useEffect(() => {
    dispatch(fetchEmployees());
    dispatch(fetchTeams());
  }, []);


  return (
    <div>
      <Divider> </Divider>
      <EmployeesHeader teams={teams}/>
      <Divider></Divider>
      <EmployeesTable employees={employees}/>
    </div>
  );
}

export default Employees;