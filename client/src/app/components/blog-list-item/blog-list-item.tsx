import { Col, Card, Button, Typography, Row } from "antd";
import { observer } from "mobx-react-lite";
import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { Blog } from "../../models/blog";
import { useStore } from "../../stores/store";

interface Props {
    blog: Blog;
}

const BlogListItem = ({ blog }: Props) => {


    const { blogStore } = useStore();
    const { blogsByDate } = blogStore;

    const [target, setTarget] = useState('');

    function handleDeleteBlog(id: string) {
        setTarget(id);
        blogStore.deleteBlog(id);
        // agent.Blogs.delete(id).then(() => {
        //     setBlogs([...blogs.filter(x => x.id !== id)]);
        //     setSubmitting(false);
        // })
    }

    function selectBlog(id: string) {
        blogStore.selectBlog(id);
    }

    return (
        <div className="blog-list" key={blog.id}>

            <Col xs={{ span: 24 }} sm={16} md={{ span: 20, offset: 2 }} lg={{ span: 20 }} xl={{ offset: 4, span: 12 }} >

                <Card className="blog-list-card">
                    <Row>
                        <Col span={12}>
                            <Typography.Title underline className="base-text-color" level={1}>{blog.title}</Typography.Title>
                        </Col>
                        
                    </Row>
                <Card
                    className="blog-list-card"
                    title={
                        <Fragment>
                            <Row>
                            <Col span={12}><span style={{ color: "white", fontWeight: "lighter" }}>Published on: {blog.date.toString().split('T')[0]}</span></Col>
                            <Col span={12}>
                            <Typography.Title style={{ textAlign: 'right' }} className='base-text-color' level={4}>By: {blog.appUser}</Typography.Title>
                            </Col>
                            </Row>
                        </Fragment>}
                >
                    <p>{blog.description}</p>
                    
                </Card>
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
                            onClick={() => handleDeleteBlog(`${blog.id}`)}
                            loading={target === blog.id} >
                            Delete
                        </Button>

                    </Col>
                </Card>
            </Col>
        </div >
    )
}

export default observer(BlogListItem);