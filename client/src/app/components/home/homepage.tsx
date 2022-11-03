import { CaretRightOutlined, GithubOutlined } from "@ant-design/icons";
import { Button, Col, List, Row, Typography, Image } from "antd";
import Title from "antd/lib/typography/Title";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { RouteLinks } from "../../../App-Routes";
import FadeInSection from "../fade-in/fade-in";



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


                    <Col xl={{span:2, offset: 2}}>
                    <Image preview={false} src="/assets/React_logo192.png" />

                    </Col>
                    <Col xl={{span:2}}>
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
                    <Col xl={{span:2, offset: 4}}>
                        <Image preview={false} src="/assets/Microsoft_.NET_logo.png" />
                    </Col>
                </Row>

            </FadeInSection>
        </Fragment>
    )
}