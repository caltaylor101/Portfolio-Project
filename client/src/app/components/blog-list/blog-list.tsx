import { Col, Card, Button, Spin } from "antd";
import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import agent from "../../api/agent";
import { Blog, Blog as BlogModel } from '../../models/blog';
import LoadingComponent from "../loading/loading";
import './blog-list.css'



const BlogList = () => {
    const [blogs, setBlogs] = useState<BlogModel[]>([]);
    const [submitting, setSubmitting] = useState(false);
    const [target, setTarget] = useState('');

    useEffect(() => {
        agent.Blogs.list().then(response => {
            let blogs: Blog[] = [];
            response.forEach(blog => {
                console.log(blog.date);
                blog.date = blog.date.split('T')[0];
                blogs.push(blog);
            })
            setBlogs(blogs);
            setLoading(false);
        });
    }, []);

    function handleDeleteBlog(id: string) {
        setTarget(id);
        setSubmitting(true);
        console.log(target);
        agent.Blogs.delete(id).then(() => {
            setBlogs([...blogs.filter(x => x.id !== id)]);
            setSubmitting(false);
        })
    }

    const [loading, setLoading] = useState(true);


    if (loading) return <LoadingComponent content={"Loading..."} />

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
                                        <Col span={4}><span style={{ color: "white", fontWeight: "lighter" }}>{blog.date}</span></Col>
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
                                        onClick={() => handleDeleteBlog(`${blog.id}`) }
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

export default BlogList;