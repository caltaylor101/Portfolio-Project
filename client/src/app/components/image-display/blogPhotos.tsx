import { observer } from "mobx-react-lite";
import { Fragment, useEffect } from "react";
import { useStore } from "../../stores/store";
import { Button, Card, Col, Image, Row, Skeleton, Space, Tooltip } from 'antd';
import './blogPhotos.css';
import { Photo } from "../../models/photo";
import { InfoCircleOutlined } from "@ant-design/icons";

interface Props {
    photos: Photo[];
    isProfilePicture: boolean;
}


export default observer(function BlogPhotos({isProfilePicture}: Props) {
    
    const {userStore, profileStore} = useStore();

    useEffect(() => {
        if (userStore.user !== null)
        {
            profileStore.loadProfile(userStore.user.username);
            profileStore.loadPhotos(isProfilePicture);
        }
    }, [])

    useEffect(() => {

    }, [profileStore.uploading])

    return (
        <Fragment>
            <Row style={{ paddingBottom: '25px', overflowX: 'hidden', maxHeight: 400 }} >

                {profileStore.loadingPhotos
                    ?
                    <>
                        <Col span={4} offset={4} style={{ paddingTop: '10px', minHeight: 350 }}>
                            <Card style={{ width: '100%' }} cover={<Skeleton.Image active={true} style={{ height: 300, width: '100%', paddingTop: '20%' }} />} >

                            </Card>
                        </Col>
                        <Col span={4} style={{ paddingTop: '10px', minHeight: 350 }}>
                            <Card style={{ width: '100%' }} cover={<Skeleton.Image active={true} style={{ height: 300, width: '100%', paddingTop: '20%' }} />} >

                            </Card>
                        </Col>
                        <Col span={4} style={{ paddingTop: '10px', minHeight: 350 }}>
                            <Card style={{ width: '100%' }} cover={<Skeleton.Image active={true} style={{ height: 300, width: '100%', paddingTop: '20%' }} />} >

                            </Card>
                        </Col>
                        <Col span={4} style={{ paddingTop: '10px', minHeight: 350 }}>
                            <Card style={{ width: '100%' }} cover={<Skeleton.Image active={true} style={{ height: 300, width: '100%', paddingTop: '20%' }} />} >

                            </Card>
                        </Col>
                    </>
                    :
                    <>
                    {profileStore.blogPhotos?.map((image, i) => (
                        <Col span={4} offset={(i%4 === 0) ? 4 : 0} style={{paddingTop:'10px', minHeight:350}}>
                            {/* Made as a string otherwise it doesn't calculate the boolean correctly */}
                            {image.isMainProfilePicture.toString() === 'True' ? 
                            <Card  cover={<Image src={`${image.url}`} style={{ maxHeight: 300, maxWidth:'100%', width:'auto', paddingTop: '20%'}} />} style={{ width:'100%', height:'100%', justifyContent:'center', border:'5px solid #32CD32'  }}>
                            {!isProfilePicture ?
                            <Card.Meta title={<Fragment> {`Use: <image_${i}>`} <Tooltip placement="bottomLeft" title={`Use <image_${i}> in your body text to place the image on a new line in the middle of your text.`}><InfoCircleOutlined style={{color:'orange'}} /></Tooltip></Fragment>} style={{justifyContent: 'center', borderTop:'3px solid blue' }} />
                            : <Card.Meta title={<Fragment><Space><Button type='primary' className='success-btn' style={{color:'white'}}>Main</Button><Button style={{}} type='primary' danger>Delete</Button></Space></Fragment>} />
                            }
                            </Card>
                            :
                            <Card  cover={<Image src={`${image.url}`} style={{ maxHeight: 300, maxWidth:'100%', width:'auto', paddingTop: '20%'}} />} style={{ width:'100%', height:'100%', justifyContent:'center'  }}>
                                {!isProfilePicture ?
                                        <Card.Meta
                                            title={
                                                <Fragment> {`Use: <image_${i}>`}
                                                    <Tooltip placement="bottomLeft" title={`Use <image_${i}> in your body text to place the image on a new line in the middle of your text.`}>
                                                        <InfoCircleOutlined style={{ color: 'orange' }} />
                                                    </Tooltip>
                                                    <br />
                                                    <Button style={{display: 'flex', margin: '0 auto'}} danger >Delete</Button>
                                                </Fragment>}
                                            style={{ justifyContent: 'center', borderTop: '3px solid blue' }} />

                                : <Card.Meta style={{justifyContent:'center'}} title={<Fragment><Space><Button type='primary' className='success-btn' style={{color:'white'}}>Main</Button><Button style={{}} type='primary' danger>Delete</Button></Space></Fragment>} />
                                }
                            </Card>
                        }
                            
                        </Col>
                        
            ))}
                    {profileStore.uploading && profileStore.blogPhotos!.length % 4 === 0 
                    && <Col span={4} offset={4} style={{ paddingTop: '10px', minHeight: 350 }}>
                            <Card style={{ width: '100%' }} cover={<Skeleton.Image active={true} style={{ height: 300, width: '100%', paddingTop: '20%' }} />} >

                            </Card>
                        </Col>
                    }
                    {profileStore.uploading && profileStore.blogPhotos!.length % 4 !== 0 &&
                    <Col span={4} style={{ paddingTop: '10px', minHeight: 350 }}>
                    <Card style={{ width: '100%' }} cover={<Skeleton.Image active={true} style={{ height: 300, width: '100%', paddingTop: '20%' }} />} >

                    </Card>
                </Col>
                    }
                        </>
        }

            
                    </Row>
        </Fragment>
    )

})