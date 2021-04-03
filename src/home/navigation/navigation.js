import React, { useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import Cookies from 'js-cookie';

import { isAuthenticated } from '../../helpers/app-auth';

import { Menu } from 'antd';
import { 
    HomeOutlined,
    InfoCircleOutlined,
    LoginOutlined,
    UserOutlined, 
} from '@ant-design/icons';
import { toast } from 'react-toastify';

const { SubMenu } = Menu;

function Navigation(props) {
    const history = useHistory();
    const [selected, setSelectred] = useState('home');

    const username = Cookies.get('username');

    const menuClick = (event) => {
        if(event.key === 'logout'){
            Cookies.remove('username');
            Cookies.remove('access_token');
            Cookies.remove('refresh_token');

            history.push('/');
            setSelectred('home');
            props.auth();
            toast.success(`Successfully logged out`);
        }
        else{
            setSelectred(event.key);
        }        
    };

  	return (
        <Menu onClick={menuClick} selectedKeys={selected} mode="horizontal" theme="dark">
            <Menu.Item key="home" icon={<HomeOutlined />}><Link to="/">Home</Link></Menu.Item>
            <Menu.Item key="about-us" icon={<InfoCircleOutlined />}><Link to="about-us">About us</Link></Menu.Item>
            
            {isAuthenticated() ? (
                <SubMenu key="SubMenu" icon={<UserOutlined />} title={username} className="pull-right">
                    <Menu.Item key="settings"><Link to="settings">Settings</Link></Menu.Item>
                    <Menu.Item key="logout">Logout</Menu.Item>
                </SubMenu>
            ) : (
                <Menu.Item key="login" icon={<LoginOutlined />} className="pull-right"><Link to="login">Login</Link></Menu.Item>
            )}
        </Menu>
    );
}

export default Navigation;