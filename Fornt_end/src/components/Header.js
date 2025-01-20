import React from "react";
import { Layout, Dropdown, Space, Grid } from "antd";
import 'animate.css';
import { CgProfile } from "react-icons/cg";
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";

const { Header } = Layout;
const { useBreakpoint } = Grid;

const AppHeader = () => {
    const navigate = useNavigate();
    const screens = useBreakpoint();

    const items = [
        {
            key: '1',
            label: 'My Account',
            disabled: true,
        },
        {
            type: 'divider',
        },
        {
            key: '2',
            label: 'Profile',
            icon: <UserOutlined />, // Add profile icon
            onClick: () => {
                navigate('/profile'); // Navigate to the Profile route
            },
        },
        {
            key: '3',
            label: 'SignOut',
            icon: <LogoutOutlined />, // Add sign-out icon
            onClick: () => {
                localStorage.clear();
                navigate('/'); // Navigate to the home route
            },
        },
    ];

    return (
        <Header
            style={{
                height: screens.xs ? '10vh' : '20vh', // Adjust height for small screens
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: "#1890ff",
                color: "white",
                textAlign: "center",
                fontSize: screens.xs ? "20px" : "30px", // Adjust font size for small screens
                padding: screens.xs ? '0 10px' : '0 50px', // Add padding for smaller screens
            }}
        >
            <h3
                style={{
                    textShadow: '4px 9px 10px #ffffff',
                    margin: 0,
                }}
                className="animate__animated animate__flip"
            >
                Inventory Management
            </h3>

            <div
                style={{
                    width: screens.xs ? '20%' : '10%', // Adjust width for small screens
                    display: 'flex',
                    justifyContent: 'flex-end', // Align dropdown to the right
                }}
            >
                <Dropdown
                    menu={{
                        items,
                    }}
                    trigger={['click']}
                >
                    <a onClick={(e) => e.preventDefault()}>
                        <Space style={{ fontSize: screens.xs ? '20px' : '24px' }}>
                            <CgProfile style={{ color: 'white' }} />
                        </Space>
                    </a>
                </Dropdown>
            </div>
        </Header>
    );
};

export default AppHeader;
