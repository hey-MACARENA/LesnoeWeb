import { Form, InputNumber } from "antd";
import React from "react";

function ItemNumber(props) {
  return (
    <>
      <Form.Item name={props.id} rules={props.customRules}>
        <InputNumber
          placeholder="Введите"
          min={props.minNum}
          max={props.maxNum}
          step={props.intOnly ? 1 : undefined}
          formatter={props.intOnly ? (value) => `${value}`.replace(/\D+/g, "") : undefined}
          parser={props.intOnly ? (value) => value.replace(/\D+/g, "") : undefined}
        />
      </Form.Item>
    </>
  );
}

export default ItemNumber;
