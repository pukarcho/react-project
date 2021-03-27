import { useState, useEffect } from 'react';

import { Row, Col, Button, Input } from 'antd';
import { 
    SearchOutlined,
} from '@ant-design/icons';

import './home.css';

import Post from './components/post';
import AddPostModal from './components/add-post-modal';

function Home() {
    const [addPostModalShow, setAddPostModalShow] = useState(false);
    
    useEffect(() => {

    }, []);

    const modalHide = () => {
        setAddPostModalShow(false);
    };

    const modalShow = () => {
        setAddPostModalShow(true);
    };

    const onSearch = () => {

    };

    return (
        <div className="home-wrapper">
            <Row>
                <Col span={12} offset={6}>
                    <Row>
                        <Col span={24}>
                            <h3 style={{display: 'inline-block'}}>Posts</h3>
                            <Input  placeholder="Search..." prefix={<SearchOutlined />} onChange={onSearch} style={{ margin: "0 8px", width: "calc(100% - 171px)"}} />
                            <Button type="primary" onClick={modalShow}>Add post</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <div className="posts-wrapper">
                                <Post />
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <AddPostModal show={addPostModalShow} hide={modalHide} />
        </div>
    );
}

export default Home;