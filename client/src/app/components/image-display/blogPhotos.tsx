import { observer } from "mobx-react-lite";
import { Fragment, useEffect } from "react";
import { useStore } from "../../stores/store";
import { Card, Col, Image, Row } from 'antd';
import './blogPhotos.css';
import { Photo } from "../../models/photo";

interface Props {
    photos: Photo[];
}


export default observer(function BlogPhotos() {
    
    const {userStore, profileStore} = useStore();

    useEffect(() => {
        if (userStore.user !== null)
        {
            profileStore.loadProfile(userStore.user.username);
        }
    }, [])

    return (
        <Fragment>
                    <Row style={{paddingBottom:'25px', overflowX: 'hidden', maxHeight: 350}} >

            {profileStore.blogPhotos?.map((image, i) => (
                        <Col span={4} offset={(i%4 === 0) ? 4 : 0} style={{paddingTop:'25px', minHeight:300}}>
                            <Card  cover={<Image src={`${image.url}`} style={{ maxHeight: 300, maxWidth:'100%', width:'auto', paddingTop: '20%'}} />} style={{ width:'100%', height:'100%', justifyContent:'center'  }}>
                                <Card.Meta title={`Use: <image_${i}>`} style={{justifyContent: 'center', borderTop:'3px solid blue' }} />
                            </Card>
                        </Col>
            ))}
                    </Row>
        </Fragment>
    )

})