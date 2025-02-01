import React, { useState, useEffect } from 'react';
import { Card, Button, Form, Input, message, Row, Col, Spin } from 'antd';
import { IoCamera } from 'react-icons/io5';
import Swal from 'sweetalert2';
import profilePicture from '../Assest/profile-pic.webp';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ProfileDetails() {
    const [imageUrl, setImageUrl] = useState(profilePicture); // Default profile picture
    const [file, setFile] = useState(null); // Selected file for upload
    const [loading, setLoading] = useState(false); // Loading state for fetching user data
    const [updating, setUpdating] = useState(false); // Loading state for updating profile
    const [form] = Form.useForm(); // Form instance
    const uid = localStorage.getItem('uid'); // User ID from localStorage
    const navigate = useNavigate(); // Navigation hook

    // Fetch user data on component mount
    useEffect(() => {
        if (uid) {
            fetchUserData();
        }
    }, [uid]);

    // Fetch user data from the backend
    const fetchUserData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:4000/api/users/get_user/${uid}`);
            const userData = response.data.data;

            // Set form fields with user data
            form.setFieldsValue({
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: userData.email,
                phoneNumber: userData.phoneNumber || '',
            });

            // Set profile image if available
            if (userData.profileImage) {
                setImageUrl(userData.profileImage);
            }
        } catch (error) {
            message.error('Failed to load user data.');
        } finally {
            setLoading(false);
        }
    };

    // Handle file selection
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);

            // Preview the selected image
            const reader = new FileReader();
            reader.onload = () => {
                setImageUrl(reader.result);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    // Upload file to the backend
    const uploadFileToBackend = async () => {
        if (!file) return null; // No file selected

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:4000/api/users/upload/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (response.data && response.data.fileUrl) {
                message.success('Image uploaded successfully!');
                return response.data.fileUrl;
            } else {
                message.error('Invalid response from server.');
                return null;
            }

        } catch (error) {
            message.error('Failed to upload image.');
            return null;
        }
    };

    // Handle form submission
    const onFinish = async (values) => {
        setUpdating(true);
        console.log('Form values:', values);

        try {
            // Validate if passwords match before preparing data
            if (values.newPassword && values.newPassword !== values.confirmPassword) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Please enter the same password in both fields.',
                });
                setUpdating(false);
                return; // Stop execution if passwords don't match
            }

            // Upload file if selected and get the uploaded file URL
            let profileImageUrl = imageUrl; // Default to current image
            if (file) {
                profileImageUrl = await uploadFileToBackend();
                if (!profileImageUrl) {
                    setUpdating(false);
                    return; // Stop execution if file upload fails
                }
            }

            // Prepare FormData for updating user profile
            const formData = new FormData();
            formData.append('firstName', values.firstName);
            console.log(values.firstName);

            formData.append('lastName', values.lastName);
            formData.append('email', values.email);
            if (values.newPassword) {
                formData.append('password', values.newPassword);
            }
            if (profileImageUrl) {
                formData.append('profileImage', profileImageUrl);
            }

            console.log('Updated data being sent:', Object.fromEntries(formData));

            // Send update request to the backend
            await axios.put(`http://localhost:4000/api/users/update_profile/${uid}`, formData, {
                headers: { 'Content-Type': 'application/json' },
            });

            // Success message with SweetAlert
            Swal.fire({
                icon: 'success',
                title: 'Profile Updated!',
                text: 'Your profile has been updated successfully.',
                timer: 2000,
                showConfirmButton: false,
            });

        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `Failed to update profile. ${error.message}`,
            });
        } finally {
            setUpdating(false);
        }
    };



    const moveToDashboard = () => {
        navigate('/mainPage')
    }
    return (
        <div className="profileCard" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px', minHeight: '100vh' }}>
            <Spin spinning={loading || updating} size="large">
                <Card title="Profile Details" bordered style={{ width: '100%', maxWidth: '600px', textAlign: 'center' }}>
                    <Form form={form} layout="vertical" onFinish={onFinish}>
                        <Row justify="center">
                            <div className="ProfilePicture">
                                <img src={imageUrl} alt="Profile" style={{ width: '100px', height: '100px', borderRadius: '50%', margin: '20px' }} />
                                <div className="image-upload" style={{ marginTop: '-30%' }}>
                                    <label htmlFor="file-input">
                                        <IoCamera style={{ cursor: 'pointer', fontSize: '24px', marginLeft: '55%', marginTop: '-50%' }} />
                                    </label>
                                    <input id="file-input" type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
                                </div>
                            </div>
                        </Row>
                        <Row gutter={[16, 16]}>
                            <Col xs={24} sm={12}>
                                <Form.Item label="First Name" name="firstName" rules={[{ required: true, message: 'Please enter your First Name!' }]}>
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={12}>
                                <Form.Item label="Last Name" name="lastName" rules={[{ required: true, message: 'Please enter your Last Name!' }]}>
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col xs={24}>
                                <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please enter your Email!' }]}>
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={12}>
                                <Form.Item label="New Password" name="newPassword">
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={12}>
                                <Form.Item label="Confirm Password" name="confirmPassword">
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" block loading={updating}>
                                {updating ? 'Updating...' : 'Update'}
                            </Button>

                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" block onClick={moveToDashboard}>
                                Dashboard
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Spin>
        </div >
    );
}

export default ProfileDetails;