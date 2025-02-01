import React, { useState, useEffect } from "react";
import { Table, Button } from "antd";
import UpdateModel from "./EditItemForm";
import { Form, Input, Spin } from "antd";
import Swal from "sweetalert2";
import axios from "axios";

const Dashboard = ({ updateItem, deleteItem }) => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(false); // Loader state
  const [form] = Form.useForm();

  // Fetch inventory data
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/inventries/get_all');
      const userData = response.data;
      setInventory(userData.items); // Assuming the response contains items in 'items'
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data on initial load
  }, []); // Empty dependency array to fetch data only once

  const handleSubmit = async (values) => {
    setLoading(true); // Start loader

    try {
      // Add item to the inventory
      await axios.post("http://localhost:4000/api/inventries/add", values, {
        headers: { "Content-Type": "application/json" }
      });

      // Success alert
      Swal.fire({
        icon: "success",
        title: "Item Added!",
        text: "The item has been successfully added.",
        timer: 2000,
        showConfirmButton: false,
      });

      // Fetch updated inventory data after successful add
      fetchData();

      form.resetFields(); // Reset the form fields

    } catch (error) {
      console.error("Error adding item:", error);

      // Error alert
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to add item. Please try again!",
      });

    } finally {
      setLoading(false); // Stop loader
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name", // Ensure this matches the data returned from the API
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
            danger
            onClick={() => deleteItem(record._id)} // Assuming _id is the unique identifier
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        style={{
          marginBottom: "20px",
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "space-between",
        }}
      >
        <Form.Item
          name="name"
          rules={[{ required: true, message: "Please input item name!" }]}
          style={{ flex: "1 1 200px", minWidth: "200px" }}
        >
          <Input
            style={{
              width: "100%",
              height: "8vh",
            }}
            placeholder="Item Name"
          />
        </Form.Item>

        <Form.Item
          name="category"
          rules={[{ required: true, message: "Please input item category!" }]}
          style={{ flex: "1 1 200px", minWidth: "200px" }}
        >
          <Input
            style={{
              width: "100%",
              height: "8vh",
            }}
            placeholder="Item Category"
          />
        </Form.Item>

        <Form.Item
          name="quantity"
          rules={[{ required: true, message: "Please input quantity!" }]}
          style={{ flex: "1 1 200px", minWidth: "200px" }}
        >
          <Input
            style={{
              width: "100%",
              height: "8vh",
            }}
            type="number"
            placeholder="Quantity"
          />
        </Form.Item>

        <Form.Item
          name="price"
          rules={[{ required: true, message: "Please input price!" }]}
          style={{ flex: "1 1 200px", minWidth: "200px" }}
        >
          <Input
            style={{
              width: "100%",
              height: "8vh",
            }}
            type="number"
            placeholder="Price"
          />
        </Form.Item>

        <Form.Item
          style={{
            flex: "1 1 200px",
            minWidth: "200px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            type="primary"
            htmlType="submit"
            style={{
              width: "100%",
              height: "8vh",
            }}
            disabled={loading} // Disable button while loading
          >
            {loading ? <Spin /> : "Add Item"}
          </Button>
        </Form.Item>
      </Form>

      <Table
        dataSource={inventory.map((item, index) => ({
          key: item._id, // Assuming each item has a unique _id
          ...item,
        }))}
        columns={columns}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default Dashboard;
