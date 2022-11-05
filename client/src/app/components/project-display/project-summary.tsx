import { Row, Col, Image } from "antd";
import { Fragment } from "react";
import useWindowDimensions from "../window-dimensions/UseWindowDimensions";

interface Props {
    projectTitle: string;
    projectSummary: string;
    imageSrc: string;
    isRight: boolean;
}

export default function ProjectSummary({ projectTitle, projectSummary, imageSrc, isRight }: Props) {

    const { height, width } = useWindowDimensions();

    if (isRight)
    {
        return (
            <Fragment>
    
                {width >= 992 &&
                    <Fragment>
                        <Col style={{ paddingTop: '50px', borderTop: '1px solid white' }} xs={{ span: 22, offset: 1 }} sm={{ span: 24, offset: 0 }} md={{ span: 18, offset: 4 }} lg={{ span: 8, offset: 6 }} xl={{ span: 8, offset: 6 }}>
                            <Image preview={false} src={imageSrc} />
                        </Col>
    
                        <Col md={{ span: 10, offset: 12 }} lg={{ span: 7, offset: 0 }} xl={{ span: 7, offset: 0 }} style={{ paddingTop: '3%', borderRight: '1px solid white' }}>
                            <Col md={{ span: 17, offset: 0 }} lg={{ span: 17, offset: 0 }} xl={{ span: 17, offset: 0 }}>
                                <h3 style={{ color: '#3FC1C9', fontSize: '1.25em', marginBottom: 0, textAlign: 'right' }} >Featured Project</h3>
                            </Col>
                            <Col md={{ span: 17, offset: 0 }} lg={{ span: 17, offset: 0 }} xl={{ span: 17, offset: 0 }}>
                                <h2 style={{ color: '#CCD6F6', fontSize: '1.5em', marginBottom: 0, textAlign: 'right' }} >{projectTitle}</h2>
                            </Col>
    
                            <Col md={{ span: 17, offset: 0 }} lg={{ span: 20, offset: 0 }} xl={{ span: 24, offset: 0 }} style={{ marginTop: '30px', float: 'right', marginRight: '30%', width: '100%' }}>
                                <div style={{ backgroundColor: 'rgb(0, 21, 41)', padding: '20px' }}>
                                    <p className='base-text-color' style={{ fontSize: '1.25em' }}>
                                        {projectSummary}
                                    </p>
                                </div>
                            </Col>
                        </Col>
                    </Fragment>
                }
    
                {width < 992 &&
    
                    <Row>
                        <Col xs={{ span: 12, offset: 10 }} sm={{ span: 12, offset: 10 }} md={{ span: 10, offset: 12 }} lg={{ span: 7, offset: 0 }} xl={{ span: 7, offset: 0 }} style={{ paddingTop: '3%', borderRight: '1px solid white', borderTop: '1px solid white' }}>
                            <Col xs={{ span: 22, offset: 0 }} sm={{ span: 22, offset: 0 }} md={{ span: 17, offset: 0 }} lg={{ span: 17, offset: 0 }} xl={{ span: 17, offset: 0 }}>
                                <h3 style={{ color: '#3FC1C9', fontSize: '1.25em', marginBottom: 0, textAlign: 'right' }} >Featured Project</h3>
                            </Col>
                            <Col xs={{ span: 22, offset: 0 }} sm={{ span: 22, offset: 0 }} md={{ span: 17, offset: 0 }} lg={{ span: 17, offset: 0 }} xl={{ span: 17, offset: 0 }}>
                                <h2 style={{ color: '#CCD6F6', fontSize: '1.5em', marginBottom: 0, textAlign: 'right' }} >{projectTitle} </h2>
                            </Col>
                        </Col>
    
                        <Col xs={{ span: 20, offset: 2 }} sm={{ span: 20, offset: 2 }} md={{ span: 18, offset: 4 }} lg={{ span: 8, offset: 6 }} xl={{ span: 8, offset: 6 }}>
                            <Image preview={false} src={imageSrc} />
                        </Col>
    
    
                        <Col xs={{ span: 20, offset: 2 }} sm={{ span: 20, offset: 2 }} md={{ span: 16, offset: 4 }} lg={{ span: 17, offset: 0 }} xl={{ span: 24, offset: 0 }} style={{ width: '100%' }}>
                            <div style={{ backgroundColor: 'rgb(0, 21, 41)', padding: '20px' }}>
                                <p className='base-text-color' style={{ fontSize: '1.25em' }}>
                                    {projectSummary}
                                </p>
                            </div>
                        </Col>
                    </Row>
                }
    
                <Col xs={{ span: 4, offset: 1 }} sm={{ span: 24, offset: 0 }} xl={{ span: 18, offset: 6 }}>
    
                </Col>
            </Fragment>
        );
    }

    else
    {
        return (
            <Fragment>
    
                {width >= 992 &&
                    <Fragment>
                        

                        <Col md={{ span: 10, offset: 12 }} lg={{ span: 7, offset: 0 }} xl={{ span: 7, offset: 3 }} style={{ paddingTop: '3%', borderLeft: '1px solid white' }}>
                            <Col md={{ span: 17, offset: 0 }} lg={{ span: 17, offset: 0 }} xl={{ span: 17, offset: 2 }}>
                                <h3 style={{ color: '#3FC1C9', fontSize: '1.25em', marginBottom: 0, textAlign: 'left' }} >Featured Project</h3>
                            </Col>
                            <Col md={{ span: 17, offset: 0 }} lg={{ span: 17, offset: 0 }} xl={{ span: 17, offset: 2 }}>
                                <h2 style={{ color: '#CCD6F6', fontSize: '1.5em', marginBottom: 0, textAlign: 'left' }} >{projectTitle}</h2>
                            </Col>
    
                            <Col md={{ span: 17, offset: 0 }} lg={{ span: 20, offset: 0 }} xl={{ span: 24, offset: 0 }} style={{ marginTop: '30px', float: 'left', marginLeft: '30%', width: '100%' }}>
                                <div style={{ backgroundColor: 'rgb(0, 21, 41)', padding: '20px' }}>
                                    <p className='base-text-color' style={{ fontSize: '1.25em' }}>
                                        {projectSummary}
                                    </p>
                                </div>
                            </Col>
                        </Col>
    
                        <Col style={{ paddingTop: '50px', borderTop: '1px solid white', zIndex: -1 }} xs={{ span: 22, offset: 1 }} sm={{ span: 24, offset: 0 }} md={{ span: 18, offset: 0 }} lg={{ span: 8, offset: 0}} xl={{ span: 8, offset: 0 }}>
                            <Image preview={false} src={imageSrc} />
                        </Col>
    
                        
                    </Fragment>
                }
    
                {width < 992 &&
    
                    <Row>
                        <Col xs={{ span: 12, offset: 10 }} sm={{ span: 12, offset: 10 }} md={{ span: 10, offset: 12 }} lg={{ span: 7, offset: 0 }} xl={{ span: 7, offset: 0 }} style={{ paddingTop: '3%', borderRight: '1px solid white', borderTop: '1px solid white' }}>
                            <Col xs={{ span: 22, offset: 0 }} sm={{ span: 22, offset: 0 }} md={{ span: 17, offset: 0 }} lg={{ span: 17, offset: 0 }} xl={{ span: 17, offset: 0 }}>
                                <h3 style={{ color: '#3FC1C9', fontSize: '1.25em', marginBottom: 0, textAlign: 'left' }} >Featured Project</h3>
                            </Col>
                            <Col xs={{ span: 22, offset: 0 }} sm={{ span: 22, offset: 0 }} md={{ span: 17, offset: 0 }} lg={{ span: 17, offset: 0 }} xl={{ span: 17, offset: 0 }}>
                                <h2 style={{ color: '#CCD6F6', fontSize: '1.5em', marginBottom: 0, textAlign: 'left' }} >{projectTitle} </h2>
                            </Col>
                        </Col>
    
                        <Col xs={{ span: 20, offset: 2 }} sm={{ span: 20, offset: 2 }} md={{ span: 18, offset: 4 }} lg={{ span: 8, offset: 6 }} xl={{ span: 8, offset: 6 }}>
                            <Image preview={false} src={imageSrc} />
                        </Col>
    
    
                        <Col xs={{ span: 20, offset: 2 }} sm={{ span: 20, offset: 2 }} md={{ span: 16, offset: 4 }} lg={{ span: 17, offset: 0 }} xl={{ span: 24, offset: 0 }} style={{ width: '100%' }}>
                            <div style={{ backgroundColor: 'rgb(0, 21, 41)', padding: '20px' }}>
                                <p className='base-text-color' style={{ fontSize: '1.25em' }}>
                                    {projectSummary}
                                </p>
                            </div>
                        </Col>
                    </Row>
                }
    
                <Col xs={{ span: 4, offset: 1 }} sm={{ span: 24, offset: 0 }} xl={{ span: 18, offset: 6 }}>
    
                </Col>
            </Fragment>
        );
    }
    
}