import { EditOutlined, EllipsisOutlined, SettingOutlined, UploadOutlined } from "@ant-design/icons";
import { Avatar, Card, Col, Row, Image, Upload, Button } from "antd";
import Meta from "antd/lib/card/Meta";
import { observer } from "mobx-react-lite";
import { Fragment, useEffect, useState } from "react";
import { useStore } from "../../stores/store";
import PhotoWidgetDropzone from "./photo-widget-dropzone";
import './photo-widget.css';
import PhotoWidgetCropper from "./PhotoWidgetCropper";


export default observer(function PhotoUploadWidget() {

    const {profileStore: { isCurrentUser, uploadPhoto}} = useStore();
    const [files, setFiles] = useState<any>([]);
    const [cropper, setCropper] = useState<Cropper>();
    const outerDiv = {
        paddingTop: '30px',
        height: 300,
        justifyContent: 'center'
    }

    function onCrop() {
        if (cropper) {
            cropper.getCroppedCanvas().toBlob(blob => uploadPhoto(blob!));
        }
    }


    useEffect(() => {
        return () => {
            files.forEach((file: any) => URL.revokeObjectURL(file.preview));
        }
    }, [files])

    return (

        <Fragment>
            <Row style={{ paddingBottom: '25px' }}>
                <Col span={5} offset={4}>
                    <Card
                        style={{
                            width: '100%',
                        }}
                        cover={
                            <div style={{ ...outerDiv }} >
                                <PhotoWidgetDropzone setFiles={setFiles} />
                            </div>
                        }
                        actions={[
                            <Button size='large' disabled style={{width: '66%'}}><UploadOutlined></UploadOutlined></Button>
                        ]}
                    >
                        <Meta
                            title="Upload An Image"
                            style={{ justifyContent: 'center' }}
                        />
                    </Card>
                </Col>

                <Col span={5}>
                    <Card
                        style={{
                            width: '100%',
                        }}
                        cover={
                            <Fragment>
                                <div style={{ ...outerDiv }} >
                                    {files && files.length > 0 && (
                                        // <Image height={235} width='auto' src={files[0].preview} preview={false}/>
                                        <PhotoWidgetCropper setCropper={setCropper} imagePreview={files[0].preview} />
                                    )}
                                </div>
                            </Fragment>
                        }
                        actions={[
                            <Button size='large' disabled style={{width: '66%'}} ><EditOutlined key="edit" /></Button>
                        ]}
                    >
                        <Meta
                            title="Resize The Image"
                            style={{ justifyContent: 'center' }}

                        />
                    </Card>
                </Col>

                <Col span={5}>
                    <Card
                        style={{
                            width: '100%',
                        }}
                        cover={
                            <div style={{ ...outerDiv }} >

                                {/* <Image className='img-preview' height={235} width='auto' preview={false}/> */}
                                {/* <div className='img-preview' style={{height: 235, width: 'auto', maxWidth: '80%', margin: '0 auto'}}></div> */}
                                <div className='img-preview' style={{ minHeight: 200, overflow: 'hidden', margin: '0 auto' }}></div>

                                {/* <div className='img-preview' /> */}
                            </div>
                        }
                        actions={[
                    <Button icon={<UploadOutlined />} type='primary' className='success-btn' onClick={onCrop} size='large' style={{width: '100%'}}>Upload</Button>,
                    <Button icon={<UploadOutlined />} onClick={onCrop} size='large' style={{width: '100%'}}>Click to Upload</Button>
                        ]}
                    >
                        <Meta
                            title="Image Preview"
                            style={{justifyContent: 'center'}}
                        />
                    </Card>
                </Col>
            </Row>

            
        </Fragment>
    )
})