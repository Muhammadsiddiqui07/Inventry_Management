import React, { useState } from 'react';
import { Card, Button, Form, Input, message, Spin } from 'antd';
import Swal from 'sweetalert2';
import 'animate.css';
import bgImage from '../Assest/signup-image.jpg';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignupCard() {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const localData = localStorage.getItem('user')


    const onFinish = async (values) => {
        setLoading(true);  // Show loader when submission starts
        try {
            console.log('Success:', values);

            if (!values) {
                message.error('Please fill all the fields');
            }

            else {

                setTimeout(() => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Hello ',
                        text: 'Welcome To Inventry Management System!',
                    }, 1000);
                    localStorage.setItem('user', values.Password)
                    navigate('/mainPage')
                })
            }
            // Simulating API call
            // await axios.post('https://your-api-endpoint.com/signup', values);
            // message.success('Signup successful!');

            // form.resetFields();  // Clear form after successful submission
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Signup failed. Please try again!',
            });
        } finally {
            setLoading(false);  // Hide loader when done
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
        <div className='SignupContainer'>
            <Card
                className='animate__animated animate__zoomInUp signupCard'
                bordered={false}
                style={{
                    width: '70%',
                    height: '90vh',
                    display: 'flex',
                    flexWrap: 'wrap-reverse'
                }}
            >
                <div className='main_container' style={{ display: 'flex', width: '100%' }}>
                    <div className='imageContainer'>
                        <img
                            src={bgImage}
                            alt='Signup Background'
                            className='signupImage'
                            style={{ marginTop: '30px', aspectRatio: '4/4' }}
                        />
                    </div>
                    <div className='contentContainer'>
                        <Form
                            form={form}
                            name="basic"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                            style={{ maxWidth: 600 }}
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <h2
                                style={{
                                    width: '100%',
                                    textAlign: 'center',
                                    padding: '10px',
                                    color: 'white',
                                    backgroundColor: '#225ea3',
                                }}
                            >
                                Signup Form
                            </h2>
                            <Form.Item
                                label="First Name"
                                name="firstName"
                                rules={[{ required: true, message: 'Please input your First Name!' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Last Name"
                                name="lastName"
                                rules={[{ required: true, message: 'Please input your Last Name' }]}
                            >
                                <Input />
                            </Form.Item>

                            {/* <Form.Item
                                label="Phone"
                                name="phone"
                                rules={[{ required: true, message: 'Please input your Phone!' }]}
                            >
                                <Input />
                            </Form.Item> */}

                            <Form.Item
                                label="E-Mail"
                                name="email"
                                rules={[
                                    { required: true, message: 'Please input your E-Mail!' },
                                    { type: 'email', message: 'Please enter a valid email!' }
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!' }]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <p style={{ marginLeft: '40px' }}>
                                Already Have An Account? <NavLink to={"/"}>Login</NavLink> Here!
                            </p>

                            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    style={{ backgroundColor: '#225ea3', width: '60%' }}
                                    disabled={loading}
                                >
                                    {loading ? <Spin size="small" /> : 'Submit'}
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </Card>
        </div>
    );
}

export default SignupCard;
