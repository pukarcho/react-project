import { useState, useEffect, Fragment } from 'react';

import { Row, Col, Button, Input } from 'antd';
import { 
    SearchOutlined,
} from '@ant-design/icons';

import './home.css';
import { isAuthenticated } from '../../services/app-auth';
import { postData } from '../../services/app-service';

import Post from './components/post';
import AddPostModal from './components/add-post-modal';

function Home() {
    const [addPostModalShow, setAddPostModalShow] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [activateSrarch, setActivateSrarch] = useState(false);
    const [posts, setPosts] = useState({});
    
    useEffect(() => {
        if(!addPostModalShow){
            postData('post/getAll', searchValue, function(data){
                setPosts(data);
            });
        }
    }, [addPostModalShow, activateSrarch]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setActivateSrarch(state => !state);
        }, 500);
        return () => clearTimeout(timeout);
    }, [searchValue]);

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
                                {isAuthenticated() ? (
                                    <Fragment>
                                        <Input  placeholder="Search..." prefix={<SearchOutlined />} onChange={onSearch} style={{marginRight: "8px", width: "calc(100% - 97px)"}} />
                                        <Button type="primary" onClick={modalShow}>Add post</Button>
                                    </Fragment>
                                ) : (
                                    <Input  placeholder="Search..." prefix={<SearchOutlined />} onChange={onSearch} style={{marginRight: "8px"}} />
                                )}
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <div className="posts-wrapper">
                                {Object.keys(posts).length !== 0 ? posts.map((post, key) => (
                                    <Post key={post.id} data={post} />
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