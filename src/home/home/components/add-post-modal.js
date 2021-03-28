import { useEfect, useState } from 'react';

import { Modal, Input, Form } from 'antd';

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
        debugger
    };

    return (
        <Modal title="Add Post" visible={props && props.show} onOk={() => {
            form
              .validateFields()
              .then((values) => {
                form.resetFields();
                onSubmit(values);
              })
              .catch((info) => {
                console.log('Validate Failed:', info);
              });
          }} onCancel={handleCancel} okText="Post">
            <Form {...layout} form={form} name="post-form">
                <Form.Item name="postName" label="Name" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="postDescription" label="Description">
                    <Input.TextArea rows={6} />
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default AddPostModal;