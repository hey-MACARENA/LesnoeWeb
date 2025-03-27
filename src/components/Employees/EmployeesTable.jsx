import { DeleteTwoTone } from '@ant-design/icons';
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
    {
      title: '',
      key: 'action',
      render: (text, record) => (
        <DeleteTwoTone onClick={() => handleDelete(record.employee_id)}></DeleteTwoTone>
      ),
    },
  ]

  const handleDelete = (employeeId) => {
    props.dispatch(props.deleteEmployee(employeeId, props.teamFilter, props.sortFilter));
  };

  return ( 
    <Table
      dataSource={props.employees}
      columns={columns}
    />
  );
}

export default EmployeesTable;