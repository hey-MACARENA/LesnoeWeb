import { Table } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployees } from '../../redux/employeesReducer';

function EmployeesTable() {
  const list = useSelector((state) => state.employees.list);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEmployees());
  }, []);

  const columns = [
    {
      title: 'Имя',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Должность',
      dataIndex: 'position_name',
      key: 'position_name',
    },
    {
      title: 'Квартал',
      dataIndex: 'section_name',
      key: 'section_name',
    },
    {
      title: 'Команда',
      dataIndex: 'team_name',
      key: 'team_name',
    },
    {
      title: 'Опыт',
      dataIndex: 'work_experience',
      key: 'work_experience',
    },
    {
      title: 'Адрес',
      dataIndex: 'residence',
      key: 'residence',
    },
  ]

  return ( 
    <Table
      dataSource={list}
      columns={columns}
    />
  );
}

export default EmployeesTable;