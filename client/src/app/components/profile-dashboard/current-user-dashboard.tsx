import { UserOutlined } from "@ant-design/icons";
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
    const { userStore, profileStore } = useStore();
    if (userStore.bio === null) 
    {
        userStore.getBio();
    }
    function onCrop(cropper: any, file: Blob) {
        if (cropper) {
            //second parameter isProfilePicture.
            cropper.getCroppedCanvas().toBlob((file: Blob) => profileStore.uploadPhoto(file, true));
        }
    }
    return (
        <Fragment>
            <PageHeader
                className="site-page-header-responsive base-text-color"
                onBack={() => window.history.back()}
                title="Back"
                // extra={[
                //     <Button key="3">Operation</Button>,
                //     <Button key="2">Operation</Button>,
                //     <Button key="1" type="primary">
                //         Primary
                //     </Button>,
                // ]}
            >
                <Row>
                    <Col xs={{span:24}} sm={{span: 24}} lg={{span: 4, offset: 3}} style={{backgroundColor:'#333333', padding: '10px'}}>
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
                                    size={{ xs: 100, sm: 100, md: 100, lg: 100, xl: 100, xxl: 100 }}
                                    icon={userStore.user?.image !== null ? <Image
                                        preview={false}
                                        src={userStore.user?.image}
                                    />
                                    : <UserOutlined style={{fontSize: '1.5em'}} />
                                }
                                />
                                <Title level={3} className='base-text-color' style={{paddingLeft:'20px'}}>{userStore.user?.displayName}</Title>
                                
                            </div>
                        </Content>
                    </Col>
                    <Col xs={{span:24, offset: 0}} sm={{span:24, offset: 0}} lg={{span:12, offset: 1}} style={{backgroundColor:'#333333', padding: '10px'}}>
                        <Title className='base-text-color' level={2}>Bio: </Title>
                        <Paragraph className="base-text-color" style={{fontSize: '1.33em'}}>{userStore.bio}</Paragraph>
                    </Col>
                </Row>
                <Row style={{marginTop:'10px'}}>
                    <Col xs={{span:24, offset: 0}} lg={{span:4, offset: 3}}>
                            <Button type='primary' className='success-btn' style={{width:'100%'}}>Edit Profile</Button>
                    </Col>
                </Row>

                <Row style={{marginTop:'20px'}}>
                    <Col xs={{span:24, offset: 0}} lg={{span:4, offset: 3}} style={{ backgroundColor: '#333333', padding: '10px' }}>
                        {/* <Title className='base-text-color'>Next features</Title> */}
                    </Col>
                    <Col xs={{span:24, offset: 0}} lg={{span:17, offset: 0}}>
                        <PhotoUploadWidget isProfilePicture={true} onCrop={onCrop} />
                        <BlogList isUserDashboard={true} />
                    </Col>
                </Row>
            </PageHeader>
        </Fragment>
    )
})

