import { Form, Input, Button } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';

import { postAuthData } from '../../helpers/app-service';

function Settings() {

    const formSubmit = (event) => {
        let settings = {
            password: event.password,
            newPassword: event.newPassword
        };

        postAuthData("user/change_password", settings, function(data){
            if(data){
                toast.error(data);
            }
            else{
                toast.success('Password changed successfully');
            }
        });
    };
    
    return (
        <div className="settings-wrapper">
            <Form name="settings" className="settings-form" initialValues={{ remember: true, }} onFinish={formSubmit}>
                <h3 style={{textAlign: "center"}}>Change password</h3>
                <Form.Item name="password" rules={[{ required: true, message: 'Please input your Password!', },]}>
                    <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" />
                </Form.Item>
                <Form.Item name="newPassword" rules={[{ required: true, message: 'Please input your New Password!', },]}>
                    <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" />
                </Form.Item>
                <Form.Item name="newPasswordRepeat" rules={[
                    { 
                        required: true,
                        message: 'Please repeat your New Password!',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('newPassword') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('The two new passwords that you entered do not match!'));
                        },
                    }),
                ]}>
                    <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="settings-form-button pull-right">Change Password</Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default Settings;