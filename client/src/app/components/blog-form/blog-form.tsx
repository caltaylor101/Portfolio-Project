import { Button, Col, Form, Input, Row } from "antd";
import FormList from "antd/lib/form/FormList";
import TextArea from "antd/lib/input/TextArea";
import { Footer } from "antd/lib/layout/layout";
import { ChangeEvent, Fragment, useState } from "react";
import { Blog as BlogModel} from "../../models/blog";
import BlogList from "../blog-list/blog-list";

interface Props
{
    blog: BlogModel
}

function BlogForm() {
    const [componentSize, setComponentSize] = useState<any>('default');
    const onFormLayoutChange = ({ size }: any) => {
        setComponentSize(size);
    };

    const initialState = {
        title: '',
        description: '',
        category: '',
        body: ''
    }

    const [currentBlog, setBlog] = useState(initialState);

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const {name, value} = event.target;
        setBlog({...currentBlog, [name]: value})
    }

    function handleTextAreaChange(event: ChangeEvent<HTMLTextAreaElement>) {
        const {name, value} = event.target;
        setBlog({...currentBlog, [name]: value})
    }


    function handleSubmit() {
        console.log(currentBlog);
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
                        <Button type="primary" size="large" onClick={handleSubmit}>Submit</Button>
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