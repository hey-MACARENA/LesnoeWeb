import { Col, Row, Dropdown, Space, Typography } from "antd";
import { DownOutlined } from "@ant-design/icons";
import React from "react";

const { Title } = Typography;

function SectionsHeader(props) {

  const handleSortChange = (e) => {
    e.preventDefault();

    let sort = e.target.dataset.key;
    props.setFilters({sort});
    props.dispatch(props.fetchSections(sort));
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
          Название
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          data-key={'section_area'}
          rel="noopener noreferrer"
          onClick={handleSortChange}
        >
          Площадь
        </a>
      ),
    },
    {
      key: "3",
      label: (
        <a
          data-key={'cutting_age'}
          rel="noopener noreferrer"
          onClick={handleSortChange}
        >
          Возраст
        </a>
      ),
    },
    {
      key: "4",
      label: (
        <a
          data-key={'fire_hazard_level'}
          rel="noopener noreferrer"
          onClick={handleSortChange}
        >
          Уровень пожарной опасности
        </a>
      ),
    },
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
        <Col span={2} offset={17}>
          <Title level={4}>Всего: {props.count}</Title>
        </Col>
      </Row>
    </div>
  );
}

export default SectionsHeader;
