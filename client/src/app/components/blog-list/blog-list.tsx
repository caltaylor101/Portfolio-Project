import { ArrowUpOutlined, FilterOutlined } from "@ant-design/icons";
import { Alert, Anchor, Button, Card, Col, Row, Skeleton, Spin, Typography } from "antd";
import Link from "antd/lib/typography/Link";
import { observer } from "mobx-react-lite";
import { cwd } from "process";
import { Fragment, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
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
        '.NET',
        'React',
        'C#',
        'LeetCode'
    ]

    useEffect(() => {
        blogStore.blogRegistry.clear();
        if (blogStore.pagination !== null) {
            blogStore.setPagingParams(new PagingParams()); 
        } 
        blogStore.loadBlogs(isUserDashboard);
    }, [isUserDashboard]);

    const { height, width } = useWindowDimensions();

    const [scrollPosition, setScrollPosition] = useState(0);
    const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
    };
    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
    
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const [loadingNext, setLoadingNext] = useState(false);
    
    function handleGetNext() {
        setLoadingNext(true);
        blogStore.setPagingParams(new PagingParams(blogStore.pagination!.currentPage + 1)); 
        blogStore.loadBlogs(isUserDashboard).then(() => setLoadingNext(false));
    }


    if (blogStore.loadingInitial) return <LoadingComponent content={"Loading Blogs..."} />
    if (width > 576) return (
        <Fragment>
        
        {scrollPosition > 500 && !isUserDashboard && 
        <Anchor offsetTop={height - 100}>
        <Link href="#top" className='base-text-color' style={{ fontSize: '1.5em' }}>&nbsp; Back Up <ArrowUpOutlined className='base-text-color' style={{ fontSize: '1.5em' }} /></Link>

        </Anchor>
        }
        <InfiniteScroll
                pageStart={0}
                loadMore={handleGetNext}
                hasMore={!loadingNext && !!blogStore.pagination && blogStore.pagination.currentPage < blogStore.pagination.totalPages}
                initialLoad={false}
            >
            
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
                        <Button onClick={() => blogStore.setCategoryParams(category)} className='blog-list-card category-button' style={{ width: '100%', textAlign: 'left' }} id={category}>
                            <Typography.Paragraph className='base-text-color ' style={{ fontSize: '1.25em' }}>&nbsp; {category}</Typography.Paragraph>
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
                            <Button onClick={() => blogStore.setCategoryParams(category)} className='blog-list-card category-button' style={{width: '100%', textAlign: 'left'}}>
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

            </Row>
            {loadingNext && 
            <Row style={{marginTop:'15px'}}>
                <Col offset={4} span={12}>
            <Spin spinning={true} size='large' style={{ justifySelf: 'center', display: 'block' }}>
            </Spin>
            </Col>
            <Col offset={4} span={12} style={{marginTop: '25px'}}>
                <Skeleton active />
                <Skeleton active />
                <Skeleton active />
                <Skeleton active />
            </Col>
            </Row>
            }
        
        </InfiniteScroll>
        
    </Fragment >


    );


    else return (
        <InfiniteScroll
                pageStart={0}
                loadMore={handleGetNext}
                hasMore={!loadingNext && !!blogStore.pagination && blogStore.pagination.currentPage < blogStore.pagination.totalPages}
                initialLoad={false}
            >
        <Fragment>
            <Row>
            <Col xs={{ span: 24 }}>
                <Card  className='blog-list blog-list-card '>
                    <Typography.Title className='base-text-color' level={4}><FilterOutlined className='base-text-color' style={{fontSize: '2em'}} /> &nbsp; Filter Category</Typography.Title>
                    {categories.map(category => {
                    return (
                            <Button onClick={() => blogStore.setCategoryParams(category)} className='blog-list-card category-button' style={{width: '100%', textAlign: 'left'}}>
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
            {loadingNext && 
            <Fragment>
            <Spin spinning={true} size='large' style={{ justifySelf: 'center', display: 'block' }}>
                <Alert
                    message=" "
                    description={"Loading more blogs"}
                    type="info"
                    closable
                    style={{ textAlign: 'center', height: '70px' }}
                />

            </Spin>

            <Col offset={4} span={12} style={{marginTop: '25px'}}>
                <Skeleton active />
                <Skeleton active />
                <Skeleton active />
                <Skeleton active />
            </Col>
            </Fragment>
            }
        </Fragment >
        </InfiniteScroll>
    );
})