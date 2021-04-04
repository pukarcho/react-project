import { useHistory } from "react-router-dom";
import Cookies from 'js-cookie';

import { postData } from '../../helpers/app-service';

import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';

function Register(props) {
    const history = useHistory();

    const formSubmit = (event) => {
        let user = {
            username: event.username,
            password: event.password
        };

        postData("user/register", user, function(tokens){
            if(!tokens.error_description){
                const expires_in = new Date(new Date().getTime() + (tokens.expires_in * 1000));
                Cookies.set('access_token', tokens.access_token, { expires: expires_in });
                Cookies.set('refresh_token', tokens.refresh_token);
                Cookies.set('username', user.username);
                
                toast.success(`Welcome ${user.username}`);

                props.auth();
                history.push('/');
            }
            else {
                toast.error(tokens.error_description);
            }
        });
    };

    return (
        <div className="register-wrapper">
            <Form name="register" className="register-form" initialValues={{ remember: true, }} onFinish={formSubmit}>
                <h3 style={{textAlign: "center"}}>Register</h3>
                <Form.Item name="username" rules={[{ required: true, message: 'Please input your Username!', },]}>
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
                <Form.Item name="password" rules={[{ required: true, message: 'Please input your Password!', },]}>
                    <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" />
                </Form.Item>
                <Form.Item name="passwordRepeat" rules={[
                    { 
                        required: true,
                        message: 'Please repeat your Password!',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('The two passwords that you entered do not match!'));
                        },
                    }),
                ]}>
                    <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Repeat Password" />
                </Form.Item>
                <Form.Item>
                    <div className="pull-right">
                        <Button type="primary" htmlType="submit" className="login-form-button">Register</Button>
                    </div>
                </Form.Item>
            </Form>
        </div>
        
    );
}

export default Register;