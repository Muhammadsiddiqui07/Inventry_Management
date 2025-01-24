import React, { useState } from 'react';
import { Form, Input, Button, Modal, Spin, message } from 'antd';

const UpdateModel = ({ item, updateItem }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    // Show modal and populate form fields with the selected item data
    const showModal = () => {
        form.setFieldsValue(item);
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
    };

    const handleSubmit = async (values) => {
        setLoading(true);  // Show loader while updating
        try {
            await new Promise((resolve) => setTimeout(resolve, 2000));  // Simulate API call
            updateItem({ ...item, ...values });  // Update item with new values
            message.success("Item updated successfully!");
            setIsModalOpen(false);
            form.resetFields();
        } catch (error) {
            message.error("Failed to update item.");
        } finally {
            setLoading(false);  // Hide loader after update
        }
    };

    return (
        <>
            <Button
                style={{ width: '20%' }}
                type="primary"
                onClick={showModal}
            >
                Edit
            </Button>
            <Modal
                title="Edit Here!"
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
            >
                <Spin spinning={loading}>
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
                                style={{ width: "100%", height: "8vh" }}
                                placeholder="Item Name"
                            />
                        </Form.Item>

                        <Form.Item
                            name="category"
                            rules={[{ required: true, message: "Please input item category!" }]}
                            style={{ flex: "1 1 200px", minWidth: "200px" }}
                        >
                            <Input
                                style={{ width: "100%", height: "8vh" }}
                                placeholder="Item Category"
                            />
                        </Form.Item>

                        <Form.Item
                            name="quantity"
                            rules={[{ required: true, message: "Please input quantity!" }]}
                            style={{ flex: "1 1 200px", minWidth: "200px" }}
                        >
                            <Input
                                style={{ width: "100%", height: "8vh" }}
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
                                style={{ width: "100%", height: "8vh" }}
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
                                style={{ width: "100%", height: "8vh" }}
                                disabled={loading}
                            >
                                {loading ? "Updating..." : "Edit Now"}
                            </Button>
                        </Form.Item>
                    </Form>
                </Spin>
            </Modal>
        </>
    );
};

export default UpdateModel;
