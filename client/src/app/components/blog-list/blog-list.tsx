import { FilterOutlined } from "@ant-design/icons";
import { Button, Card, Col, Row, Typography } from "antd";
import { observer } from "mobx-react-lite";
import { cwd } from "process";
import { Fragment, useEffect, useState } from "react";
import { PagingParams } from "../../models/pagination";
import { useStore } from "../../stores/store";
import BlogListItem from "../blog-list-item/blog-list-item";
import LoadingComponent from "../loading/loading";
import useWindowDimensions from "../window-dimensions/UseWindowDimensions";
import './blog-list.css'

interface Props {
    isUserDashboard: boolean
}


export default observer(function BlogList({isUserDashboard}: Props){
    const {blogStore} = useStore();
    const categories = [
        'All Categories',
        'Game-Dev',
        'React',
        'C#',
        'LeetCode'
    ]

    useEffect(() => {
        blogStore.blogRegistry.clear();
        if (blogStore.pagination !== null) {
            console.log("SET CURRENT TO 1");
            blogStore.setPagingParams(new PagingParams(blogStore.pagination!.currentPage = 1)); 
        } 
        blogStore.loadBlogs(isUserDashboard);
    }, [isUserDashboard]);

    const { height, width } = useWindowDimensions();
    
    const [loadingNext, setLoadingNext] = useState(false);
    
    function handleGetNext() {
        setLoadingNext(true);
        blogStore.setPagingParams(new PagingParams(blogStore.pagination!.currentPage + 1)); 
        blogStore.loadBlogs(isUserDashboard).then(() => setLoadingNext(false));
    }


    if (blogStore.loadingInitial) return <LoadingComponent content={"Loading Blogs..."} />
    if (width > 576) return (
        <Fragment>
            <Row>
            {!isUserDashboard 
            ? 
            <Fragment>
            <Col sm={{span: 14 }} md={{ span: 13, offset: 1 }} lg={{ span: 16 }} xl={{ offset: 4, span: 12 }}>
            {blogStore.blogsByDate.map(blog => {
                return (
                    <Fragment key={blog.id}>
                        <BlogListItem blog={blog} />
                    </Fragment>
                )
            })
            }
            </Col>
            <Col sm={{ span: 10, offset: 0 }} md={{span: 8, offset: 1}} lg={{ span: 6, offset: 1 }} xl={{ span: 5, offset:1 }} >
                <Card  className='blog-list blog-list-card '>
                    <Typography.Title className='base-text-color' level={4}><FilterOutlined className='base-text-color' style={{fontSize: '2em'}} /> &nbsp; Filter Category</Typography.Title>
                    {categories.map(category => {
                    return (
                            <Button className='blog-list-card category-button' style={{width: '100%', textAlign: 'left'}}>
                    <Typography.Paragraph className='base-text-color ' style={{fontSize: '1.25em'}}>&nbsp; {category}</Typography.Paragraph>
                    </Button>
                    )
                })}
                </Card>
            </Col>
            </Fragment>

            :

            <Fragment>
                <Col span={22} offset={1}>
                <Card  className='blog-list blog-list-card '>
                    <Typography.Title className='base-text-color' level={4}><FilterOutlined className='base-text-color' style={{fontSize: '2em'}} /> &nbsp; Filter Category</Typography.Title>
                    {categories.map(category => {
                    return (
                            <Button className='blog-list-card category-button' style={{width: '100%', textAlign: 'left'}}>
                    <Typography.Paragraph className='base-text-color ' style={{fontSize: '1.25em'}}>&nbsp; {category}</Typography.Paragraph>
                    </Button>
                    )
                })}
                </Card>
            </Col>
            <Col span={16} offset={4} > 
            {blogStore.blogsByDate.map(blog => {
                return (
                    <Fragment key={blog.id}>
                        <BlogListItem blog={blog} />
                    </Fragment>
                )
            })
            }
            </Col>
            
            </Fragment>
            }

<Button onClick={handleGetNext} loading={loadingNext} disabled={blogStore.pagination?.totalPages === blogStore.pagination?.currentPage}>More</Button>

            </Row>
        </Fragment >
    );
    else return (
        <Fragment>
            <Row>
            <Col xs={{ span: 24 }}>
                <Card  className='blog-list blog-list-card '>
                    <Typography.Title className='base-text-color' level={4}><FilterOutlined className='base-text-color' style={{fontSize: '2em'}} /> &nbsp; Filter Category</Typography.Title>
                    {categories.map(category => {
                    return (
                            <Button className='blog-list-card category-button' style={{width: '100%', textAlign: 'left'}}>
                    <Typography.Paragraph className='base-text-color ' style={{fontSize: '1.25em'}}>&nbsp; {category}</Typography.Paragraph>
                    </Button>
                    )
                })}
                </Card>
            </Col>
            <Col xs={{ span: 24 }}>
            {blogStore.blogsByDate.map(blog => {
                return (
                    <Fragment key={blog.id}>
                        <BlogListItem blog={blog} />
                    </Fragment>
                )
            })
            }
            </Col>
            
            </Row>
        </Fragment >
    );
})