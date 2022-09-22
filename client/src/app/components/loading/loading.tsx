import { Alert, Button, Col, Skeleton, Space, Spin } from 'antd';

interface Props {
    content: string;
}

export default function LoadingComponent({content = 'Loading...' }: Props) {
    return (
        <div className='load-container'>

            <Spin spinning={true} size='large' style={{ justifySelf: 'center', display: 'block' }}>
                <Alert
                    message=" "
                    description={content}
                    type="info"
                    closable
                    style={{ textAlign: 'center', height: '70px' }}
                />

            </Spin>

            <Col offset={4} span={12} style={{marginTop: '25px'}}>
                <Skeleton active />
                <Skeleton active />
                <Skeleton active />
                <Skeleton active />
            </Col>


        </div >

    )
}