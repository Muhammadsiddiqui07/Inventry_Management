import React, { useState } from 'react';
import { Card, Button, Form, Input, message, Row, Col } from 'antd';
import { IoCamera } from "react-icons/io5";
import axios from 'axios';
import profilePicture from '../Assest/profile-pic.webp';

function ProfileDetails() {
    const [imageUrl, setImageUrl] = useState(profilePicture);
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            const reader = new FileReader();
            reader.onload = () => {
                setImageUrl(reader.result);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    const onFinish = async (values) => {
        try {
            const formData = new FormData(); // Use FormData object instead of an array
            formData.append('file', file);
            formData.append('firstName', values.firstName);
            formData.append('lastName', values.lastName);
            formData.append('email', values.email);
            formData.append('phoneNumber', values.phoneNumber);

            // Log the FormData keys and values (for debugging)
            for (let [key, value] of formData.entries()) {
                console.log(`${key}: ${value}`);
            }

            // const response = await axios.put('/api/profile', formData, {
            //     headers: { 'Content-Type': 'multipart/form-data' },
            // });

            // if (response.status === 200) {
            //     message.success('Profile updated successfully!');
            // }
        } catch (error) {
            message.error('Failed to update profile. Please try again.');
        }
    };

    const onFinishFailed = (errorInfo) => {
        message.error('Please check the form fields and try again.');
    };

    return (
        <div
            className="profileCard"
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '20px',
                minHeight: '100vh',
            }}
        >
            <Card
                title="Profile Details"
                bordered={true}
                style={{
                    width: '100%',
                    maxWidth: '600px',
                    textAlign: 'center',
                }}
            >
                <Form
                    name="profileForm"
                    layout="vertical"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Row justify="center" align="middle">
                        <div className="ProfilePicture">
                            <img
                                src={imageUrl}
                                alt="Profile"
                                style={{ width: '100px', height: '100px', borderRadius: '50%', margin: '20px' }}
                            />
                            <div className="image-upload" style={{ marginTop: '-30%' }}>
                                <label htmlFor="file-input">
                                    <IoCamera style={{ cursor: 'pointer', fontSize: '24px', marginLeft: '55%', marginTop: '-50%' }} />
                                </label>
                                <input
                                    id="file-input"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    style={{ display: 'none' }}
                                />
                            </div>
                        </div>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} sm={12}>
                            <Form.Item
                                label="First Name"
                                name="firstName"
                                rules={[{ required: true, message: 'Please input your First Name!' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12}>
                            <Form.Item
                                label="Last Name"
                                name="lastName"
                                rules={[{ required: true, message: 'Please input your Last Name!' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col xs={24}>
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[{ required: true, message: 'Please input your Email!' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col xs={24}>
                            <Form.Item
                                label="Phone Number"
                                name="phoneNumber"
                                rules={[{ required: true, message: 'Please input your Phone Number!' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Update
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
}

export default ProfileDetails;
