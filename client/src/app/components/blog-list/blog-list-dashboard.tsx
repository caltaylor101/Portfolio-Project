import { Col, Card, Button, Spin } from "antd";
import { observer } from "mobx-react-lite";
import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Blog } from "../../models/blog";
import LoadingComponent from "../loading/loading";
import './blog-list.css'

interface Props {
    blogs: Blog[],
    loadingInitial: boolean
}

const BlogListDashboard = ({blogs, loadingInitial}: Props) => {

    //const [blogs, setBlogs] = useState<BlogModel[]>([]);
    const [submitting, setSubmitting] = useState(false);
    const [target, setTarget] = useState('');

    // function handleDeleteBlog(id: string) {
    //     setTarget(id);
    //     setSubmitting(true);
    //     console.log(target);
    //     agent.Blogs.delete(id).then(() => {
    //         setBlogs([...blogs.filter(x => x.id !== id)]);
    //         setSubmitting(false);
    //     })
    // }

    if (loadingInitial) return <LoadingComponent content={"Loading..."} />

    return (
        <Fragment>
            {blogs.map(blog => {
                return (
                    <div className="blog-list" key={blog.id}>
                        <Col xs={{ span: 24 }} sm={16} md={{ span: 20, offset: 2 }} lg={{ span: 20 }} xl={{ offset: 4, span: 12 }} >
                            <Card
                                className="blog-list-card"
                                title={
                                    <Fragment>
                                        <Col span={16} style={{ color: "white" }}>{blog.title}</Col>
                                        <Col span={4}><span style={{ color: "white", fontWeight: "lighter" }}>{blog.date.toString().split('T')[1]}</span></Col>
                                    </Fragment>}
                            >
                                <p>{blog.description}</p>
                                <Col>
                                    <Link
                                        to='/read-blog'
                                        state={blog}
                                    >
                                        <Button style={{ marginTop: "55px" }}>Read</Button>
                                    </Link>
                                    <Link
                                        to='/edit-blog'
                                        state={blog}
                                    >
                                        <Button style={{ marginTop: "55px" }}>Edit</Button>
                                    </Link>

                                    <Button
                                        style={{ marginTop: "55px" }}
                                        danger
                                        //onClick={() => handleDeleteBlog(`${blog.id}`) }
                                        loading={submitting && target === blog.id} >
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

export default observer(BlogListDashboard);