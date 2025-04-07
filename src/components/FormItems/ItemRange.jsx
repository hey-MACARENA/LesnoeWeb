import {
  DatePicker,
  Form,
} from "antd";
import React from "react";
const { RangePicker } = DatePicker;

function ItemRange(props) {

  return (
    <>
      <Form.Item name={ props.id } rules={props.customRules}>
        <RangePicker placeholder="Введите"/>
      </Form.Item>
    </>
  );
}

export default ItemRange;
