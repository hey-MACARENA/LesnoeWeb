import { Col, Row, Dropdown, Space, Typography } from "antd";
import { DownOutlined } from "@ant-design/icons";
import React from "react";
import HeaderSelect from "../FormItems/HeaderSelect";
import HeaderRange from "../FormItems/HeaderRange";

const { Title } = Typography;

const renderFilter = (props, filter) => {
  const { name, label, settings } = filter;
  const extrasUrl = settings?.url || "";
  const allowAll = settings?.allowAll || false;

  switch (filter.type) {
    case "select":
      return (
        <HeaderSelect
          url={props.url}
          name={name}
          label={label}
          extrasUrl={extrasUrl}
          allowAll={allowAll}
          extras={props.extras}
          currentSort={props.currentSort}
          currentFilters={props.currentFilters}
          dispatch={props.dispatch}
          fetchData={props.fetchData}
          fetchExtras={props.fetchExtras}
          changeCurrentFilter={props.changeCurrentFilter}
        />
      );
    case "start_date":
      return <HeaderRange
        url={props.url}
        name={name}
        currentSort={props.currentSort}
        currentFilters={props.currentFilters}
        dispatch={props.dispatch}
        fetchData={props.fetchData}
        changeCurrentFilter={props.changeCurrentFilter}
      />;
    default:
      return null;
  }
};

function MainHeader(props) {
  const handleSortChange = (e) => {
    e.preventDefault();

    let sortName = e.target.dataset.key;
    props.dispatch(props.changeCurrentSort(sortName));
    props.dispatch(props.fetchData(props.url, sortName, props.currentFilters));
  };

  const sortItems = !props.sorts
    ? []
    : [
        ...props.sorts.map((sort) => ({
          key: sort?.name || '',
          label: (
            <a
              data-key={sort?.name || ''}
              rel="noopener noreferrer"
              onClick={handleSortChange}
            >
              {sort?.label || ''}
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
        {(props.filters || [])
        .map((filter) => {
          return (
            <Col
              key={filter.name}
              span={
                filter.type === "select"
                  ? 3
                  : filter.type === "start_date"
                  ? 6
                  : filter.type === "end_date"
                  ? 0
                  : 3
              }
            >
              {renderFilter(props, filter)}
            </Col>
          );
        })}
      </Row>
    </div>
  );
}

export default MainHeader;
