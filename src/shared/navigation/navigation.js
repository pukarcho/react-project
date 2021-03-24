import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

import { Menu } from 'antd';
import { HomeOutlined, InfoCircleOutlined, SettingOutlined, LoginOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;

function Navigation() {
    const history = useHistory();
    const [selected, setSelectred] = useState('home');

    const menuClick = (event) => {
        setSelectred(event.key);
        history.push(`/${event.key}`);
    };

  	return (
        <Menu onClick={menuClick} selectedKeys={selected} mode="horizontal" theme="dark">
            <Menu.Item key="home" icon={<HomeOutlined />}>Home</Menu.Item>
            <Menu.Item key="about-us" icon={<InfoCircleOutlined />}>About us</Menu.Item>
            <SubMenu key="SubMenu" icon={<SettingOutlined />} title="Navigation Three - Submenu">
                <Menu.ItemGroup title="Item 1">
                    <Menu.Item key="setting:1">Option 1</Menu.Item>
                    <Menu.Item key="setting:2">Option 2</Menu.Item>
                </Menu.ItemGroup>
                <Menu.ItemGroup title="Item 2">
                    <Menu.Item key="setting:3">Option 3</Menu.Item>
                    <Menu.Item key="setting:4">Option 4</Menu.Item>
                </Menu.ItemGroup>
            </SubMenu>
            <Menu.Item key="login" icon={<LoginOutlined />} className="pull-right">Login</Menu.Item>
            {/* <Menu.Item key="register" icon={<MailOutlined />} className="pull-right">Register</Menu.Item> */}
        </Menu>
    );
}

export default Navigation;