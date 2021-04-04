import { Layout, Row, Col } from 'antd';
import moment from 'moment';

import './footer.css';

const { Footer } = Layout;

function SiteFooter() {

    return (
        <Footer>
            <Row>
                <Col offset={6} span={12}>
                    <Row style={{mergin: "36px"}}>
                        <Col span={8} style={{padding: "20px"}}>
                            <h6>Company</h6>
                            <ul>
                                <li>something</li>
                                <li>and more</li>
                                <li>and more</li>
                                <li>and more</li>
                                <li>and more</li>
                                <li>and more</li>
                            </ul>
                        </Col>
                        <Col span={16} className="about-us-footer">
                            <h6>About us</h6>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row style={{borderTop: "1px solid #d3d3d3"}}>
                <Col span={24}>
                    <p style={{ textAlign: 'center' }}>Copyright &copy; {moment().format("YYYY")} *TestCompany*, Inc. All Rights Reserved.</p>
                </Col>
            </Row>
        </Footer>
    );
}

export default SiteFooter;