import { ArrowUpOutlined, CaretRightOutlined, GithubOutlined } from "@ant-design/icons";
import { Col, List, Row, Typography, Image, Tabs, Avatar, Anchor } from "antd";
import Link from "antd/lib/typography/Link";
import { observer } from "mobx-react-lite";
import { Fragment } from "react";
import { RouteLinks } from "../../../App-Routes";
import FadeInSection from "../fade-in/fade-in";
import ProjectSummary from "../project-display/project-summary";
import useWindowDimensions from "../window-dimensions/UseWindowDimensions";
import './homepage.css';




export default observer(function HomePage() {

    const routeLinks = new RouteLinks;
    document.title = 'Cody Llamas';

    const { height, width } = useWindowDimensions();
    return (
        <Fragment>
            
            <Row style={{ paddingTop: '100px' }} >
                <Col xs={{ span: 22, offset: 1 }} md={{span: 12, offset: 3}} lg={{span: 12, offset: 2}} xl={{ span: 9, offset: 4 }}>
                    <h3 style={{ color: '#3FC1C9' }}>Hi, my name is</h3>
                    <h1 style={{ color: '#CCD6F6', fontSize: '4.2em', marginBottom: 0 }} >Cody Llamas</h1>
                    <h2 style={{ color: '#8892B0', fontSize: '4.2em', lineHeight: 1.25 }} >I Engineer Solutions</h2>
                </Col>
                
                <Col style={{marginTop:'100px'}} xs={{ span: 22, offset: 1 }} md={{span:12, offset: 3}} lg={{span: 12, offset: 2}} xl={{ span: 10, offset: 4 }}>
                    <p className='base-text-color' style={{ fontSize: '1.5em', lineHeight: 1.25 }} >I’m a software engineer who builds web platforms to give users exceptional digital experiences.</p>
                    <p className='base-text-color' style={{ fontSize: '1.5em', lineHeight: 1.25 }}>Currently, I’m focused on building and automating enterprise solutions at <span style={{ color: '#3FC1C9' }}><strong>Cognizant</strong></span>. </p>
                </Col>
                <Col xs={{span:12, offset:6}} md={{span: 6, offset: 1}} lg={{span: 5, offset: 2}}  xl={{ span: 4, offset: 3 }}>
                    <a href={routeLinks.myGithub} style={{display: 'flex', justifyContent: 'center', marginTop: '25%'}}><GithubOutlined style={{ fontSize: '9em', color: '#3FC1C9' }} /></a>
                    <br />
                    <h3 style={{ color: '#3FC1C9', marginTop: '0px', textAlign: 'center' }}>Check out my projects!</h3>
                </Col>
            

            </Row>

            <FadeInSection>
                <Row style={{ marginTop: '250px' }}>
                    <Col xs={{ span: 22, offset: 1 }}  xl={{ span: 18, offset: 4 }}>
                        <h2 id='about-me' style={{ color: '#CCD6F6', fontSize: '3.25em', marginBottom: 0 }} >About Me </h2>
                    </Col>
                    <Col xs={{ span: 22, offset: 1 }} xl={{ span: 8, offset: 4 }}>
                        <p className='base-text-color' style={{ fontSize: '1.5em', lineHeight: 1.25 }}>
                            Hello! My name is Cody and I enjoy engineering digital solutions.

                            Today, I’ve had the privilege of working as a front-end consultant, software QA in test, and full-stack developer.
                        </p>
                        <p className='base-text-color' style={{ fontSize: '1.5em', lineHeight: 1.25 }}>
                            My main focus has been building user-friendly platforms for analytic monitoring, and automated solutions at Cognizant for a variety of clients.

                            The latest technologies I’ve been working with recently:
                        </p>
                    </Col>


                    <Col xs={{ span: 12, offset: 6 }} sm={{span:8, offset: 8}} lg={{ span: 6, offset: 9 }} xl={{ span: 4, offset: 4 }} style={{ height: '100%' }}>
                        <Image style={{ borderRadius: '10%', width:'95%' }} preview={false} src='/assets/SquarePortrait.jpg' />
                    </Col>

                </Row>

                <Row>
                
                    <Col xs={{span: 9, offset: 4}} sm={{span:7, offset:5}} xl={{ span: 2, offset: 4 }}>
                        <List
                            dataSource={['React', 'Angular', '.NET 6']}
                            renderItem={(item) => (
                                <List.Item style={{ border: 'none' }}>
                                    <Typography.Text className='base-text-color' style={{ fontSize: '1.5em' }}><CaretRightOutlined style={{ color: '#3FC1C9' }} />{item}</Typography.Text>
                                </List.Item>
                            )}
                        />
                    </Col>
                    

                    <Col xs={{span: 9, offset: 1}} sm={{span:7, offset:4}} xl={{ span: 5, offset: 1 }}>
                        <List
                            dataSource={['TypeScript', 'JavaScript', 'C#']}
                            renderItem={(item) => (
                                <List.Item style={{ border: 'none' }}>
                                    <Typography.Text className='base-text-color' style={{ fontSize: '1.5em' }}><CaretRightOutlined style={{ color: '#3FC1C9' }} />{item}</Typography.Text>
                                </List.Item>
                            )}
                        />
                    </Col>
                    
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} xl={{ span: 6, offset: 3 }}>
                        <Row>
                            <Col xs={{ span: 6, offset: 2 }} sm={{ span: 6, offset: 2 }} md={{span: 4, offset: 4}} xl={{ span: 10, offset: 0 }}>
                                <Image preview={false} src="/assets/React_logo192.png" />

                            </Col>
                            <Col xs={{ span: 6, offset: 1 }} sm={{ span: 6, offset: 1 }} md={{span: 4, offset: 2}} xl={{ span: 10, offset: 4 }}>
                                <Image preview={false} src="https://angular.io/assets/images/logos/angular/angular.svg" />
                            </Col>
                            <Col xs={{ span: 6, offset: 1 }} sm={{ span: 6, offset: 1 }} md={{span: 4, offset: 2}} xl={{ span: 10, offset: 7 }}>
                                <Image preview={false} src="/assets/Microsoft_.NET_logo.png" />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </FadeInSection>
            
            {width > 500 ? 
            <FadeInSection>
                <Row style={{ marginTop: '250px' }}>
                    <Col sm={{span:20, offset: 2}} xl={{ span: 12, offset: 8 }}>
                        <h2 style={{ color: '#CCD6F6', fontSize: '3.25em', marginBottom: 0 }}>Work History </h2>
                    </Col>
                    <Col xs={{span:24}} sm={{span:20, offset: 2}} xl={{ span: 12, offset: 8 }}>
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
                                            </Row>
                                        </Fragment>,
                                    style: { color: 'white', height: 160 }
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
            

            :

                <Row style={{ marginTop: '250px' }}>
                    
                    
                    <Col xs={{span:22, offset: 1}} sm={{span: 22, offset: 1}} xl={{ span: 13, offset: 8 }}>
                        <h2 style={{ color: '#CCD6F6', fontSize: '3.25em', marginBottom: 0 }}>Work History </h2>
                    </Col>
                    <Col xs={{span:22, offset: 1}} xl={{ span: 12, offset: 8 }}>
                        <Tabs
                            className='tabHover'
                            defaultActiveKey="1"
                            tabPosition={'top'}
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
                                                <Col span={1} ><CaretRightOutlined style={{ color: '#3FC1C9' }} /></Col> <Col span={23}><p>Pitched, planned, and executed development of an analytic project planning platform with Angular and .NET Core.</p></Col>
                                                <Col span={1} ><CaretRightOutlined style={{ color: '#3FC1C9' }} /></Col> <Col span={23}><p>Developed and led Healthcare vertical solutions by analyzing and integrating in-house products with third-party software such as Facets, QNXT, and AppDynamics.</p></Col>
                                            </Row>
                                        </Fragment>,
                                    style: { color: 'white', height: 160 }
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
            }
            <Anchor offsetTop={height - 100}>
                <Link href="#top" className='base-text-color' style={{ fontSize: '1.5em' }}>&nbsp; Back Up <ArrowUpOutlined className='base-text-color' style={{ fontSize: '1.5em' }} /></Link>

            </Anchor>
            
            <FadeInSection>
                <Row style={{ marginTop: '250px' }}>
                    <Col xs={{ span: 22, offset: 1 }}  md={{ span: 16, offset: 4 }} lg={{ span: 18, offset: 6 }} xl={{ span: 18, offset: 6 }}>
                            <h2 style={{ color: '#CCD6F6', fontSize: '3.25em', marginBottom: 0 }} >Some Projects I've Built </h2>
                        </Col>

                        <ProjectSummary
                        projectTitle={"My Porfolio Project"}
                        projectSummary={`This is a long-form project that I built to learn more about React and keep my .NET skills sharp.
                    It's a place to expand on my blogs and continuously add features moving forward.
                    It currently has the ability for users to create accounts and post blogs under specific categories. `}
                        imageSrc={"/assets/PortfolioPicture.jpg"}
                        isRight={true} projectLink={"https://github.com/caltaylor101/Portfolio-Project"}                    />

                            <Col style={{borderBottom: '2px solid white', marginBottom: '50px', marginTop: '50px', width: '100%'}} span={10} offset={11}>
                            </Col>


                    <ProjectSummary
                        projectTitle={"Django Shopping Kit"}
                        projectSummary={`This project helped me land my first job out of college. It was built with Django and was hosted on AWS. 
                        It utilized front-end technologies such as HTML, CSS, Javascript, and AJAX.
                        Django was the REST framework which had AWS
                        The project allows users to create accounts, create product categories, privatize their uses, and organize products.
                        Other users are able to post comments, and vote on posts.`}
                        imageSrc={"/assets/Django-Kit-Picture.jpg"}
                        isRight={false} projectLink={"https://github.com/caltaylor101/Django_ShoppingKit"}                    />
                </Row>
            </FadeInSection>


            <FadeInSection>
                <Row style={{ marginTop: '250px' }}>
                        <Col xs={{ span: 22, offset: 1 }} sm={{ span: 22, offset: 1 }} md={{ span: 16, offset: 4 }} lg={{ span: 18, offset: 6 }} xl={{ span: 18, offset: 6 }}>
                            <h2 style={{ color: '#CCD6F6', fontSize: '3.25em', marginBottom: 0 }} >Some Hobby Projects </h2>
                        </Col>

                        <ProjectSummary
                        projectTitle={"Runaway Snowball"}
                        projectSummary={`This is an Android game I created in Unity utilizing free artwork I found online.
                        The snowball rolls down a mountain infinitely and gets bigger the further it gets. 
                        When the snowball is big enough, it can absorb animals for a bonus growth. 
                        There are powerups, level gates, and in-game store, upgrades, and player progression. `}
                        imageSrc={"/assets/RunawaySnowballPicture.jpg"}
                        isRight={true} 
                        projectLink={"https://play.google.com/store/apps/details?id=com.NightLlama.RunawaySnowball&hl=en&gl=US"}                    
                        />

                            <Col style={{borderBottom: '2px solid white', marginBottom: '50px', marginTop: '50px', width: '100%'}} span={10} offset={11}>
                            </Col>


                    <ProjectSummary
                        projectTitle={"On The Wind"}
                        projectSummary={`I built a team for the Lost Relic Games - Game Jam and developed this Windows game. 
                        I managed a team of 4 to create this game in 2 weeks. 
                        It taught me a lot more about game design, play testing, and importance of decoupling classes.
                        After this project, I took extra time to learn more about datastructures, algorithms, and programming designs.
                        `}
                        imageSrc={"/assets/OnTheWindPicture.jpg"}
                        isRight={false} 
                        projectLink={"https://caltaylor101.itch.io/on-the-wind"}                    
                        />
                            <Col style={{borderBottom: '2px solid white', marginBottom: '50px', marginTop: '50px', width: '100%'}} span={10} offset={3}>
                            </Col>
                    <ProjectSummary
                        projectTitle={"Basic Ball Dropper"}
                        projectSummary={`This is an Android game I created in Unity utilizing basic sprites.
                        The game was based off of idle games, and the player's goal is to keep upgrading the strength of the balls dropping.
                        This was my first Unity game created, and full of many mistakes and branches. 
                        I started this hobby at the beginning of 2022, and create 3 more Unity games after this. `}
                        imageSrc={"/assets/BasicBallDropperPicture.jpg"}
                        isRight={true} 
                        projectLink={"https://github.com/caltaylor101/Basic-Ball-Dropper"}                    
                        />
                </Row>
            </FadeInSection>


        </Fragment>
    )
})