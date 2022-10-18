import { Col, Row } from "antd";
import { Fragment, useEffect } from "react";
import { v4 as uuid } from 'uuid';
import { useNavigate } from "react-router-dom";
import { useStore } from "../../stores/store";
import { observer } from "mobx-react-lite";
import { Formik, Form } from "formik";
import * as Yup from 'yup';
import TextInput from "../form-components/TextInput";
import TextArea from "../form-components/TextArea";
import Submit from "../form-components/Submit";
import SelectInput from "../form-components/SelectInput";
import { Blog } from "../../models/blog";



function BlogForm() {
    const navigate = useNavigate();

    const validationSchema = Yup.object({
        title: Yup.string().required(),
        description: Yup.string().required(),
        category: Yup.string().required(),
        body: Yup.string().required(),
    })

    var date = new Date();

    const initialState = {
        id: '',
        date: date,
        title: '',
        description: '',
        category: '',
        body: '',
        urlSuffix: '',
    }

    const options = [
        { label: 'Game-Dev', value: 'Game-Dev' },
        { label: 'React', value: 'React' }
    ]

    const { blogStore } = useStore();

    useEffect(() => {
        blogStore.selectedBlog = initialState;
    }, []);

    function handleFormSubmit(blog: Blog) {
        blog.id = uuid();
        blogStore.createBlog(blog).then(() => {
            blogStore.getBlogById(blog.urlSuffix, blog.id).then(() => {
                navigate(`/read-blog/${blogStore.selectedBlog?.urlSuffix}`);
            });
        });
    }
    return (
        <Fragment>
            <Col offset={4} span={14} style={{ borderBottom: "2px solid white", marginTop: "50px" }}>
                <h1 className="base-text-color">&nbsp;&nbsp;&nbsp;&nbsp;Post New Blog</h1>
            </Col>
            <Row>
                <Col span={16} offset={4}>
                    <Formik validationSchema={validationSchema} initialValues={initialState} onSubmit={(values) => handleFormSubmit(values)}>
                        {({ handleSubmit, isValid, isSubmitting, dirty }: any) => (
                            <Form
                                className="ant-form ant-form-horizontal ant-form-default"
                                style={{ paddingBottom: "250px", marginTop: "20px" }}
                                onSubmit={handleSubmit}
                            >
                                <TextInput label='Title:' name='title' placeholder='Title' />
                                <TextArea label='Description:' rows={4} name='description' placeholder='Description' />
                                <SelectInput placeholder="Category" name='category' label='Category:' options={options}  />
                                <TextArea label='Body' rows={15} name='body' placeholder='Body' />
                                <Submit dirty={dirty} isValid={isValid} isSubmitting={isSubmitting} handleSubmit={handleSubmit} />
                            </Form>
                        )}
                    </Formik>
                </Col>
            </Row>
        </Fragment>
    );
}

export default observer(BlogForm);