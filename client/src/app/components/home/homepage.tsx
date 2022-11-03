import { GithubOutlined } from "@ant-design/icons";
import { Button, Col, Row } from "antd";
import Title from "antd/lib/typography/Title";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { RouteLinks } from "../../../App-Routes";



export default function HomePage() {

    const routeLinks = new RouteLinks;

    return (
        <Fragment>
            <Row style={{ paddingTop: '25px' }}>
                <Col xs={{ span: 22, offset: 1 }} sm={{ span: 24, offset: 0 }} xl={{ span: 18, offset: 6 }}>
                    <h3 style={{ color: '#3FC1C9' }}>Hi, my name is</h3>
                    <h1 style={{ color: '#CCD6F6', fontSize: '4.5em', marginBottom: 0 }} >Cody Llamas</h1>
                    <h2 style={{ color: '#8892B0', fontSize: '4.5em', lineHeight: 1.25 }} >I Engineer Solutions</h2>
                </Col>
                <Col xs={{ span: 22, offset: 1 }} xl={{ span: 6, offset: 6 }}>
                    <p className='base-text-color' style={{ fontSize: '1.5em', lineHeight: 1.25 }} >I’m a software engineer who builds web platforms to give users exceptional digital experiences.</p>
                    <p className='base-text-color' style={{ fontSize: '1.5em', lineHeight: 1.25 }}>Currently, I’m focused on building and automating enterprise solutions at <span style={{ color: '#3FC1C9' }}><strong>Cognizant</strong></span>. </p>
                </Col>
                <Col xl={{ span: 3, offset: 3}}>
                    <Link to={routeLinks.home}><GithubOutlined style={{fontSize:'4em'}} /></Link>

                </Col>
                

            </Row>

            <Row style={{ paddingTop: '25px' }}>
                
            </Row>

        </Fragment>
    )
}