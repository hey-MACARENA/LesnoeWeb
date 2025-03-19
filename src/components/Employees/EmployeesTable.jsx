import { Table } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

function EmployeesTable() {
  const list = useSelector((state) => state.employees.list);
  const dispatch = useDispatch();

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
  ]

  return ( 
    <Table
      dataSource={list}
      columns={columns}
        theme="dark"
    />
  );
}

export default EmployeesTable;