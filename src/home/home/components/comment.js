import { Row, Col } from 'antd';
import { 
    UserOutlined,
    MinusOutlined,
} from '@ant-design/icons';

function Comment() {

    return (
        <div className="comment-wrapper">
            <Row>
                <UserOutlined />
                <h6>Дани:</h6>
            </Row>
            <Row>
                <div className="comment-text">
                    <MinusOutlined />
                    <p style={{display: "inline-block"}}>Следя</p>
                </div>
            </Row>
        </div>
    );
}

export default Comment;