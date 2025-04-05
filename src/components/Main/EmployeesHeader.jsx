import { Col, Row, Dropdown, Space, Typography } from "antd";
import { DownOutlined } from "@ant-design/icons";
import React from "react";

const { Title } = Typography;

function EmployeesHeader(props) {

  const handleSortChange = (e) => {
    e.preventDefault();

    let sort = e.target.dataset.key;
    let teamFilter = props.teamFilter;
    props.setFilters({teamFilter, sort});
    props.dispatch(props.fetchEmployees(props.teamFilter, sort));
  };

  const handleTeamChange = (e) => {
    e.preventDefault();

    let team = e.target.dataset.key;
    let sortFilter = props.sortFilter;
    props.setFilters({team, sortFilter});
    props.dispatch(props.fetchEmployees(team, props.sortFilter));
  };

  const sortItems = [
    {
      key: "1",
      label: (
        <a
          data-key={null}
          rel="noopener noreferrer"
          onClick={handleSortChange}
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
          onClick={handleSortChange}
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
          onClick={handleSortChange}
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
          onClick={handleSortChange}
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
          onClick={handleSortChange}
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
