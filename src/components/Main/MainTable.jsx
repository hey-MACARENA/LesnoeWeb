import {
  CheckSquareTwoTone,
  CloseSquareTwoTone,
  DeleteTwoTone,
  EditTwoTone,
} from "@ant-design/icons";
import { Table, Form, Input, Select, InputNumber, Popconfirm } from "antd";
import React, { useState } from "react";
import { renderField } from "./MainAdder";
import dayjs from "dayjs";

function MainTable(props) {
  const [editingRowId, setEditingRowId] = useState(null);
  const [form] = Form.useForm();

  const handleEdit = (record) => {
    setEditingRowId(record[props.idName]);

    const updatedRecord = { ...record };

    for (const key in updatedRecord) {
      if (key === "start_date") {
        const start_date = dayjs(updatedRecord["start_date"], "YYYY-MM-DD")
        const end_date = dayjs(updatedRecord["end_date"], "YYYY-MM-DD")
        
        updatedRecord["start_date"] = [
          start_date,
          end_date,
        ];
      } else {
        const dateRegex =
          /(19|20)\d\d-((0[1-9]|1[012])-(0[1-9]|[12]\d)|(0[13-9]|1[012])-30|(0[13578]|1[02])-31)/;
        if (dateRegex.test(updatedRecord[key])) {
          updatedRecord[key] = dayjs(updatedRecord[key], "YYYY-MM-DD");
        }
      }
    }
    console.log(updatedRecord);

    form.setFieldsValue(updatedRecord);
  };

  const handleSave = async (idName) => {
    try {
      const values = await form.validateFields();
      props.dispatch(props.editRow(props.url, props.crudUrl, idName, values));
      setEditingRowId(null);
      form.resetFields();
    } catch (error) {
      console.error("Ошибка валидации:", error);
    }
  };

  const handleCancel = () => {
    setEditingRowId(null);
    form.resetFields();
  };

  const handleDelete = (rowId) => {
    props.dispatch(props.deleteRow(props.url, props.crudUrl, rowId));
  };

  const tableColumns = [
    ...props.columns.map((column) => ({
      title: column.label,
      dataIndex: column.name,
      key: column.name,
      render: (text, record) => {
        if (editingRowId === record[props.idName]) {
          return renderField({ ...props, record }, column);
        }
        return text;
      },
    })),
    {
      title: "Действия",
      key: "actions",
      render: (text, record) =>
        editingRowId === record[props.idName] ? (
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <CheckSquareTwoTone
              onClick={() => handleSave(record[props.idName])}
            />
            <CloseSquareTwoTone onClick={handleCancel} />
          </div>
        ) : (
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <EditTwoTone onClick={() => handleEdit(record)} />
            <Popconfirm
              title="Точно?"
              okText="Да"
              cancelText="Нет"
              onConfirm={() => handleDelete(record[props.idName])}
            >
              <DeleteTwoTone />
            </Popconfirm>
          </div>
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
