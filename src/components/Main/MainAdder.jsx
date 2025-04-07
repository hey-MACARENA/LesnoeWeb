import {
  Col,
  Row,
  Typography,
  Button,
  Form,
} from "antd";
import React from "react";
import ItemText from "../FromItems/ItemText";
import ItemNumber from "../FromItems/ItemNumber";
import ItemSelect from "../FromItems/ItemSelect";
import ItemRange from "../FromItems/ItemRange";
import ItemDate from "../FromItems/ItemDate";

const { Text } = Typography;

function MainAdder(props) {
  const [form] = Form.useForm();

  const renderField = (column) => {
    let id = '';
    let customRules = [];
    let maxChar = 0;
    let minNum = 0;
    let maxNum = 0;
    let intOnly = true;
    let url = '';

    if (column) {
      id = column.id;
      customRules = column.required === false ? [{ required: false }] :[{ required: true, message: 'Это обязательное поле' }];
      maxChar = column.settings.maxChar;
      minNum = column.settings.minNum;
      maxNum = column.settings.maxNum;
      intOnly = column.settings.intOnly;
      url = column.settings.url;
    }

    switch (column.type) {
      case 'text':
        return <ItemText id={id} customRules={customRules} maxChar={maxChar} />;
      case 'number':
        return <ItemNumber id={id} customRules={customRules} minNum={minNum} maxNum={maxNum} intOnly={intOnly} />;
      case 'select':
        return <ItemSelect id={id} customRules={customRules} url={url} extras={props.extras}  dispatch={props.dispatch} fetchExtras={props.fetchExtras}/>;
      case 'date':
        return <ItemDate id={id} customRules={customRules} />;
      case 'start_date':
        return <ItemRange id={id} customRules={customRules} />;
      default:
        return null;
    }
  };

  const onFinish = (values) => {
    props.dispatch(props.addNewRow(props.url, props.crudUrl, values));
    form.resetFields();
  };

  return (
    <>
      <Row>
        {props.columns.map((column) => 
          <Col span={column.type === 'number' ? 2 : 3}>
            <Text>{column.label}</Text>
          </Col>
        )}
      </Row>

      <Form layout="inline" form={form} onFinish={onFinish}>
        <Row style={{ width: "100%" }}>
          {props.columns.map((column) => (
          <Col key={column.name} span={column.type === 'number' ? 2 : column.type === 'start_date' ? 6 : 3}>
            {renderField(column)}
          </Col>
          ))}
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
