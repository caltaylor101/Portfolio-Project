import { EditOutlined, EllipsisOutlined, SettingOutlined, UploadOutlined } from "@ant-design/icons";
import { Avatar, Card, Col, Row, Image, Upload, Button, Tabs } from "antd";
import Meta from "antd/lib/card/Meta";
import { observer } from "mobx-react-lite";
import { Fragment, useEffect, useState } from "react";
import { useStore } from "../../stores/store";
import BlogPhotos from "../image-display/blogPhotos";
import PhotoWidgetDropzone from "./photo-widget-dropzone";
import './photo-widget.css';
import PhotoWidgetCropper from "./PhotoWidgetCropper";

//use the upload function the axios.
interface Props {
    onCrop: (cropper: any, file: Blob) => void;
}


export default observer(function PhotoUploadWidget({ onCrop }: Props) {

    const { profileStore: { isCurrentUser, uploadPhoto } } = useStore();
    const [files, setFiles] = useState<any>([]);
    const [tabKey, setTabKey] = useState<string>('1');
    const [cropper, setCropper] = useState<Cropper | undefined>();
    const outerDiv = {
        paddingTop: '30px',
        height: 200,
        justifyContent: 'center'
    }

    function onCropBlog() {
        cropper?.getCroppedCanvas().toBlob(blob => onCrop(cropper, blob!));
        files.length = 0;
        document.getElementsByClassName('img-preview')[0].childNodes[0].remove();
        setTabKey('1');
    }


    useEffect(() => {
        return () => {
            files.forEach((file: any) => URL.revokeObjectURL(file.preview));
        }
    }, [files])

    return (

        <Fragment>
            <Tabs style={{borderBottom: '5px solid white', paddingBottom:'10px'}} type='card' defaultActiveKey="1" activeKey={tabKey}  centered onTabClick={(e) => {setTabKey(e); return (files[0].preview)}}>
                <Tabs.TabPane tab="Tab 1" key="1" >
                        <BlogPhotos />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Tab 2" key="2">
                <Row style={{ paddingBottom: '25px'}}>
                        <Col span={6} offset={3}>
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
                                    <Button size='large' disabled style={{ width: '66%' }}><UploadOutlined></UploadOutlined></Button>
                                ]}
                            >
                                <Meta
                                    title="Upload An Image"
                                    style={{ justifyContent: 'center' }}
                                />
                            </Card>
                        </Col>

                        <Col span={6}>
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
                                    <Button size='large' disabled style={{ width: '66%' }} ><EditOutlined key="edit" /></Button>
                                ]}
                            >
                                <Meta
                                    title="Resize The Image"
                                    style={{ justifyContent: 'center' }}

                                />
                            </Card>
                        </Col>

                        <Col span={6}>
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
                                    <Button icon={<UploadOutlined />} type='primary' className='success-btn' onClick={() => onCropBlog()} size='large' style={{ width: '100%' }}>Upload</Button>,
                                    // <Button icon={<UploadOutlined />} onClick={() => onCropBlog} size='large' style={{ width: '100%' }}>Click to Upload</Button>
                                ]}
                            >
                                <Meta
                                    title="Image Preview"
                                    style={{ justifyContent: 'center' }}
                                />
                            </Card>
                        </Col>
                    </Row>
                </Tabs.TabPane>
                <Tabs.TabPane tab="Tab 3" key="3">
                    Content of Tab Pane 3
                </Tabs.TabPane>
            </Tabs>



        </Fragment>
    )
})