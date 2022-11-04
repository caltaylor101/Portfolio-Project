import { CaretRightOutlined, GithubOutlined } from "@ant-design/icons";
import { Button, Col, List, Row, Typography, Image, Tabs } from "antd";
import { Fragment } from "react";
import { RouteLinks } from "../../../App-Routes";
import FadeInSection from "../fade-in/fade-in";
import './homepage.css';



export default function HomePage() {

    const routeLinks = new RouteLinks;
    document.title = 'Cody Llamas';

    return (
        <Fragment>
            <Row style={{ paddingTop: '100px' }}>
                <Col xs={{ span: 22, offset: 1 }} sm={{ span: 24, offset: 0 }} xl={{ span: 18, offset: 6 }}>
                    <h3 style={{ color: '#3FC1C9' }}>Hi, my name is</h3>
                    <h1 style={{ color: '#CCD6F6', fontSize: '4.5em', marginBottom: 0 }} >Cody Llamas</h1>
                    <h2 style={{ color: '#8892B0', fontSize: '4.5em', lineHeight: 1.25 }} >I Engineer Solutions</h2>
                </Col>
                <Col xs={{ span: 22, offset: 1 }} xl={{ span: 6, offset: 6 }}>
                    <p className='base-text-color' style={{ fontSize: '1.5em', lineHeight: 1.25 }} >I’m a software engineer who builds web platforms to give users exceptional digital experiences.</p>
                    <p className='base-text-color' style={{ fontSize: '1.5em', lineHeight: 1.25 }}>Currently, I’m focused on building and automating enterprise solutions at <span style={{ color: '#3FC1C9' }}><strong>Cognizant</strong></span>. </p>
                </Col>
                <Col xl={{ span: 3, offset: 3 }}>
                    <a href={routeLinks.myGithub}><GithubOutlined style={{ fontSize: '9em', color: '#3FC1C9' }} /></a>
                </Col>
            </Row>

            <FadeInSection>
                <Row style={{ marginTop: '250px' }}>
                    <Col xs={{ span: 22, offset: 1 }} sm={{ span: 24, offset: 0 }} xl={{ span: 18, offset: 6 }}>
                        <h2 style={{ color: '#CCD6F6', fontSize: '3.25em', marginBottom: 0 }} >About Me: </h2>
                    </Col>
                    <Col xs={{ span: 22, offset: 1 }} xl={{ span: 6, offset: 6 }}>
                        <p className='base-text-color' style={{ fontSize: '1.5em', lineHeight: 1.25 }}>
                            Hello! My name is Cody and I enjoy engineering digital solutions.

                            Today, I’ve had the privilege of working as a front-end consultant, software QA in test, and full-stack developer.
                        </p>
                        <p className='base-text-color' style={{ fontSize: '1.5em', lineHeight: 1.25 }}>
                            My main focus has been building user-friendly platforms for analytic monitoring, and automated solutions at Cognizant for a variety of clients.

                            The latest technologies I’ve been working with recently:
                        </p>
                    </Col>


                    <Col xl={{ span: 2, offset: 2 }}>
                        <Image preview={false} src="/assets/React_logo192.png" />

                    </Col>
                    <Col xl={{ span: 2 }}>
                        <Image preview={false} src="https://angular.io/assets/images/logos/angular/angular.svg" />

                    </Col>




                </Row>

                <Row>
                    <Col xl={{ span: 2, offset: 6 }}>
                        <List
                            dataSource={['React', 'Angular', '.NET 6']}
                            renderItem={(item) => (
                                <List.Item style={{ border: 'none' }}>
                                    <Typography.Text className='base-text-color' style={{ fontSize: '1.5em' }}><CaretRightOutlined style={{ color: '#3FC1C9' }} />{item}</Typography.Text>
                                </List.Item>
                            )}
                        />
                    </Col>

                    <Col xl={{ span: 2, offset: 1 }}>
                        <List
                            dataSource={['TypeScript', 'JavaScript', 'C#']}
                            renderItem={(item) => (
                                <List.Item style={{ border: 'none' }}>
                                    <Typography.Text className='base-text-color' style={{ fontSize: '1.5em' }}><CaretRightOutlined style={{ color: '#3FC1C9' }} />{item}</Typography.Text>
                                </List.Item>
                            )}
                        />
                    </Col>
                    <Col xl={{ span: 2, offset: 4 }}>
                        <Image preview={false} src="/assets/Microsoft_.NET_logo.png" />
                    </Col>
                </Row>

            </FadeInSection>
            
            <FadeInSection>
                <Row style={{ marginTop: '250px' }}>
                    <Col xl={{ span: 8, offset: 10 }}>
                        <h2 style={{ color: '#CCD6F6', fontSize: '3.25em', marginBottom: 0 }}>Work History: </h2>
                    </Col>
                    <Col xl={{ span: 8, offset: 10 }}>
                        <Tabs
                            className='tabHover'
                            defaultActiveKey="1"
                            tabPosition={'left'}
                            style={{
                                height: 220,
                                color: '#3FC1C9',
                                border: 'none !important',
                                fontSize: '1.25em',
                                tabSize: '2em'
                            }}
                            size='large'
                            items={[
                                {
                                    label: 'Cognizant',
                                    key: 'tab1',
                                    children:
                                        <Fragment>
                                            Solutions Architect at <strong style={{ color: '#3FC1C9' }}>Cognizant</strong><br />
                                            January 2020 - Present <br /><br />
                                            <Row>
                                                <Col span={1}><CaretRightOutlined style={{ color: '#3FC1C9' }} /></Col> <Col span={23}><p>Pitched, planned, and executed development of an analytic project planning platform with Angular and .NET Core.</p></Col>
                                                <Col span={1}><CaretRightOutlined style={{ color: '#3FC1C9' }} /></Col> <Col span={23}><p>Developed and led Healthcare vertical solutions by analyzing and integrating in-house products with third-party software such as Facets, QNXT, and AppDynamics.</p></Col>
                                                <Col span={1}><CaretRightOutlined style={{ color: '#3FC1C9' }} /></Col> <Col span={23}><p>Developed automated solutions on enterprise software through the utilization of C#, PowerShell, Batch, and Tidal. </p></Col>
                                                <Col span={1}><CaretRightOutlined style={{ color: '#3FC1C9' }} /></Col> <Col span={23}><p>Analyzed, optimized, and made recommendations on system architecture for companies such as CareSource Health Plan, Premera, and Hill Physicians Medical group.</p></Col>

                                            </Row>
                                        </Fragment>,
                                    style: { color: 'white' }
                                },

                                {
                                    label: 'Great Call',
                                    key: 'tab2',
                                    children:
                                        <Fragment>
                                            Software QA in Test at <strong style={{ color: '#3FC1C9' }}>GreatCall</strong>
                                            <br />
                                            June 2019 – August 2019
                                            <br /><br />
                                            <Row>
                                                <Col span={1}><CaretRightOutlined style={{ color: '#3FC1C9' }} /></Col> <Col span={23}><p>Programmed IOT microcontrollers to work with an accelerometer/gyroscope. Wrote code utilizing C and C++ to track and push data captured to an Influx database.</p></Col>
                                                <Col span={1}><CaretRightOutlined style={{ color: '#3FC1C9' }} /></Col> <Col span={23}><p>Developed unit tests with Java to be deployed with Kubernetes.</p></Col>
                                            </Row>
                                        </Fragment>
                                    ,
                                    style: { color: 'white' }
                                },

                                {
                                    label: 'Smith Consulting',
                                    key: 'tab3',
                                    children:
                                        <Fragment>
                                            FrontEnd Developer at <strong style={{ color: '#3FC1C9' }}>Smith Consulting</strong>
                                            <br />
                                            February 2018 – June 2018
                                            <br /><br />
                                            <Row>
                                                <Col span={1}><CaretRightOutlined style={{ color: '#3FC1C9' }} /></Col> <Col span={23}><p>Designed 4 responsive websites that consisted of 7-11 webpages utilizing HTML, CSS, and JavaScript.</p></Col>
                                                <Col span={1}><CaretRightOutlined style={{ color: '#3FC1C9' }} /></Col> <Col span={23}><p>Self-managed 3 different websites based on client communication</p></Col>
                                            </Row>
                                        </Fragment>
                                    ,
                                    style: { color: 'white' }
                                },
                            ]
                            }
                        />
                    </Col>
                </Row>
            </FadeInSection>
        </Fragment>
    )
}