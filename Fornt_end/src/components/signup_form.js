import React from 'react';
import { Card, Button, Form, Input } from 'antd';
import 'animate.css';
import bgImage from '../Assest/signup-image.jpg';
import { NavLink } from 'react-router-dom';
import axios from 'axios';


function SignupCard() {
    const onFinish = async (values) => {
        console.log('Success:', values);
        // if (values) {
        //     try {
        //         const response = await axios.post('/signup', values)
        //         console.log('signup successfully!', response.data);

        //     } catch (err) {
        //         console.log("ERROR", err.message);
        //     }
        // }
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className='SignupContainer'>
            <Card
                className='animate__animated animate__zoomInUp signupCard'
                bordered={false}
                style={{
                    width: '70%',
                    height: '90vh',
                }}
            >
                <div className='main_container' style={{
                    display: 'flex',
                    width: '100%',
                }}>

                    <div className='imageContainer'>
                        <img
                            src={bgImage}
                            alt='Login Background'
                            className='loginImage'
                            style={{
                                marginTop: '30px'
                            }}
                        />
                    </div>
                    <div className='contentContainer'>
                        <Form
                            name="basic"
                            labelCol={{
                                span: 8,
                            }}
                            wrapperCol={{
                                span: 16,
                            }}
                            style={{
                                maxWidth: 600,
                            }}
                            initialValues={{
                                remember: true,
                            }}
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
                                // backgroundColor: '#00302a',
                            }}>
                                Signup Form
                            </h2>
                            <Form.Item
                                label="First Name"
                                name="firstName"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your First Name!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Last Name"
                                name="lastName"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Last Name',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Phone"
                                name="Phone"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Phone!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="E-Mail"
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your E-Mail!',
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
                            <p style={{
                                marginLeft: '40px'
                            }}>

                                Already Have An Account <NavLink to={"/"}>Login</NavLink> Here!

                            </p>

                            <Form.Item
                                wrapperCol={{
                                    offset: 8,
                                    span: 16,
                                }}
                            >
                                <Button type="primary" htmlType="submit" style={{
                                    // backgroundColor: '#00302a',
                                    backgroundColor: '#225ea3',
                                    width: '60%'
                                }}>
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </Card >
        </div >
    );
}

export default SignupCard;
