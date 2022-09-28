import { Button, Col, Form, Input, Row } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { ChangeEvent, Fragment, useState } from "react";
import { Blog as BlogModel} from "../../models/blog";
import {v4 as uuid} from 'uuid';
import agent from "../../api/agent";


interface Props
{
    blog: BlogModel
}

function BlogForm() {
    const [componentSize, setComponentSize] = useState<any>('default');
    const onFormLayoutChange = ({ size }: any) => {
        setComponentSize(size);
    };

    var date = new Date();

    const initialState = {
        id: '',
        date: date.toJSON(),
        title: '',
        description: '',
        category: '',
        body: '',
        urlSuffix: '',
    }

    const [currentBlog, setBlog] = useState(initialState);
    const [submitting, setSubmitting] = useState(false);

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const {name, value} = event.target;
        setBlog({...currentBlog, [name]: value})
    }

    function handleTextAreaChange(event: ChangeEvent<HTMLTextAreaElement>) {
        const {name, value} = event.target;
        setBlog({...currentBlog, [name]: value})
    }


    function handleSubmit() {
        setSubmitting(true);
        currentBlog.id = uuid();
        agent.Blogs.create(currentBlog).then(() => {
            setSubmitting(false);
        })
    }

    return (
        <Fragment>
            <Col offset={4} span={14} style={{ borderBottom: "2px solid white", marginTop: "50px" }}>
                <h1 className="base-text-color">&nbsp;&nbsp;&nbsp;&nbsp;Post New Blog</h1>
            </Col>

            <Form 
            style={{ paddingBottom: "250px" }}
            labelCol={{
                span: 4,
            }}
            wrapperCol={{
                span: 24,
            }}
            layout="horizontal"
            initialValues={{
                size: componentSize,
            }}
            onValuesChange={onFormLayoutChange}
            size={componentSize}
            >
                <Form.Item style={{ marginTop: "50px" }}>
                    <Row>
                        <Col offset={3} span={1}>
                            <label style={{ color: "white" }}>Title: </label>
                        </Col>
                        <Col offset={1} span={12}>
                            <Input placeholder="Title" name='title' value={currentBlog.title} onChange={handleInputChange} />
                            </Col>
                    </Row>
                </Form.Item>

                <Form.Item initialValue={"Description"}>
                    <Row>
                        <Col offset={3} span={1}>
                            <label className="base-text-color">Description: </label>
                        </Col>
                        <Col offset={1} span={12}>
                            <TextArea rows={4} placeholder="Description" name='description' value={currentBlog.description} onChange={handleTextAreaChange} />
                        </Col>
                    </Row>
                </Form.Item>

                <Form.Item initialValue="Category">
                    <Row>
                        <Col offset={3} span={1}>
                            <label style={{ color: "white" }}>Category: </label>
                        </Col>
                        <Col offset={1} span={12}>
                            <Input placeholder="Category" name='category' value={currentBlog.category} onChange={handleInputChange} />
                            </Col>
                    </Row>
                </Form.Item>

                <Form.Item initialValue={"Body"}>
                    <Row>
                        <Col offset={3} span={1}>
                            <label className="base-text-color">Body: </label>
                        </Col>
                        <Col offset={1} span={12}>
                            <TextArea rows={12} placeholder="Body" name='body' value={currentBlog.body} onChange={handleTextAreaChange} />
                        </Col>
                    </Row>
                </Form.Item>

                <Row style={{ paddingTop: "50px" }}>
                    <Col offset={5} span={1}>
                        <Button type="primary" size="large" onClick={handleSubmit} htmlType='submit'>Submit</Button>
                    </Col>

                    
                    <Col span={1} style={{marginLeft:"15px"}}>
                        <Button type="primary" danger={true} size="large">Cancel</Button>
                    </Col>
                </Row>
            </Form>

        </Fragment>
    );
}

export default BlogForm;