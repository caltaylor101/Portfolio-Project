import { CloseCircleOutlined } from "@ant-design/icons";
import { message, Result, Button, Typography, Row, Col } from "antd";
import { Fragment } from "react";
import './ValidationErrors.css';


interface Props {
    errors: string[];
}

export default function ValidationErrors({ errors }: Props) {
    const { Paragraph, Text } = Typography


    const error = () => {
        message.error('This is an error message');
    };
    return (
        <Fragment>
            <Row>
                <Col span={16} offset={4}>
                    <Result
                        style={{ backgroundColor: ' #D3D3D3', marginTop: '25px' }}
                        status="error"
                        title="Submission Failed"
                        subTitle={errors && (
                            <Row style={{ marginTop: '10px', borderTop: '1px dashed', borderBottom: '1px dashed' }}>
                                {errors.map((err: any, index) => (
                                    <Fragment key={index}>

                                        <Col span={1} style={{ padding: '10px' }}>
                                            <Text
                                                strong
                                                style={{
                                                    fontSize: 16,
                                                    textAlign: 'left'
                                                }}
                                            >
                                                <CloseCircleOutlined className="site-result-demo-error-icon" style={{ marginTop: '3px' }} />
                                            </Text>
                                        </Col>
                                        <Col span={23} style={{ textAlign: 'left', padding: '10px', paddingLeft: '0' }}>
                                            <Text
                                                strong
                                                style={{
                                                    fontSize: 16,
                                                }}
                                            >
                                                &nbsp; {err}
                                            </Text>
                                        </Col>
                                    </Fragment>
                                ))}
                            </Row>

                        )
                        }
                    >
                    </Result>
                </Col>

            </Row>


        </Fragment>
    )
}