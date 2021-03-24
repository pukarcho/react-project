import { Link } from "react-router-dom";

import './login.css';

import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

function Login() {

    const formSubmit = (event) => {
debugger
    };

    return (
        <div className="login-wrapper">
            <Form name="login" className="login-form" initialValues={{ remember: true, }} onFinish={formSubmit}>
                <Form.Item name="username" rules={[{ required: true, message: 'Please input your Username!', },]}>
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
                <Form.Item name="password" rules={[{ required: true, message: 'Please input your Password!', },]}>
                    <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" />
                </Form.Item>
                <Form.Item>
                    <a className="login-form-forgot" href="">Forgot password</a>

                    <div className="pull-right">
                        <Button type="primary" htmlType="submit" className="login-form-button">Log in</Button>
                    </div>
                </Form.Item>
                <Form.Item>
                    <p style={{textAlign: "center"}}> Don't have account? <Link to="/register">register now!</Link></p>
                </Form.Item>
            </Form>
        </div>
    );
}

export default Login;