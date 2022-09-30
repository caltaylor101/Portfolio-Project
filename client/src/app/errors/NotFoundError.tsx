import { FileSearchOutlined } from '@ant-design/icons';
import { Button, Col, Result, Row, Typography } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import Title from 'antd/lib/typography/Title';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RouteLinks } from '../../App-Routes';




export default function NotFound() {

    const navigate = useNavigate();
    const routeLinks = new RouteLinks();

    return (
        <Row>
            <Col span={16} offset={4}>
                    <Result
                        style={{backgroundColor:' #D3D3D3'}}
                        className='base-text-color'
                        status="404"
                        title="404"
                        subTitle="Sorry, the page you visited does not exist."
                        extra={<Button onClick={() => navigate(routeLinks.home)} type="primary">Back Home</Button>}
                    />
            </Col>

        </Row>

    )
}