import { useState, useEffect } from 'react';

import { Row, Col, Button, Input } from 'antd';
import { SearchOutlined, } from '@ant-design/icons';

import './home.css';
import { isAuthenticated } from '../../helpers/app-auth';
import { postData } from '../../helpers/app-service';

import Post from './components/post';
import AddPostModal from './components/add-post-modal';

function Home() {
    const [addPostModalShow, setAddPostModalShow] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [activateSearch, setActivateSearch] = useState(false);
    const [allowSearch, setAllowSearch] = useState(false);
    const [posts, setPosts] = useState({});

    useEffect(() => {
        if(allowSearch){
            const timeout = setTimeout(() => {
                setActivateSearch(state => !state);
            }, 500);
            return () => clearTimeout(timeout);
        }
        else{
            setAllowSearch(true);
        }
    }, [searchValue]);
    
    useEffect(() => {
        if(!addPostModalShow){
            postData('post/get_all', searchValue, function(data){
                setPosts(data);
            });
        }
    }, [addPostModalShow, activateSearch]);    

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
                <Col span={14} offset={5}>
                    <Row>
                        <Col span={24}>
                            <h3 style={{textAlign: "center"}}>Posts</h3>
                            <div style={{marginBottom: "15px"}}>
                                <Input  placeholder="Search..." prefix={<SearchOutlined />} onChange={onSearch} style={{marginRight: "8px", width: "calc(100% - 97px)"}} />
                                <Button type="primary" onClick={modalShow} disabled={isAuthenticated() ? false : true}>Add post</Button>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <div className="posts-wrapper">
                                {Object.keys(posts).length !== 0 ? posts.map((post, key) => (
                                    <Post key={post.id} data={post} />
                                )) : <p style={{textAlign: "center"}}>No posts</p>}
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