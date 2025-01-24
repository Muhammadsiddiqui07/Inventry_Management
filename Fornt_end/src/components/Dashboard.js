import React from "react";
import { Table, Button } from "antd";
import UpdateModel from "./EditItemForm";

const Dashboard = ({ inventory, updateItem, deleteItem }) => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
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
          <UpdateModel item={record} updateItem={updateItem} />

          <Button
            style={{ marginLeft: '10px', width: '20%' }}
            danger onClick={() => deleteItem(record.id)}>
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
