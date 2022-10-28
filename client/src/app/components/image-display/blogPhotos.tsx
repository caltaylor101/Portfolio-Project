import { observer } from "mobx-react-lite";
import { Fragment, useEffect } from "react";
import { useStore } from "../../stores/store";
import { Card, Col, Image, Row } from 'antd';
import './blogPhotos.css';



export default observer(function BlogPhotos() {
    
    const {userStore, profileStore} = useStore();

    useEffect(() => {
        if (userStore.user !== null)
        {
            profileStore.loadProfile(userStore.user.username).then(() => console.log(profileStore.profile));
        }
    }, [])

    return (
        <Fragment>
                    <Row>

            {profileStore.blogPhotos?.map((image, i) => (
                        <Col span={4} offset={(i === 0 || i/4 === 1) ? 4 : 0} style={{paddingTop:'25px'}}>
                            <Card cover={<Image src={`${image.url}`} />} style={{height:'100%'}}>
                                <Card.Meta title={`Use: <image_${i}>`} />
                            </Card>
                        </Col>
            ))}
                    </Row>

            <h1 className='base-text-color'>{profileStore.profile?.username}</h1>
        </Fragment>
    )

})