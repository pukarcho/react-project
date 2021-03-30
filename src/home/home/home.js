import { useState, useEffect } from 'react';

import { Row, Col, Button, Input } from 'antd';
import { 
    SearchOutlined,
} from '@ant-design/icons';

import './home.css';

import { postData } from '../../services/app-service';

import Post from './components/post';
import AddPostModal from './components/add-post-modal';

function Home() {
    const [addPostModalShow, setAddPostModalShow] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [posts, setPosts] = useState({});
    
    useEffect(() => {
        if(!addPostModalShow){
            postData('post/getAll', '', function(data){
                setPosts(data);
            });
        }
    }, [addPostModalShow]);

    const modalHide = () => {
        setAddPostModalShow(false);
    };

    const modalShow = () => {
        setAddPostModalShow(true);
    };

    const onSearch = (event) => {
        setSearchValue(event.currentTarget.value);
    };

    return (
        <div className="home-wrapper">
            <Row>
                <Col span={12} offset={6}>
                    <Row>
                        <Col span={24}>
                            <h3 style={{textAlign: "center"}}>Posts</h3>
                            <div style={{marginBottom: "15px"}}>
                                <Input  placeholder="Search..." prefix={<SearchOutlined />} onChange={onSearch} style={{ marginRight: "8px", width: "calc(100% - 97px)"}} />
                                <Button type="primary" onClick={modalShow}>Add post</Button>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <div className="posts-wrapper">
                                {Object.keys(posts).length !== 0 ? posts.filter(a => a.name.toLowerCase().includes(searchValue.toLowerCase())).map((post, key) => (
                                    <Post data={post} />
                                )) : null}
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