import { Col, Row, Dropdown, Space, Typography } from "antd";
import { DownOutlined } from "@ant-design/icons";
import React, { useState } from "react";

const { Title } = Typography;

function EmployeesHeader(props) {
  const [filter, setFilter] = useState(null);
  const [team, setTeam] = useState(null);

  const handleFilterChange = (e) => {
    e.preventDefault();

    let _filter = e.target.dataset.key;
    setFilter(_filter);
    props.dispatch(props.fetchEmployees(team, _filter));
  };

  const handleTeamChange = (e) => {
    e.preventDefault();

    let _team = e.target.dataset.key;
    setTeam(_team);
    props.dispatch(props.fetchEmployees(_team, filter));
  };

  const sortItems = [
    {
      key: "1",
      label: (
        <a
          data-key={'name'}
          rel="noopener noreferrer"
          onClick={handleFilterChange}
        >
          ФИО
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          data-key={'section'}
          rel="noopener noreferrer"
          onClick={handleFilterChange}
        >
          Кварталы
        </a>
      ),
    },
    {
      key: "3",
      label: (
        <a
          data-key={'position'}
          rel="noopener noreferrer"
          onClick={handleFilterChange}
        >
          Должности
        </a>
      ),
    },
    {
      key: "4",
      label: (
        <a
          data-key={'residence'}
          rel="noopener noreferrer"
          onClick={handleFilterChange}
        >
          Адрес
        </a>
      ),
    },
    {
      key: "5",
      label: (
        <a
          data-key={'experience'}
          rel="noopener noreferrer"
          onClick={handleFilterChange}
        >
          Опыт
        </a>
      ),
    },
  ];

  const teamsItems = [
    {
      key: "-1",
      label: (
        <a data-key={null} rel="noopener noreferrer" onClick={handleTeamChange}>
          {"Все"}
        </a>
      ),
    },
    ...props.teams.map((team) => ({
      key: team.team_id.toString(),
      label: (
        <a
          data-key={team.team_id.toString()}
          rel="noopener noreferrer"
          onClick={handleTeamChange}
        >
          {team.team_name}
        </a>
      ),
    })),
  ];

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
        <Col span={3}>
          <Dropdown
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
          </Dropdown>
        </Col>
        <Col span={2} offset={15}>
          <Title level={4}>Всего: {props.count}</Title>
        </Col>
      </Row>
    </div>
  );
}

export default EmployeesHeader;
