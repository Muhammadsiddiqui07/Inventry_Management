import React from "react";
import { Table, Button } from "antd";

const Dashboard = ({ inventory, updateItem, deleteItem }) => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Cateogry",
      dataIndex: "cateogry",
      key: "cateogry",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Button
            type="primary"
            style={{ marginRight: "8px" }}
            onClick={() => updateItem({ ...record, quantity: record.quantity + 1 })}
          >
            Edit
          </Button>
          <Button danger onClick={() => deleteItem(record.id)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <Table
      dataSource={inventory.map((item, index) => ({
        key: index,
        ...item,
      }))}
      columns={columns}
      pagination={{ pageSize: 5 }}
    />
  );
};

export default Dashboard;
