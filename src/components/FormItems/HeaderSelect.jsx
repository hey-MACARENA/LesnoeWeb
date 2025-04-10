import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import React, { useEffect } from "react";

function HeaderSelect(props) {
  useEffect(() => {
    props.dispatch(props.fetchExtras(props.extrasUrl));
  }, []);

  useEffect(() => {
    props.dispatch(props.fetchData(props.url, props.currentSort, props.currentFilters));
  }, [props.dispatch, props.currentFilters]);

  const handleFilterChange = (e) => {
    e.preventDefault();

    const keyField = e.target.dataset.keyField;
    const filterName = e.target.dataset.key;
    props.dispatch(props.changeCurrentFilter({key: keyField, value: filterName}));
  };

  const filterItems = !props.extras[props.extrasUrl]
    ? []
    : [
        ...props.extras[props.extrasUrl].map((option) => {
          const keys = Object.keys(option);
          const keyField = keys[0];
          const labelField = keys[1];

          return {
            key: option[keyField],
            label: (
              <a
                data-key-field={props?.name || ''}
                data-key={option[keyField]}
                rel="noopener noreferrer"
                onClick={handleFilterChange}
              >
                {option[labelField]}
              </a>
            ),
          }
        }),
      ];

  return (
    <>
      <Dropdown
        menu={{
          items: props.allowAll ?
          [
          {
            key: null,
            label: (
              <a
                data-key-field={props?.name || ''}
                data-key={null}
                rel="noopener noreferrer"
                onClick={handleFilterChange}
              >
                Все
              </a>
            ),
          }, ...filterItems ]
          : filterItems,
        }}
      >
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            {props.label}
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
    </>
  );
}

export default HeaderSelect;
