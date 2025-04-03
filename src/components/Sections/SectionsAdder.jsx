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

function SectionsAdder(props) {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    props.dispatch(props.addNewSection(values, props.sortFilter));
    form.resetFields();
  };

  return (
    <>
      <Row>
        <Col span={4}>
          <Text>Название</Text>
        </Col>
        <Col span={3}>
          <Text>Порода</Text>
        </Col>
        <Col span={3}>
          <Text>Площадь</Text>
        </Col>
        <Col span={3}>
          <Text>Возраст</Text>
        </Col>
        <Col span={4}>
          <Text>Уровень пожарной опасности</Text>
        </Col>
      </Row>

      <Form layout="inline" form={form} onFinish={onFinish}>
        <Row style={{ width: "100%" }}>
          <Col span={4}>
            <Form.Item name="section_name" rules={[{ required: true, message: 'Это обязательное поле' }]}>
              <Input placeholder="Введите название" maxLength={30}/>
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item name="territory_type" rules={[{ required: true, message: 'Это обязательное поле' }]}>
              <Select allowClear placeholder="Выберите породу">
                {props.territories.map((territories) => (
                  <Option
                    key={territories.territory_id}
                    value={territories.territory_id}
                  >
                    {territories.territory_type}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item name="section_area" rules={[{ required: true, message: 'Это обязательное поле' }]}>
              <InputNumber min={0} placeholder="Введите площадь" style={{width: '100%'}}/>
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item name="cutting_age" rules={[{ required: true, message: 'Это обязательное поле' }]}>
              <InputNumber min={0} max={999} placeholder="Введите возраст" style={{width: '100%'}}/>
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item name="fire_hazard_level" rules={[{ required: true, message: 'Это обязательное поле' }]}>
              <Select allowClear placeholder="Выберите уровень пожарной опасности">
                {props.fireHazardLevels.map((fireHazardLevel) => (
                  <Option
                    key={fireHazardLevel.fire_hazard_level_id}
                    value={fireHazardLevel.fire_hazard_level_id}
                  >
                    {fireHazardLevel.fire_hazard_level}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col offset={3}>
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

export default SectionsAdder;
