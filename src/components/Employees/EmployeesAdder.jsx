import { Col, Row, Typography, Button, Form, Input, Select, Space } from "antd";
import React from "react";

const { Text } = Typography;
const { Option } = Select;

function EmployeesAdder(props) {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <>
      <Row>
        <Col span={4}>
          <Text>Имя</Text>
        </Col>
        <Col span={3}>
          <Text>Должность</Text>
        </Col>
        <Col span={3}>
          <Text>Квартал</Text>
        </Col>
        <Col span={3}>
          <Text>Бригада</Text>
        </Col>
        <Col span={3}>
          <Text>Опыт</Text>
        </Col>
        <Col span={4}>
          <Text>Адрес</Text>
        </Col>
      </Row>

      <Form layout="inline" form={form} onFinish={onFinish}>
        <Row>
          <Col span={4}>
            <Form.Item name="name" rules={[{ required: true }]}>
              <Input placeholder="Введите имя" />
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item name="position" rules={[{ required: true }]}>
              <Select allowClear placeholder="Выберите должность">
                {props.positions.map((position) => (
                  <Option key={position.position_id} value={position.position_id}>
                    {position.position_name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item name="section" rules={[{ required: true }]}>
              <Select allowClear placeholder="Выберите квартал">
                {props.sections.map((section) => (
                  <Option key={section.section_id} value={section.section_id}>
                    {section.section_name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item name="team" rules={[{ required: true }]}>
              <Select allowClear placeholder="Выберите бригаду">
                {props.teams.map((team) => (
                  <Option key={team.team_id} value={team.team_id}>
                    {team.team_name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item name="work_experience" rules={[{ required: true }]}>
              <Input placeholder="Введите опыт" />
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item name="residence" rules={[{ required: true }]}>
              <Input placeholder="Введите адрес" />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
}

export default EmployeesAdder;
