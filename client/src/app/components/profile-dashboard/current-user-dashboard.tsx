import { PageHeader, Button, Avatar, Image, Row, Col, Typography } from "antd";
import { Content } from "antd/lib/layout/layout";
import { observer } from "mobx-react-lite";
import { Fragment } from "react";
import { useStore } from "../../stores/store";
import BlogList from "../blog-list/blog-list";
import PhotoUploadWidget from "../image-upload/photo-upload-widget";
import "./current-user-dashboard.css";

export default observer(function MyProfile() {
    const { Title, Paragraph } = Typography;
    const { userStore } = useStore();
    if (userStore.bio === null) 
    {
        userStore.getBio();
    }
    return (
        <Fragment>
            <PageHeader
                className="site-page-header-responsive base-text-color"
                onBack={() => window.history.back()}
                title="Title"
                subTitle="This is a subtitle"
                // extra={[
                //     <Button key="3">Operation</Button>,
                //     <Button key="2">Operation</Button>,
                //     <Button key="1" type="primary">
                //         Primary
                //     </Button>,
                // ]}
            >
                <Row>
                    <Col offset={3} span={4} style={{backgroundColor:'#333333', padding: '10px'}}>
                        <div className="logo" />
                        <Content>
                            <div
                                style={{
                                    display: 'flex',
                                    width: 'max-content',
                                    justifyContent: 'flex-end',
                                }}
                            >
                                <Avatar
                                    style={{ border: '5px solid white' }}
                                    size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                                    icon={<Image
                                        preview={false}
                                        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                                    />}
                                />
                                <Title level={3} className='base-text-color' style={{paddingLeft:'20px'}}>{userStore.user?.displayName}</Title>
                                
                            </div>
                        </Content>
                    </Col>
                    <Col offset={1} span={12} style={{backgroundColor:'#333333', padding: '10px'}}>
                        <Title className='base-text-color' level={2}>Bio: </Title>
                        <Paragraph className="base-text-color" style={{fontSize: '1.33em'}}>{userStore.bio}</Paragraph>
                    </Col>
                </Row>
                <Row style={{marginTop:'10px'}}>
                    <Col offset={3} span={4}>
                            <Button type='primary' className='success-btn' style={{width:'100%'}}>Edit Profile</Button>
                    </Col>
                </Row>

                <Row style={{marginTop:'20px'}}>
                    <Col offset={3} span={4} style={{ backgroundColor: '#333333', padding: '10px' }}>
                        <Title className='base-text-color'>Next Row</Title>
                    </Col>
                    <Col offset={0} span={17}>
                        <PhotoUploadWidget onCrop={function (cropper: any, file: Blob): void {
                            throw new Error("Function not implemented.");
                        } } />
                        <BlogList isUserDashboard={true} />
                    </Col>
                </Row>
            </PageHeader>
        </Fragment>
    )
})

