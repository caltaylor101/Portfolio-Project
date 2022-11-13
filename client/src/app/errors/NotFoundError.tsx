import { Button, Col, Result, Row } from 'antd';
import { useNavigate } from 'react-router-dom';
import { RouteLinks } from '../../App-Routes';




export default function NotFound() {

    const navigate = useNavigate();
    const routeLinks = new RouteLinks();

    return (
        <Row>
            <Col span={16} offset={4}>
                    <Result
                        style={{backgroundColor:' #C3C3C3', marginTop: '25px', paddingBottom: '15%'}}
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