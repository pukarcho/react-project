import { useEffect, useState } from 'react';

import { Modal, Input, Form, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';

import { postAuthData, getBase64 } from '../../../helpers/app-service';

const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
};

function AddEditPostModal(props) {
    const [fileList, setFileList] = useState([]);
    const [fields, setFields] = useState([]);
    const [form] = Form.useForm();

    useEffect(() => {
        if(props.data.show && props.data.id !== 0){
            postAuthData("post/get_by_id", props.data.id, function(data){
                setFields([
                    {
                        name: ['name'],
                        value: data.name,
                    },
                    {
                        name: ['description'],
                        value: data.description,
                    }
                ]);
            });
        }
    }, [props.data.show]);

    const handleCancel = () => {
        form.resetFields();
        props.hide();
    };

    const onSubmit = async (event) => {
        let images =  [];
        let url = "post/add";
        let msg = "Post is added";

        if(props.data.id === 0){
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
        }
        else{
            url = "post/edit";
            msg = "Post is edited";
        }
        
        let postObj = {
            id: props.data.id,
            name: event.name,
            description: event.description,
            images: images
        };

        postAuthData(url, postObj, function(){
            toast.success(msg);
            form.resetFields();
            props.hide();
            props.update();
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
        <Modal title={props.data.id === 0 ? "Add Post" : "Edit Post"} visible={props && props.data.show} onOk={() => { form.submit() }} onCancel={handleCancel} okText={props.data.id === 0 ? "Post" : "Save"}>
            <Form {...layout} form={form} name="post-form" onFinish={onSubmit} fields={fields}>
                <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please input post Name!', }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="description" label="Description">
                    <Input.TextArea rows={6} />
                </Form.Item>
                {props.data.id === 0 ? (
                    <Upload
                        listType="picture-card"
                        fileList={fileList}
                        onChange={handleChange}
                        onPreview={null}
                        beforeUpload={() => {return false}}
                    >
                        {fileList.length >= 4 ? null : uploadButton}
                    </Upload>
                ) : null}
            </Form>
        </Modal>
    );
}

export default AddEditPostModal;