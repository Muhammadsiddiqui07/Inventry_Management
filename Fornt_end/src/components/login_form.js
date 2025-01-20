import React from 'react';
import { Card, Button, Form, Input } from 'antd';
import 'animate.css';
import bgImage from '../Assest/login-image.jpg';
import { NavLink } from 'react-router-dom';
import axios from 'axios';


function LoginCard() {
    const onFinish = async (values) => {
        console.log('Success:', values);
        // if (values) {
        //     try {
        //         const response = await axios.post('/login', values)
        //         console.log('login successfully!', response.data);
        //     } catch (err) {
        //         console.log("ERROR", err.message);
        //     }
        // }
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
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
                <div style={{
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

                            <Form.Item
                                wrapperCol={{
                                    offset: 8,
                                    span: 16,
                                }}
                            >
                                <Button type="primary" htmlType="submit" style={{
                                    backgroundColor: '#225ea3',
                                    width: '60%'
                                }}>
                                    Submit
                                </Button>
                            </Form.Item>
                            <hr style={{
                                width: '100%'
                            }} />
                        </Form>
                        <p style={{
                            fontSize: '15px'
                        }}>
                            Don't have an account then <NavLink to={'/signup'}> Signup </NavLink> Here!
                        </p>
                    </div>
                </div>
            </Card >
        </div >
    );
}

export default LoginCard;
