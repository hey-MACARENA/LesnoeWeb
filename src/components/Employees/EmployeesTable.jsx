import { Table } from 'antd';
import React from 'react';

function EmployeesTable(props) {

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
      dataSource={props.employees}
      columns={columns}
    />
  );
}

export default EmployeesTable;