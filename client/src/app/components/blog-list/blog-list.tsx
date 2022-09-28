import { Col, Card, Button, Spin } from "antd";
import { observer } from "mobx-react-lite";
import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import agent from "../../api/agent";
import { Blog, Blog as BlogModel } from '../../models/blog';
import { useStore } from "../../stores/store";
import LoadingComponent from "../loading/loading";
import './blog-list.css'



function BlogList(){

    const [submitting, setSubmitting] = useState(false);
    const [target, setTarget] = useState('');

    const {blogStore} = useStore();
    const {blogsByDate} = blogStore;

    useEffect(() => {
        blogStore.loadBlogs();
    }, [blogStore]);

    function handleDeleteBlog(id: string) {
        setTarget(id);
        setSubmitting(true);
        blogStore.deleteBlog(id);
        // agent.Blogs.delete(id).then(() => {
        //     setBlogs([...blogs.filter(x => x.id !== id)]);
        //     setSubmitting(false);
        // })
    }

    function selectBlog(id: string) {
        blogStore.selectBlog(id);
    }


    if (blogStore.loadingInitial) return <LoadingComponent content={"Loading..."} />

    return (
        <Fragment>
            {blogsByDate.map(blog => {
                return (
                    <div className="blog-list" key={blog.id}>

                        <Col xs={{ span: 24 }} sm={16} md={{ span: 20, offset: 2 }} lg={{ span: 20 }} xl={{ offset: 4, span: 12 }} >
                            <Card
                                className="blog-list-card"
                                title={
                                    <Fragment>
                                        <Col span={16} style={{ color: "white" }}>{blog.title}</Col>
                                        <Col span={4}><span style={{ color: "white", fontWeight: "lighter" }}>{blog.date}</span></Col>
                                    </Fragment>}
                            >
                                <p>{blog.description}</p>
                                <Col>
                                    <Link
                                        to={`/read-blog/${blog.urlSuffix}`}
                                        onClick={() => selectBlog(blog.id)}
                                    >
                                        <Button style={{ marginTop: "55px" }}>Read</Button>
                                    </Link>
                                    <Link
                                        to='/edit-blog'
                                        onClick={() => selectBlog(blog.id)}
                                    >
                                        <Button style={{ marginTop: "55px" }}>Edit</Button>
                                    </Link>

                                    <Button
                                        style={{ marginTop: "55px" }}
                                        danger
                                        onClick={() => handleDeleteBlog(`${blog.id}`) }
                                        loading={target === blog.id} >
                                        Delete
                                    </Button>

                                </Col>
                            </Card>
                        </Col>
                    </div >
                )
            })
            };
        </Fragment >
    );
}

export default observer(BlogList);