import { Image, Collapse, Row, Col, Input, Button } from 'antd';

import { isAuthenticated } from '../../../services/app-auth';

import Comment from './comment';

const { Panel } = Collapse;
const { TextArea } = Input;

function Post({data}) {
    let isAuth = isAuthenticated();

    return (
        <div className="post">
            <Row>
                <Col span={24}>
                    <h4>{data.name}</h4> 
                </Col>              
            </Row>
            <Row>
                <Col span={12}>
                    <Image.PreviewGroup>
                        <Image
                            width={200}
                            src=""
                            fallback="https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg"
                        />
                        <Image
                            width={200}
                            src="https://media1.s-nbcnews.com/i/newscms/2019_21/2870431/190524-classic-american-cheeseburger-ew-207p_d9270c5c545b30ea094084c7f2342eb4.jpg"
                            fallback="https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg"
                        />
                    </Image.PreviewGroup>
                </Col>
                <Col span={12} style={{borderLeft: "1px solid #d3d3d3", paddingLeft: "16px"}}>
                    <h5>Description</h5>
                    <p>{data.description}</p>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Collapse defaultActiveKey={['']} ghost>
                        <Panel header="Comments" key="1">
                            <Comment />
                            <Comment />
                            <Comment />
                        </Panel>
                    </Collapse>
                </Col>
            </Row>
            <Row>
                <Col span={24} style={{padding: "0 12px 12px 12px"}}>
                    <TextArea rows={3} className="comment-input" placeholder={isAuth ? "Write comment..." : "To write a comment, log in first!"} disabled={!isAuth} style={{width: "calc(100% - 76px)"}}/>
                    <Button type="primary" disabled={!isAuth} style={{height: "100%"}}>Submit</Button>
                </Col>
            </Row>
        </div>
    );
}

export default Post;