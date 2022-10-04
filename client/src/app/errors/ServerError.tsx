import { Button, Col, Result, Row, Typography } from "antd";
import { Content, Header } from "antd/lib/layout/layout";
import { observer } from "mobx-react-lite";
import { Fragment } from "react";
import { useStore } from "../stores/store";


export default observer(function ServerError() {
    const { commonStore } = useStore();
    const { Paragraph } = Typography;

    return (
        <Content>
            <Row>
                <Col span={16} offset={4}>
                    <Result
                        style={{ backgroundColor: ' #C3C3C3', marginTop: '25px', paddingBottom: '15%' }}

                        status="500"
                        title="500"
                        subTitle={
                        <Fragment>
                        <Typography><h5 style={{ color: 'red' }}>{commonStore.error?.message}</h5></Typography>
                        <Paragraph>{commonStore.error?.details &&
                            <Fragment>
                                <Header style={{backgroundColor:'rosybrown'}}><h4 >Stack Trace</h4></Header>
                                <Paragraph style={{textAlign: 'left'}}>{commonStore.error.details}</Paragraph>
                            </Fragment>
                            }</Paragraph>
                            </Fragment>
                            }
                        extra={<Button type="primary">Back Home</Button>}
                    />
                </Col>

            </Row>


            
            
        </Content>
    )
})