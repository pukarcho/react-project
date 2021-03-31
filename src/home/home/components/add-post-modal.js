import { useEfect, useState } from 'react';

import { Modal, Input, Form } from 'antd';
import { toast } from 'react-toastify';

import { postAuthData } from '../../../services/app-service';

const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
};

function AddPostModal(props) {
    const [form] = Form.useForm();

    const handleCancel = () => {
        props.hide();
    };

    const onSubmit = (event) => {
        let postObj = {
            name: event.name,
            description: event.description
        }
        
        postAuthData('post/add', postObj, function(){
            toast.success('post is added');
            form.resetFields();
            props.hide();
        });
    };

    return (
        <Modal title="Add Post" visible={props && props.show} onOk={() => { form.submit() }} onCancel={handleCancel} okText="Post">
            <Form {...layout} form={form} name="post-form" onFinish={onSubmit}>
                <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="description" label="Description">
                    <Input.TextArea rows={6} />
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default AddPostModal;