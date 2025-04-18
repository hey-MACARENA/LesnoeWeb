import {
  DatePicker,
  Form,
} from "antd";
import React from "react";

function ItemDate(props) {

  return (
    <>
      <Form.Item name={ props.id } rules={props.customRules}>
        <DatePicker placeholder="Введите"/>
      </Form.Item>
    </>
  );
}

export default ItemDate;
