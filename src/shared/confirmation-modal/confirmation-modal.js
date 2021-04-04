import { useEffect, useState } from 'react';

import { Modal } from 'antd';

function ConfirmationModal(props) {
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        setIsModalVisible(props.show);
    }, [props.show]);
  
    const handleOk = () => {
        props.response(true);
        setIsModalVisible(false);
    };
  
    const handleCancel = () => {
        props.response(false);
        setIsModalVisible(false);
    };

    return (
        <Modal title="Confirmation" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <p>{props.message}</p>
        </Modal>
    );
}

export default ConfirmationModal;