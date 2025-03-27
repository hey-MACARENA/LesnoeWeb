import {
  Col,
  Row,
  Typography,
  Button,
  Form,
  Input,
  Select,
  InputNumber,
} from "antd";
import React from "react";

const { Text } = Typography;
const { Option } = Select;

function EmployeesAdder(props) {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    props.dispatch(props.addNewEmployee(values, props.teamFilter, props.sortFilter));
    form.resetFields();
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
        <Col span={2}>
          <Text>Опыт</Text>
        </Col>
        <Col span={4}>
          <Text>Адрес</Text>
        </Col>
      </Row>

      <Form layout="inline" form={form} onFinish={onFinish}>
        <Row style={{ width: "100%" }}>
          <Col span={4}>
            <Form.Item name="name" rules={[{ required: true, message: 'Это обязательное поле' }]}>
              <Input placeholder="Введите имя" maxLength={30}/>
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item name="position" rules={[{ required: true, message: 'Это обязательное поле' }]}>
              <Select allowClear placeholder="Выберите должность">
                {props.positions.map((position) => (
                  <Option
                    key={position.position_id}
                    value={position.position_id}
                  >
                    {position.position_name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item name="section" >
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
            <Form.Item name="team" >
              <Select allowClear placeholder="Выберите бригаду">
                {props.teams.map((team) => (
                  <Option key={team.team_id} value={team.team_id}>
                    {team.team_name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={2}>
            <Form.Item name="work_experience" rules={[{ required: true, message: 'Это обязательное поле' }]}>
              <InputNumber min={0} max={99} placeholder="Введите опыт" style={{width: '100%'}}/>
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item name="residence" rules={[{ required: true, message: 'Это обязательное поле' }]}>
              <Input placeholder="Введите адрес" maxLength={50}/>
            </Form.Item>
          </Col>
          <Col offset={2}>
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

export default EmployeesAdder;
