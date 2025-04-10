import { Col, Row, Typography, Button, Form } from "antd";
import React from "react";
import ItemText from "../FormItems/ItemText";
import ItemNumber from "../FormItems/ItemNumber";
import ItemSelect from "../FormItems/ItemSelect";
import ItemRange from "../FormItems/ItemRange";
import ItemDate from "../FormItems/ItemDate";
import ItemList from "../FormItems/ItemList";

const { Text } = Typography;

export const renderField = (props, column) => {
  let customRules = [];
  let id;
  let settings = [];

  if (column) {
      id = column.id;
      customRules = column.required === false ? [{ required: false }] : [{ required: true, message: "Это обязательное поле" }];
      settings = { ...column.settings };
  }

  const { maxChar, minNum, maxNum, intOnly, url } = settings;

  switch (column.type) {
    case "text":
      return <ItemText id={id} customRules={customRules} maxChar={maxChar} />;
    case "number":
      return (
        <ItemNumber
          id={id}
          customRules={customRules}
          minNum={minNum}
          maxNum={maxNum}
          intOnly={intOnly}
        />
      );
    case "select":
      return (
        <ItemSelect
          id={id}
          customRules={customRules}
          url={url}
          extras={props.extras}
          dispatch={props.dispatch}
          fetchExtras={props.fetchExtras}
        />
      );
    case "list":
      return (
        <ItemList
          id={id}
          customRules={customRules}
          url={url}
          extras={props.extras}
          dispatch={props.dispatch}
          fetchExtras={props.fetchExtras}
        />
        );
    case "date":
      return <ItemDate id={id} customRules={customRules} />;
    case "start_date":
      return <ItemRange id={id} customRules={customRules} />;
    default:
      return null;
  }
};

function MainAdder(props) {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log(values);
    props.dispatch(props.addNewRow(props.url, props.crudUrl, values));
    form.resetFields();
  };

  return (
    <>
      <Row>
        {props.columns?.map((column) => (
          <Col span={column.type === "number" ? 2 : 3}>
            <Text>{column.label}</Text>
          </Col>
        ) || [])}
      </Row>

      <Form layout="inline" form={form} onFinish={onFinish}>
        <Row style={{ width: "100%" }}>
          {props.columns?.map((column) => (
            <Col
              key={column.name}
              span={
                column.type === "number"
                  ? 2
                  : column.type === "start_date"
                  ? 6
                  : column.type === "end_date"
                  ? 0
                  : 3
              }
            >
              {renderField(props, column)}
            </Col>
          ) || [])}
          <Col>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Добавить
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
}

export default MainAdder;
