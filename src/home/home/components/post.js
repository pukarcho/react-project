import { useState } from 'react';

import { Collapse, Row, Col, Input, Button, Form } from 'antd';
import { toast } from 'react-toastify';
import Scrollbars from 'react-custom-scrollbars';
import Cookies from 'js-cookie';

import { isAuthenticated } from '../../../helpers/app-auth';
import { postAuthData, postData } from '../../../helpers/app-service';

import Comment from './comment';
import Gallery from './gallery';
import ConfirmationModal from '../../../shared/confirmation-modal/confirmation-modal';

const { Panel } = Collapse;

function Post({data}) {
    const [commentText, setCommentText] = useState("");
    const [comments, setComments] = useState([]);
    const [showRemoveComfirmation, setShowRemoveComfirmation] = useState(false);

    let isAuth = isAuthenticated();
    const username = Cookies.get('username');

    const addComment = () => {
        let postObj = {
            postId: data.id,
            commentText: commentText
        };

        postAuthData("post/add_comment", postObj, function(){
            setCommentText('');
            getComments(data.id);
            toast.success('Comment is added');
        });
    };

    const onCollapse = (event) => {
        if(event.length > 1){
            getComments(data.id);
        }
    };

    const getComments = (postId) => {
        postData("post/get_comments", postId, function(data){
            setComments(data);
        });
    }

    const confirmationResponse = (answer) => {
        setShowRemoveComfirmation(false);
        if(answer){
            postAuthData('post/remove', data.id, function(){
                debugger
            });
        }
    };

    return (
        <div className="post">
            <Row>
                <Col span={24}>
                    <h4 style={{display: "inline-block"}}>{data.name}</h4>
                    {isAuth && data.postBy === username ? (
                        <div className="post-edit-btns">
                            <Button style={{marginRight: "6px"}}>Edit</Button>
                            <Button onClick={() => setShowRemoveComfirmation(true)}>Remove</Button>
                        </div>
                    ) : (
                        <span style={{float: "right", marginTop: "10px"}}>Posted by: <strong>{data.postBy}</strong></span>
                    )}
                </Col>              
            </Row>
            <Row>
                <Col span={12} style={{padding: "12px"}}>
                    <Gallery data={data} />
                </Col>
                <Col span={12} style={{borderLeft: "1px solid #d3d3d3", paddingLeft: "16px"}}>
                    <h5>Description</h5>
                    <Scrollbars hideTracksWhenNotNeeded={true} style={{width: '100%', height:'455px'}}>
                        <p>{data.description}</p>
                    </Scrollbars>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Collapse defaultActiveKey={['']} ghost onChange={onCollapse}>
                        <Panel header="Comments" key="1">
                            {comments.length !== 0 ? comments.map((data) => (
                                <Comment key={data.id} data={data} />
                            )) : (
                                <span>No comments</span>
                            )}
                        </Panel>
                    </Collapse>
                </Col>
            </Row>
            <Row>
                <Col span={24} style={{padding: "0 12px 12px 12px"}}>
                    <Form name={`comment${data.id}`} className="comment-form" onFinish={addComment}>
                        <Form.Item rules={[{ required: true, message: 'Please input your Comment!', },]} style={{width: "100%"}}>
                            <Input.TextArea 
                                rows={3}
                                className="comment-input"
                                placeholder={isAuth ? "Write comment..." : "To write a comment, log in first"}
                                disabled={!isAuth}
                                value={commentText}
                                onChange={(event) => setCommentText(event.currentTarget.value)}
                                style={{width: "calc(100% - 76px)"}}
                            />
                            <Button type="primary" htmlType="submit" disabled={!isAuth} style={{height: "75px"}}>Submit</Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
            <ConfirmationModal show={showRemoveComfirmation} message={`Are you sure you want to delete "${data.name}"`} response={confirmationResponse} />
        </div>
    );
}

export default Post;