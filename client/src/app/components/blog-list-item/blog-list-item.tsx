import { Col, Card, Button, Typography, Row, Space, Popconfirm } from "antd";
import { parse, format } from "date-fns";
import { observer } from "mobx-react-lite";
import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RouteLinks } from "../../../App-Routes";
import { Blog } from "../../models/blog";
import { useStore } from "../../stores/store";

interface Props {
    blog: Blog;
}

const BlogListItem = ({ blog }: Props) => {

    const routeLinks = new RouteLinks();
    const { blogStore, userStore } = useStore();
    
    const [target, setTarget] = useState('');
    const navigate = useNavigate();

    function handleDeleteBlog(id: string) {
        setTarget(id);
        blogStore.deleteBlog(id);
        // agent.Blogs.delete(id).then(() => {
        //     setBlogs([...blogs.filter(x => x.id !== id)]);
        //     setSubmitting(false);
        // })
    }

    function selectBlog(id: string, url: string) {
        blogStore.getBlogById("null", id).then(() => {
            navigate(url);
        });
    }

    

    return (
        <div className="blog-list" key={blog.id}>

            <Col xs={{ span: 24 }} sm={16} md={{ span: 20, offset: 2 }} lg={{ span: 20 }} xl={{ offset: 4, span: 12 }} >

                <Card className="blog-list-card">
                    <Row>
                        <Col span={24}>
                            <Typography.Title underline className="base-text-color" level={1}>{blog.title}</Typography.Title>
                        </Col>

                    </Row>
                    <Card
                        className="blog-list-card"
                        title={
                            <Fragment>
                                <Row>
                                    <Col span={12}><span style={{ color: "white", fontWeight: "lighter" }}>Published on: {blog.date !== undefined ?  format(new Date(blog.date + 'Z'), 'dd MMM yyyy h:mm aa') : null}</span></Col>
                                    <Col span={12}>
                                        <Typography.Title style={{ textAlign: 'right' }} className='base-text-color' level={4}>By: {blog.appUser}</Typography.Title>
                                    </Col>
                                </Row>
                            </Fragment>}
                    >
                        <p>{blog.description}</p>

                    </Card>
                    <Col>
                        <Space size='middle'>
                            <Button style={{ marginTop: "55px" }} onClick={() => selectBlog(blog.id, `/read-blog/${blog.urlSuffix}`)}>Read</Button>
                            {blog.appUser == userStore.user?.username &&
                                <Fragment>
                                    <Button style={{ marginTop: "55px" }} onClick={() => selectBlog(blog.id, routeLinks.blogEditForm)}>Edit</Button>

                                    <Popconfirm title="Are you sure you want to delete your blog?" onConfirm={() => handleDeleteBlog(`${blog.id}`)}>
                                        <Button
                                            style={{ marginTop: "55px" }}
                                            danger
                                            loading={target === blog.id} >
                                            Delete
                                        </Button>
                                    </Popconfirm>
                                </Fragment>
                            }
                        </Space>

                    </Col>
                </Card>
            </Col>
        </div >
    )
}

export default observer(BlogListItem);