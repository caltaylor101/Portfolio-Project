import { Col, Card, Button } from "antd";
import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Blog as BlogModel } from '../../models/blog';
import './blog-list.css'



const BlogList = () => {
    const [blogs, setBlogs] = useState<BlogModel[]>([]);

    useEffect(() => {
        axios.get('http://localhost:5000/blog').then(response => {
            console.log(response);
            setBlogs(response.data);
        });
    }, []);

    function handleDeleteActivity(id: string) {
        setBlogs([...blogs.filter(x => x.id !== id)])
    }

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

                                        <Button style={{ marginTop: "55px" }} danger onClick={() => handleDeleteActivity(`${blog.id}`)} >Delete</Button>
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