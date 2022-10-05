import { Col, Card, Button } from "antd";
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

                <Card
                    className="blog-list-card"
                    title={
                        <Fragment>
                            <Col span={16} style={{ color: "white" }}>{blog.title}</Col>
                            <Col span={4}><span style={{ color: "white", fontWeight: "lighter" }}>{blog.date.toString().split('T')[0]}</span></Col>
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