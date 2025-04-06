import {
  Form,
  InputNumber,
} from "antd";
import React from "react";

function ItemNumber(props) {

  return (
    <>
      <Form.Item name={ props.id } rules={props.customRules}>
        <InputNumber placeholder="Введите" min={props.minNum} max={props.maxNum}/>
      </Form.Item>
    </>
  );
}

export default ItemNumber;
