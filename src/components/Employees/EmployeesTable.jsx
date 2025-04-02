import { CheckSquareTwoTone, CloseSquareTwoTone, DeleteTwoTone, EditTwoTone } from '@ant-design/icons';
import { Table, Form, Input, Select, InputNumber, Popconfirm } from 'antd';
import React, { useState } from 'react';

const { Option } = Select;

function EmployeesTable(props) {
  const [editingEmployeeId, setEditingEmployeeId] = useState(null);
  const [form] = Form.useForm();

  const handleEdit = (record) => {
    setEditingEmployeeId(record.employee_id);
    form.setFieldsValue({
      name: record.name,
      position: record.position_id,
      section: record.section_id,
      team: record.team_id,
      work_experience: record.work_experience,
      residence: record.residence,
    });
  };

  const handleSave = async (employeeId) => {
    try {
      const values = await form.validateFields();
      props.dispatch(props.editEmployee(employeeId, values, props.teamFilter, props.sortFilter));
      setEditingEmployeeId(null);
      form.resetFields();
    } catch (error) {
      console.error('Ошибка валидации:', error);
    }
  };

  const handleCancel = () => {
    setEditingEmployeeId(null);
    form.resetFields();
  };

  const handleDelete = (employeeId) => {
    props.dispatch(props.deleteEmployee(employeeId, props.teamFilter, props.sortFilter));
  };

  const columns = [
    {
      title: 'Имя',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        editingEmployeeId === record.employee_id ? (
          <Form.Item
            name="name"
            rules={[{ required: true, message: 'Это обязательное поле' }]}
          >
            <Input placeholder="Введите имя" maxLength={30} />
          </Form.Item>
        ) : text
      ),
    },
    {
      title: 'Должность',
      dataIndex: 'position_name',
      key: 'position_name',
      render: (text, record) => (
        editingEmployeeId === record.employee_id ? (
          <Form.Item
            name="position"
            rules={[{ required: true, message: 'Это обязательное поле' }]}
          >
            <Select allowClear placeholder="Выберите должность">
              {props.positions.map((position) => (
                <Option key={position.position_id} value={position.position_id}>
                  {position.position_name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        ) : text
      ),
    },
    {
      title: 'Квартал',
      dataIndex: 'section_name',
      key: 'section_name',
      render: (text, record) => (
        editingEmployeeId === record.employee_id ? (
          <Form.Item name="section">
            <Select allowClear placeholder="Выберите квартал">
              {props.sections.map((section) => (
                <Option key={section.section_id} value={section.section_id}>
                  {section.section_name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        ) : text
      ),
    },
    {
      title: 'Команда',
      dataIndex: 'team_name',
      key: 'team_name',
      render: (text, record) => (
        editingEmployeeId === record.employee_id ? (
          <Form.Item name="team">
            <Select allowClear placeholder="Выберите бригаду">
              {props.teams.map((team) => (
                <Option key={team.team_id} value={team.team_id}>
                  {team.team_name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        ) : text
      ),
    },
    {
      title: 'Опыт',
      dataIndex: 'work_experience',
      key: 'work_experience',
      render: (text, record) => (
        editingEmployeeId === record.employee_id ? (
          <Form.Item
            name="work_experience"
            rules={[{ required: true, message: 'Это обязательное поле' }]}
          >
            <InputNumber min={0} max={99} placeholder="Введите опыт" style={{ width: '100%' }} />
          </Form.Item>
        ) : text
      ),
    },
    {
      title: 'Адрес',
      dataIndex: 'residence',
      key: 'residence',
      render: (text, record) => (
        editingEmployeeId === record.employee_id ? (
          <Form.Item
            name="residence"
            rules={[{ required: true, message: 'Это обязательное поле' }]}
          >
            <Input placeholder="Введите адрес" maxLength={50} />
          </Form.Item>
        ) : text
      ),
    },
    {
      title: 'Действия',
      key: 'actions',
      render: (text, record) => (
        editingEmployeeId === record.employee_id ? (
          <div style={{display:'flex', justifyContent:'space-around'}}>
            <CheckSquareTwoTone onClick={() => handleSave(record.employee_id)}>
            </CheckSquareTwoTone>
            <CloseSquareTwoTone onClick={handleCancel}>
            </CloseSquareTwoTone>
          </div>
        ) : (
          <div style={{display:'flex', justifyContent:'space-around'}}>
            <EditTwoTone onClick={() => handleEdit(record)}/>
            <Popconfirm title="Точно?" okText="Да" cancelText="Нет" onConfirm={() => handleDelete(record.employee_id)}>
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
        dataSource={props.employees}
        columns={columns}
        rowKey="employee_id"
      />
    </Form>
  );
}

export default EmployeesTable;