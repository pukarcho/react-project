import { useState } from 'react';

import { Image, Collapse, Row, Col, Input, Button, Form } from 'antd';
import { toast } from 'react-toastify';
import Scrollbars from 'react-custom-scrollbars';

import { isAuthenticated } from '../../../helpers/app-auth';
import { postAuthData, postData } from '../../../helpers/app-service';

import Comment from './comment';

const { Panel } = Collapse;
const { TextArea } = Input;

function Post({data}) {
    let isAuth = isAuthenticated();
    const [commentText, setCommentText] = useState("");
    const [comments, setComments] = useState([]);

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

    return (
        <div className="post">
            <Row>
                <Col span={24}>
                    <h4 style={{display: "inline-block"}}>{data.name}</h4>
                    <span style={{float: "right", marginTop: "10px"}}>Posted by: <strong>{data.postBy}</strong></span>
                </Col>              
            </Row>
            <Row>
                <Col span={12} style={{padding: "12px"}}>
                    <Image.PreviewGroup>
                        <Row>
                            <Col span={12}>
                                <Image
                                    width={160}
                                    height={120}
                                    style={{objectFit: "contain"}}
                                    src={data.images && typeof data.images[0] !== "undefined" ? data.images[0] : "nope"}
                                    fallback="https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg"
                                />
                            </Col>
                            <Col span={12}>
                                <Image
                                    width="100%"
                                    height="100%"
                                    style={{objectFit: "contain"}}
                                    src={data.images && typeof data.images[1] !== "undefined" ? data.images[1] : "nope"}
                                    fallback="https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg"
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <Image
                                    width={160}
                                    height={120}
                                    style={{objectFit: "contain"}}
                                    src={data.images && typeof data.images[2] !== "undefined" ? data.images[2] : "nope"}
                                    fallback="https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg"
                                />
                            </Col>
                            <Col span={12}>
                                <Image
                                    width={160}
                                    height={120}
                                    style={{objectFit: "contain"}}
                                    src={data.images && typeof data.images[3] !== "undefined" ? data.images[3] : "nope"}
                                    fallback="https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg"
                                />
                            </Col>
                        </Row>
                    </Image.PreviewGroup>
                </Col>
                <Col span={12} style={{borderLeft: "1px solid #d3d3d3", paddingLeft: "16px"}}>
                    <h5>Description</h5>
                    <Scrollbars hideTracksWhenNotNeeded={true} style={{width: '100%', height:'285px'}}>
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
                    <Form name={`comment${data.id}`}  className="comment-form" initialValues={{ remember: true, }} onFinish={addComment}>
                        <Form.Item rules={[{ required: true, message: 'Please input your Comment!', },]} style={{width: "100%"}}>
                            <TextArea 
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
        </div>
    );
}

export default Post;