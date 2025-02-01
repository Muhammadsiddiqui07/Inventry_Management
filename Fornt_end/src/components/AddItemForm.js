import React from "react";
import { Form, Input, Button } from "antd";
import axios from 'axios';


const AddItemForm = ({ addItem }) => {
    const [form] = Form.useForm();

    const handleSubmit = async (values) => {
        addItem({ ...values, id: Date.now() });
        form.resetFields();
        console.log(values);

        const response = await axios.post('http://localhost:4000/api/inventries/add', values);
        console.log('Response from server:', response.data);

    };

    return (
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
                >
                    Add Item
                </Button>
            </Form.Item>
        </Form>
    );
};

export default AddItemForm;
