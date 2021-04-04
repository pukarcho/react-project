import { useState, useEffect } from 'react';

import { Row, Col, Button, Input } from 'antd';
import { SearchOutlined, } from '@ant-design/icons';

import './home.css';
import { isAuthenticated } from '../../helpers/app-auth';
import { postData } from '../../helpers/app-service';

import Post from './components/post';
import AddEditPostModal from './components/add-edit-post-modal';

function Home() {
    const [addEditPostModalShow, setAddEditPostModalShow] = useState({show: false, id: 0});
    const [searchValue, setSearchValue] = useState('');
    const [activateSearch, setActivateSearch] = useState(false);
    const [allowSearch, setAllowSearch] = useState(false);
    const [posts, setPosts] = useState({});
    const [updatePosts, setUpdatePosts] = useState(false);

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
        postData('post/get_all', searchValue, function(data){
            setPosts(data);
        });
    }, [activateSearch, updatePosts]);    

    const modalHide = () => {
        setAddEditPostModalShow({show: false, id: 0});
    };

    const modalAddShow = () => {
        setAddEditPostModalShow({show: true, id: 0});
    };

    const modalEditShow = (postId) => {
        setAddEditPostModalShow({show: true, id: postId});
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
                                <Button type="primary" onClick={modalAddShow} disabled={isAuthenticated() ? false : true}>Add post</Button>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <div className="posts-wrapper">
                                {Object.keys(posts).length !== 0 ? posts.map((post, key) => (
                                    <Post key={post.id} data={post} edit={modalEditShow} update={() => setUpdatePosts(update => !update)} />
                                )) : <p style={{textAlign: "center"}}>No posts</p>}
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <AddEditPostModal data={addEditPostModalShow} hide={modalHide} update={() => setUpdatePosts(update => !update)} />
        </div>
    );
}

export default Home;