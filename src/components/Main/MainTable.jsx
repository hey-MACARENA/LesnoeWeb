import {
  CheckSquareTwoTone,
  CloseSquareTwoTone,
  DeleteTwoTone,
  EditTwoTone,
} from "@ant-design/icons";
import { Table, Form, Popconfirm } from "antd";
import React, { useEffect, useState } from "react";
import { renderField } from "./MainAdder";
import dayjs from "dayjs";

function MainTable(props) {
  const [editingRowId, setEditingRowId] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    setEditingRowId(-1);
  }, [props.columns]);

  const handleEdit = (record) => {
    setEditingRowId(record[props.idName]);

    const updatedRecord = { ...record };

    for (const key in updatedRecord) {
      if ( Array.isArray(updatedRecord[key]) ) {
        updatedRecord[key] = updatedRecord[key].map( item => {
          const itemKeys = Object.keys(item);
          return item[itemKeys[0]]
        });
      } else if (key === "start_date") {
        const start_date = dayjs(updatedRecord["start_date"], "YYYY-MM-DD")
        const end_date = dayjs(updatedRecord["end_date"], "YYYY-MM-DD")
        
        updatedRecord["start_date"] = [
          start_date,
          end_date,
        ];
        delete updatedRecord['end_date'];
      } else {
        const dateRegex =
          /(19|20)\d\d-((0[1-9]|1[012])-(0[1-9]|[12]\d)|(0[13-9]|1[012])-30|(0[13578]|1[02])-31)/;
        if (dateRegex.test(updatedRecord[key])) {
          updatedRecord[key] = dayjs(updatedRecord[key], "YYYY-MM-DD");
        }
      }
    }

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
    ...props.columns?.map((column) => {
    const getSorter = () => {
      if (!column.sortOn) return null;

      return (a, b) => {
        const fieldA = a[column.name];
        const fieldB = b[column.name];

        if (column.type === 'date' || column.type === 'start_date' || column.type === 'end_date') {
          const dateA = fieldA ? new Date(fieldA) : null;
          const dateB = fieldB ? new Date(fieldB) : null;

          if (dateA && dateB) return dateA - dateB;
          if (dateA) return 1; // null после даты
          if (dateB) return -1; // дата перед null
          return 0;
        }

        if (column.type === 'list') {
          return fieldA.length - fieldB.length;
        }

        if (typeof fieldA === 'number' && typeof fieldB === 'number') {
          return fieldA - fieldB;
        }

        if (typeof fieldA === 'string' && typeof fieldB === 'string') {
          return fieldA.localeCompare(fieldB);
        }

        return 0;
      };
    };

    return {
      title: column.label,
      dataIndex: column.name,
      key: column.name,
      sorter: getSorter(),
      render: (text, record) => {
        if (editingRowId === record[props.idName]) {
          return renderField({ ...props, record }, column);
        }
        return column.type !== 'list' ? text : text.map((employee, index) => {
          const keys = Object.keys(employee);
          return `${employee[keys[1]]}; `;
        });
      },
    }}) || [],
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
