import { useState } from 'react';

import { Modal, Input, Form, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';

import { postAuthData } from '../../../helpers/app-service';

const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
};

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
};

function AddPostModal(props) {
    const [fileList, setFileList] = useState([]);
    const [form] = Form.useForm();

    const handleCancel = () => {
        form.resetFields();
        props.hide();
    };

    const onSubmit = async (event) => {
        let images =  [];

        if(fileList && typeof fileList[0] !== "undefined"){
            images.push(await getBase64(fileList[0].originFileObj))
        }
        if(fileList && typeof fileList[1] !== "undefined"){
            images.push(await getBase64(fileList[1].originFileObj))
        }
        if(fileList && typeof fileList[2] !== "undefined"){
            images.push(await getBase64(fileList[2].originFileObj))
        }
        if(fileList && typeof fileList[3] !== "undefined"){
            images.push(await getBase64(fileList[3].originFileObj))
        }


        let postObj = {
            name: event.name,
            description: event.description,
            images: images
        };
        
        postAuthData('post/add', postObj, function(){
            toast.success('Post is added');
            form.resetFields();
            props.hide();
        });
    };

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );
    
    const handleChange = ({ fileList }) => {
        setFileList(fileList);
    }



    return (
        <Modal title="Add Post" visible={props && props.show} onOk={() => { form.submit() }} onCancel={handleCancel} okText="Post">
            <Form {...layout} form={form} name="post-form" onFinish={onSubmit}>
                <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please input post Name!', }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="description" label="Description">
                    <Input.TextArea rows={6} />
                </Form.Item>
                <Upload
                    listType="picture-card"
                    fileList={fileList}
                    onChange={handleChange}
                    onPreview={null}
                    beforeUpload={() => {return false}}
                >
                    {fileList.length >= 4 ? null : uploadButton}
                </Upload>
            </Form>

            
        </Modal>
    );
}

export default AddPostModal;