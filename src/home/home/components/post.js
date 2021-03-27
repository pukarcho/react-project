import { Image, Collapse, Row, Col } from 'antd';

import Comment from './comment';

const { Panel } = Collapse;

function Post() {

    return (
        <div className="post">
            <Row>
                <Col span={24}>
                    <h4>Burger</h4> 
                </Col>              
            </Row>
            <Row>
                <Col span={12}>
                    <Image.PreviewGroup>
                        <Image
                            width={200}
                            src="https://natashaskitchen.com/wp-content/uploads/2019/04/Best-Burger-4.jpg"
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
                    <p>
                        майонеза - 1/2 чаша
                        чесън - 2 скилдки
                        телешко филе - 4х120 г
                        бекон - 4 слайса
                        питки - 4 бр.
                        сирене - 4 резена
                        зелена салата
                        червено цвекло - 1 чаша мариновано
                    </p>
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
        </div>
    );
}

export default Post;