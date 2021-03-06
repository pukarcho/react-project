import { Link } from "react-router-dom";
import Cookies from 'js-cookie';

import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';

import { postData } from '../../helpers/app-service';

function Login(props) {

    const formSubmit = (event) => {
        let user = {
            username: event.username,
            password: event.password
        };

        postData("user/login", user, function(tokens){
            
            if(!tokens.error_description){
                const expires_in = new Date(new Date().getTime() + (tokens.expires_in * 1000));
                Cookies.set('access_token', tokens.access_token, { expires: expires_in });
                Cookies.set('refresh_token', tokens.refresh_token);
                Cookies.set('username', user.username);
                
                toast.success(`Welcome ${user.username}`);

                props.history.push('/');
                props.auth();
            }
            else {
                toast.error(tokens.error_description);
            }
        });
    };

    const onForgotPasswordClick = () => {
        toast.info('Forgot password is still in development');
    }

    return (
        <div className="login-wrapper">
            <Form name="login" className="login-form" initialValues={{ remember: true, }} onFinish={formSubmit}>
                <h3 style={{textAlign: "center"}}>Login</h3>
                <Form.Item name="username" rules={[{ required: true, message: 'Please input your Username!', },]}>
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
                <Form.Item name="password" rules={[{ required: true, message: 'Please input your Password!', },]}>
                    <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" />
                </Form.Item>
                <Form.Item>
                    <a className="login-form-forgot" onClick={onForgotPasswordClick}>Forgot password</a>

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