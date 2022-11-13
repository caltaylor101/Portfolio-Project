import { Col } from "antd";
import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Blog as BlogModel } from "../../models/blog";
import { useStore } from "../../stores/store";
import * as Yup from 'yup';
import TextInput from "../form-components/TextInput";
import SelectInput from "../form-components/SelectInput";
import Submit from "../form-components/Submit";
import TextArea from "../form-components/TextArea";

interface Props {
    blog: BlogModel
}

function BlogEditForm() {
    const navigate = useNavigate();
    const { blogStore } = useStore();
    const { selectedBlog } = blogStore;

    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

    const initialState = selectedBlog ?? {
        title: '',
        description: '',
        category: '',
        body: '',
        urlSuffix: ''
    }

    const [currentBlog, setBlog] = useState<BlogModel>(initialState as BlogModel);

    function handleFormSubmit(blog: BlogModel) {
        blogStore.updateBlog(blog);
        blogStore.selectedBlog = blog;
        navigate(`/read-blog/${currentBlog.urlSuffix}`);
    }

    const validationSchema = Yup.object({
        title: Yup.string().required(),
        description: Yup.string().required(),
        category: Yup.string().required(),
        body: Yup.string().required(),
    })

    const options = [
        { label: 'Game-Dev', value: 'Game-Dev' },
        { label: 'React', value: 'React' }
    ]

    return (
        <Fragment>
            <Col md={{span: 16, offset: 4}} offset={3} span={14} style={{ borderBottom: "2px solid white", marginTop: "50px" }}>
                <h1 className="base-text-color">&nbsp;&nbsp;&nbsp;&nbsp;Edit Your Blog</h1>
            </Col>
            <Col xs={{ span: 22, offset: 0 }}>
                <Formik validationSchema={validationSchema} initialValues={currentBlog} onSubmit={(values) => handleFormSubmit(values)}>
                    {({ handleSubmit, isValid, isSubmitting, dirty }: any) => (
                        <Form
                            className="ant-form ant-form-horizontal ant-form-default"
                            style={{ paddingBottom: "250px", marginTop: "20px" }}
                        >
                            <TextInput label='Title:' name='title' placeholder='Title' />
                            <TextArea label='Description:' rows={4} name='description' placeholder='Description' />
                            <SelectInput placeholder="Category" name='category' label='Category:' options={options} />
                            <TextArea label='Body' rows={15} name='body' placeholder='Body' />
                            <Submit dirty={dirty} isValid={isValid} isSubmitting={isSubmitting} handleSubmit={handleSubmit} />
                        </Form>
                    )}
                </Formik>
            </Col>

        </Fragment>
    );
}

export default observer(BlogEditForm);