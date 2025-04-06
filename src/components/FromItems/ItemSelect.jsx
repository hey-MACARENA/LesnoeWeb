import { Form, Select } from "antd";
import React, { useEffect } from "react";

function ItemSelect(props) {
  useEffect(() => {
    props.dispatch(props.fetchExtras(props.url));
  }, []);

  return (
    <>
      <Form.Item name={props.id} rules={props.customRules}>
        <Select placeholder="Выберите">
          {!props.extras[props.url]
            ? []
            : props.extras[props.url].map((option) => {
                const keys = Object.keys(option);
                const keyField = keys[0];
                const labelField = keys[1];

                return (
                  <Select.Option
                    key={option[keyField]}
                    value={option[keyField]}
                  >
                    {option[labelField]}
                  </Select.Option>
                );
              })}
        </Select>
      </Form.Item>
    </>
  );
}

export default ItemSelect;
