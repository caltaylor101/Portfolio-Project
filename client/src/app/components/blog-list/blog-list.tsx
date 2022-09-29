import { Col, Card, Button, Spin } from "antd";
import { observer } from "mobx-react-lite";
import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import agent from "../../api/agent";
import { Blog, Blog as BlogModel } from '../../models/blog';
import { useStore } from "../../stores/store";
import BlogListItem from "../blog-list-item/blog-list-item";
import LoadingComponent from "../loading/loading";
import './blog-list.css'



function BlogList(){

    

    const {blogStore} = useStore();
    const {blogsByDate} = blogStore;

    useEffect(() => {
        blogStore.loadBlogs();
    }, [blogStore]);

    


    if (blogStore.loadingInitial) return <LoadingComponent content={"Loading..."} />

    return (
        <Fragment>
            {blogsByDate.map(blog => {
                return (
                    <Fragment key={blog.id}>
                        <BlogListItem blog={blog} />
                    </Fragment>
                )
            })
            };
        </Fragment >
    );
}

export default observer(BlogList);