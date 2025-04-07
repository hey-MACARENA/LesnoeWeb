import {
  Form,
  Input,
} from "antd";
import React from "react";

function ItemText(props) {

  return (
    <>
      <Form.Item name={ props.id } rules={props.customRules}>
        <Input placeholder="Введите" maxLength={props.maxChar}/>
      </Form.Item>
    </>
  );
}

export default ItemText;
