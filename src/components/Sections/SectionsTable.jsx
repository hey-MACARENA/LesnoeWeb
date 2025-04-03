import { CheckSquareTwoTone, CloseSquareTwoTone, DeleteTwoTone, EditTwoTone } from '@ant-design/icons';
import { Table, Form, Input, Select, InputNumber, Popconfirm } from 'antd';
import React, { useState } from 'react';

const { Option } = Select;

function SectionsTable(props) {
  const [editingSectionId, setEditingSectionId] = useState(null);
  const [form] = Form.useForm();

  const handleEdit = (record) => {
    
    console.log(props.fireHazardLevels);
    setEditingSectionId(record.section_id);
    form.setFieldsValue({
      section_name: record.section_name,
      territory_type: record.territory_type,
      section_area: record.section_area,
      cutting_age: record.cutting_age,
      fire_hazard_level: record.fire_hazard_level,
    });
  };

  const handleSave = async (sectionId) => {
    try {
      const values = await form.validateFields();
      props.dispatch(props.editSection(sectionId, values, props.sortFilter));
      setEditingSectionId(null);
      form.resetFields();
    } catch (error) {
      console.error('Ошибка валидации:', error);
    }
  };

  const handleCancel = () => {
    setEditingSectionId(null);
    form.resetFields();
  };

  const handleDelete = (sectionId) => {
    props.dispatch(props.deleteSection(sectionId, props.sortFilter));
  };

  const columns = [
    {
      title: 'Название',
      dataIndex: 'section_name',
      key: 'section_name',
      render: (text, record) => (
        editingSectionId === record.section_id ? (
          <Form.Item
            name="section_name"
            rules={[{ required: true, message: 'Это обязательное поле' }]}
          >
            <Input placeholder="Введите название" maxLength={30} />
          </Form.Item>
        ) : text
      ),
    },
    {
      title: 'Порода',
      dataIndex: 'territory_type',
      key: 'territory_type',
      render: (text, record) => (
        editingSectionId === record.section_id ? (
          <Form.Item
            name="territory_type"
            rules={[{ required: true, message: 'Это обязательное поле' }]}
          >
            <Select allowClear placeholder="Выберите породу">
              {props.territories.map((territory) => (
                <Option key={territory.territory_id} value={territory.territory_id}>
                  {territory.territory_type}
                </Option>
              ))}
            </Select>
          </Form.Item>
        ) : text
      ),
    },
    {
      title: 'Площадь',
      dataIndex: 'section_area',
      key: 'section_area',
      render: (text, record) => (
        editingSectionId === record.section_id ? (
          <Form.Item
            name="section_area"
            rules={[{ required: true, message: 'Это обязательное поле' }]}
          >
            <InputNumber min={0} placeholder="Введите площадь" style={{ width: '100%' }} />
          </Form.Item>
        ) : text
      ),
    },
    {
      title: 'Возраст',
      dataIndex: 'cutting_age',
      key: 'cutting_age',
      render: (text, record) => (
        editingSectionId === record.section_id ? (
          <Form.Item
            name="cutting_age"
            rules={[{ required: true, message: 'Это обязательное поле' }]}
          >
            <InputNumber min={0} max={999} placeholder="Введите возраст" style={{ width: '100%' }} />
          </Form.Item>
        ) : text
      ),
    },
    {
      title: 'Уровень пожарной опасности',
      dataIndex: 'fire_hazard_level',
      key: 'fire_hazard_level',
      render: (text, record) => (
        editingSectionId === record.section_id ? (
          <Form.Item
            name="fire_hazard_level"
            rules={[{ required: true, message: 'Это обязательное поле' }]}
          >
            <Select allowClear placeholder="Выберите уровень пожарной опасности">
              {props.fireHazardLevels.map((fireHazardLevel) => (
                <Option key={fireHazardLevel.fire_hazard_level_id} value={fireHazardLevel.fire_hazard_level_id}>
                  {fireHazardLevel.fire_hazard_level}
                </Option>
              ))}
            </Select>
          </Form.Item>
        ) : text
      ),
    },
    {
      title: 'Действия',
      key: 'actions',
      render: (text, record) => (
        editingSectionId === record.section_id ? (
          <div style={{display:'flex', justifyContent:'space-around'}}>
            <CheckSquareTwoTone onClick={() => handleSave(record.section_id)}>
            </CheckSquareTwoTone>
            <CloseSquareTwoTone onClick={handleCancel}>
            </CloseSquareTwoTone>
          </div>
        ) : (
          <div style={{display:'flex', justifyContent:'space-around'}}>
            <EditTwoTone onClick={() => handleEdit(record)}/>
            <Popconfirm title="Точно?" okText="Да" cancelText="Нет" onConfirm={() => handleDelete(record.section_id)}>
              <DeleteTwoTone  />
            </Popconfirm>
          </div>
        )
      ),
    },
  ];

  return (
    <Form form={form} component={false}>
      <Table
        dataSource={props.sections}
        columns={columns}
        rowKey="section_id"
      />
    </Form>
  );
}

export default SectionsTable;