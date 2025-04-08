import { Col, Row, Dropdown, Space, Typography } from "antd";
import { DownOutlined } from "@ant-design/icons";
import React from "react";

const { Title } = Typography;

function MainHeader(props) {
  const handleSortChange = (e) => {
    e.preventDefault();

    let sortName = e.target.dataset.key;
    props.changeCurrentSort(sortName);
    props.dispatch(props.fetchData(props.url, sortName));
  };

  const sortItems = !props.sorts
    ? []
    : [
        ...props.sorts.map((sort) => ({
          key: sort.name,
          label: (
            <a
              data-key={sort.name}
              rel="noopener noreferrer"
              onClick={handleSortChange}
            >
              {sort.label}
            </a>
          ),
        })),
      ];

  return (
    <div>
      <Row>
        <Col span={2}>
          <Title level={4}>Всего: {props.totalRows}</Title>
        </Col>
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
      </Row>
    </div>
  );
}

export default MainHeader;
