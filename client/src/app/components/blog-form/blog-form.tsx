import { Alert, Button, Col, Row } from "antd";
import { ChangeEvent, Fragment, useState } from "react";
import { v4 as uuid } from 'uuid';
import { useNavigate } from "react-router-dom";
import { useStore } from "../../stores/store";
import { observer } from "mobx-react-lite";
import { Formik, Form, Field, ErrorMessage } from "formik";
import TextArea from "antd/lib/input/TextArea";
import * as Yup from 'yup';
import { CloseCircleOutlined } from "@ant-design/icons";



function BlogForm() {
    
    const [componentSize, setComponentSize] = useState<any>('default');
    const onFormLayoutChange = ({ size }: any) => {
        setComponentSize(size);
    };

    const validationSchema = Yup.object({
        title: Yup.string().required('The blog title is required')
    })

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

    const [submitting, setSubmitting] = useState(false);
    const { blogStore } = useStore();
    const [blog, setBlog] = useState(initialState);


    function handleTextAreaChange(event: ChangeEvent<HTMLTextAreaElement>) {
        const { name, value } = event.target;
        setBlog({ ...blog, [name]: value })
    }

    const navigate = useNavigate();


    function handleSubmit() {
        console.log(blog);
        setSubmitting(true);
        blog.id = uuid();
        blogStore.createBlog(blog).then(() => {
            blogStore.getBlogById(blog.urlSuffix, blog.id).then(() => {
                navigate(`/read-blog/${blogStore.selectedBlog?.urlSuffix}`);
                setSubmitting(false);
            });
        });


        // agent.Blogs.create(currentBlog).then(() => {
        //     blogStore.getBlogById(currentBlog.urlSuffix, currentBlog.id).then(() => {
        //         navigate(`/read-blog/${blogStore.selectedBlog?.urlSuffix}`);
        //         setSubmitting(false);
        // });
        // });

    }
    {/* <form class="ant-form ant-form-horizontal ant-form-default */ }
    return (
        <Fragment>
            <Col offset={4} span={14} style={{ borderBottom: "2px solid white", marginTop: "50px" }}>
                <h1 className="base-text-color">&nbsp;&nbsp;&nbsp;&nbsp;Post New Blog</h1>
            </Col>
            <Row>
                <Col span={16} offset={4}>
                    <Formik validationSchema={validationSchema} initialValues={blog} onSubmit={(values: any) => console.log(values)}>
                        {({ handleSubmit }: any) => (
                            <Form
                                className="ant-form ant-form-horizontal ant-form-default"
                                style={{ paddingBottom: "250px" }}
                            >
                                <Row>
                                    <Col offset={3} span={1}>
                                        <label style={{ color: "white" }}>Title: </label>
                                    </Col>
                                    <Col offset={1} span={12}>
                                        <Field className='ant-input' placeholder="Title" name='title' />
                                        <ErrorMessage name='title' render={error =>
                                            <Fragment>
                                                <Alert message="Blog title required." type="error" showIcon />
                                            </Fragment>
                                        } />
                                    </Col>
                                </Row>

                                <Row>
                                    <Col offset={3} span={1}>
                                        <label className="base-text-color">Description: </label>
                                    </Col>
                                    <Col offset={1} span={12}>
                                        <Field className='ant-input' rows={4} placeholder="Description" name='description' />
                                    </Col>
                                </Row>

                                <Row>
                                    <Col offset={3} span={1}>
                                        <label style={{ color: "white" }}>Category: </label>
                                    </Col>
                                    <Col offset={1} span={12}>
                                        <Field className='ant-input' placeholder="Category" name='category' />
                                    </Col>
                                </Row>

                                <Row>
                                    <Col offset={3} span={1}>
                                        <label className="base-text-color">Body: </label>
                                    </Col>
                                    <Col offset={1} span={12}>
                                        <Field className='ant-input' rows={12} placeholder="Body" name='body' />
                                    </Col>
                                </Row>

                                <Row style={{ paddingTop: "50px" }}>
                                    <Col offset={5} span={1}>
                                        <Button type="primary" size="large" loading={submitting} onClick={() => handleSubmit} htmlType='submit' >Submit</Button>
                                    </Col>


                                    <Col span={1} style={{ marginLeft: "35px" }}>
                                        <Button type="primary" danger={true} size="large">Cancel</Button>
                                    </Col>
                                </Row>
                            </Form>
                        )}
                    </Formik>
                </Col>
            </Row>
        </Fragment>
    );
}

export default observer(BlogForm);