import React, { useState } from 'react';
import { Form, Input, Button, Modal, Spin } from 'antd';
import Swal from 'sweetalert2';
import axios from 'axios'; // Import axios for making API calls

const UpdateModel = ({ item, updateItem, fetchData }) => {
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
            // Perform the update using PUT request
            await axios.put(`http://localhost:4000/api/inventries/update/${item._id}`, values);

            // Show SweetAlert for success
            Swal.fire({
                icon: "success",
                title: "Item Updated!",
                text: "The item has been successfully updated.",
                timer: 2000,
                showConfirmButton: false,
            });

            // Update item locally after successful update
            updateItem({ ...item, ...values }); // This will update the parent component's state

            // Fetch the latest data again after update
            fetchData();  // Call the parent fetchData function to reload the data

            setIsModalOpen(false); // Close the modal
            form.resetFields(); // Reset the form fields

        } catch (error) {
            console.error("Error updating item:", error); // Log the error for debugging

            // Show SweetAlert for error
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Failed to update item. Please try again!",
            });

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
                title="Edit Item"
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

                        >
                            <Input
                                style={{ width: "100%", height: "8vh" }}
                                placeholder="Item Name"
                            />
                        </Form.Item>

                        <Form.Item
                            name="category"
                            rules={[{ required: true, message: "Please input item category!" }]}
                        >
                            <Input
                                style={{ width: "100%", height: "8vh" }}
                                placeholder="Item Category"
                            />
                        </Form.Item>

                        <Form.Item
                            name="quantity"
                            rules={[{ required: true, message: "Please input quantity!" }]}
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
