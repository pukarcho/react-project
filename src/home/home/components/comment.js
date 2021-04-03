import { Row } from 'antd';
import { 
    UserOutlined,
    MinusOutlined,
} from '@ant-design/icons';

function Comment({ data }) {

    return (
        <div className="comment-wrapper">
            <Row>
                <UserOutlined />
                <h6>{data.commentBy}:</h6>
            </Row>
            <Row>
                <div className="comment-text">
                    <MinusOutlined />
                    <p style={{display: "inline-block"}}>{data.commentText}</p>
                </div>
            </Row>
        </div>
    );
}

export default Comment;