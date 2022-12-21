import { UserOutlined } from "@ant-design/icons";
import { Col, Card, Button, Typography, Row, Space, Popconfirm, Avatar, Image } from "antd";
import { format } from "date-fns";
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
    }

    function selectBlog(id: string, url: string) {
        blogStore.getBlogById("null", id).then(() => {
            navigate(url);
        });
    }

    

    return (
        <div className="blog-list" key={blog.id}>

            <Col >

                <Card className="blog-list-card">
                    <Row>
                        <Col span={24}>
                            <Typography.Title underline className="base-text-color" level={1}>{blog.title} <Avatar
                                style={{ border: '1px solid teal', float: 'right' }}
                                size={{ xs: 24, sm: 32, md: 30, lg: 30, xl: 50, xxl: 50 }}
                                icon= {
                                    blog.appUser?.image !== null ? 
                                    <Image
                                        preview={false}
                                        src={blog.appUser?.image} /> : 
                                    <UserOutlined style={{fontSize: '1.5em'}} />} 
                            /></Typography.Title>
                            
                        </Col>
                    </Row>
                    <Card
                        className="blog-list-card"
                        title={
                            <Fragment>
                                <Row>
                                    <Col xs={{span: 24}} md={{span:24}} span={12}><span style={{ color: "white", fontWeight: "lighter" }}>Published on: {blog.date !== undefined ?  format(new Date(blog.date + 'Z'), 'dd MMM yyyy h:mm aa') : null}</span></Col>
                                    <Col xs={{span: 24}} md={{span:24}} span={12}>
                                        <Typography.Title style={{ textAlign: 'right' }} className='base-text-color' level={4}>By: {blog.appUser?.displayName} </Typography.Title>
                                        
                                    </Col>
                                </Row>
                            </Fragment>}
                    >
                        <p>{blog.description}</p>
                        {blog.photos?.map(photo => {
                            console.log(blog.photos?.length);
                            return (
                                photo.isMainProfilePicture
                            );
                        })}

                    </Card>
                    <Col>
                        <Space size='middle'>
                            <Button style={{ marginTop: "55px" }} onClick={() => selectBlog(blog.id, `/read-blog/${blog.urlSuffix}`)}>Read</Button>
                            {blog.appUser?.username == userStore.user?.username &&
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