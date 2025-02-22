import React, { useState } from 'react';
import { Card, Button, Form, Input, message, Spin } from 'antd';
import Swal from 'sweetalert2';
import 'animate.css';
import bgImage from '../Assest/login-image.jpg';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginCard() {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const onFinish = async (values) => {
        setLoading(true);
        try {
            console.log('Success:', values);

            const response = await axios.post('http://localhost:4000/api/users/login', values);
            console.log('Response from server:', response.data);
            message.success('Login successful!');

            localStorage.setItem('uid', response.data.user._id);

            if (response.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Login Successful!',
                    text: 'Welcome back!',
                });
                form.resetFields();
                navigate('/mainPage')
            } else {
                throw new Error('Invalid login credentials');
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response?.data?.message || 'Login failed. Please check your credentials.',
            });
        } finally {
            setLoading(false);
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        Swal.fire({
            icon: 'warning',
            title: 'Validation Error',
            text: 'Please fill in all required fields correctly.',
        });
    };

    return (
        <div className='loginCardContainer'>
            <Card
                className='animate__animated animate__zoomInDown loginCard'
                bordered={false}
                style={{
                    width: '70%',
                    height: '90vh',
                }}
            >
                <div
                    className='main_container'
                    style={{
                        display: 'flex',
                        width: '100%',
                    }}>
                    <div className='imageContainer'>
                        <img
                            src={bgImage}
                            alt='Login Background'
                            className='loginImage'
                        />
                    </div>
                    <div className='contentContainer'>
                        <Form
                            form={form}
                            name="login"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                            style={{ maxWidth: 600 }}
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <h2 style={{
                                width: '100%',
                                textAlign: 'center',
                                padding: '10px',
                                color: 'white',
                                backgroundColor: '#225ea3',
                            }}>
                                Login Form
                            </h2>

                            <Form.Item
                                label="E-mail"
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your E-mail!',
                                    },
                                    {
                                        type: 'email',
                                        message: 'Please enter a valid email!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your password!',
                                    },
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    style={{ backgroundColor: '#225ea3', width: '60%' }}
                                    disabled={loading}
                                >
                                    {loading ? <Spin size="small" style={{ colorScheme: 'white' }} /> : 'Submit'}
                                </Button>

                            </Form.Item>
                        </Form>

                        <hr style={{ width: '100%' }} />

                        <p style={{ fontSize: '15px' }}>
                            Don't have an account? <NavLink to={'/signup'}>Signup</NavLink> Here!
                        </p>
                    </div>
                </div>
            </Card >
        </div >
    );
}

export default LoginCard;
