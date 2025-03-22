import { Col, Row, Dropdown, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import React from 'react';

const sortItems = [
  {
    key: '1',
    label: (
      <a rel="noopener noreferrer">
        ФИО
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a rel="noopener noreferrer">
        Кварталы
      </a>
    ),
  },
  {
    key: '3',
    label: (
      <a rel="noopener noreferrer">
        Должности
      </a>
    ),
  },
  {
    key: '4',
    label: (
      <a rel="noopener noreferrer">
        Адрес
      </a>
    ),
  },
  {
    key: '5',
    label: (
      <a rel="noopener noreferrer">
        Опыт
      </a>
    ),
  },
];

function EmployeesHeader(props) {
  console.log('props',props);

  const teamsItems = props.teams.map((team) => ({
    key: team.team_id.toString(), // Преобразуем team_id в строку, так как key должен быть строкой
    label: (
      <a rel="noopener noreferrer">
        {team.team_name} {/* Используем team_name как текст внутри тега <a> */}
      </a>
    ),
  }));

return ( 
    <div>
      <Row>
        <Col span={3}>
          <Dropdown
            menu={{
              items: sortItems,
            }}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                Сортировка
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </Col>
        <Col span={3}><Dropdown
            menu={{
              items: teamsItems,
            }}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                Бригады
                <DownOutlined />
              </Space>
            </a>
          </Dropdown></Col>
      </Row>
    </div>
  );
}
    
export default EmployeesHeader;