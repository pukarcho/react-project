import { useState } from 'react';

import { Row, Col, Tabs } from 'antd';

import './about-us.css'

const { TabPane } = Tabs;

function AboutUs() {
    const [pageTitle, setPageTitle] = useState('About Us');

    const onTabChange = (event) => {
        switch(event){
            case 'aboutus': 
                setPageTitle('About Us');
                break
            case 'contacts': 
                setPageTitle('Contacts');
                break
            default:
                setPageTitle('About Us');
        }
    };

    return (
        <Row>
            <Col span={12} offset={6}>
                <h3 style={{textAlign: "center"}}>{pageTitle}</h3>
                <div className="about-us-wrapper">
                    <Tabs tabPosition="left" onChange={onTabChange} style={{minHeight: "200px"}}>
                        <TabPane tab="About us" key="aboutus">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            <br /><br />
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            <br /><br />
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </TabPane>
                        <TabPane tab="Contacts" key="contacts">
                            Veliko Tarnovo
                        </TabPane>
                    </Tabs>
                </div>
            </Col>
        </Row>
    );
}

export default AboutUs;