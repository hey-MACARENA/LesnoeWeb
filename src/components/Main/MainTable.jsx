import { CheckSquareTwoTone, CloseSquareTwoTone, DeleteTwoTone, EditTwoTone } from '@ant-design/icons';
import { Table, Form, Input, Select, InputNumber, Popconfirm } from 'antd';
import React, { useState } from 'react';

const { Option } = Select;

function MainTable(props) {
  const [editingEmployeeId, setEditingEmployeeId] = useState(null);
  const [form] = Form.useForm();

  const handleEdit = (record) => {
    setEditingEmployeeId(record.employee_id);
    form.setFieldsValue(record);
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

  const tableColumns = [
    ...props.columns.map((column) => ({
      title: column.label,
      dataIndex: column.name, 
      key: column.name,
    })),
    {
      title: 'Действия',
      key: 'actions',
      render: (text, record) => (
        editingEmployeeId === record.employee_id ? (
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <CheckSquareTwoTone onClick={() => handleSave(record.employee_id)} />
            <CloseSquareTwoTone onClick={handleCancel} />
          </div>
        ) : (
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <EditTwoTone onClick={() => handleEdit(record)} />
            <Popconfirm
              title="Точно?"
              okText="Да"
              cancelText="Нет"
              onConfirm={() => handleDelete(record.employee_id)}
            >
              <DeleteTwoTone />
            </Popconfirm>
          </div>
        )
      ),
    },
  ];

  return (
    <Form form={form} component={false}>
      <Table
        dataSource={props.rows}
        columns={tableColumns}
        rowKey={props.idName}
      />
    </Form>
  );
}

export default MainTable;