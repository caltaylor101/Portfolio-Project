import { observer } from "mobx-react-lite";
import { Fragment, useEffect, useState} from "react";
import { useStore } from "../../stores/store";
import BlogListItem from "../blog-list-item/blog-list-item";
import LoadingComponent from "../loading/loading";
import './blog-list.css'

interface Props {
    isUserDashboard: boolean
}


export default observer(function BlogList({isUserDashboard}: Props){
    const {blogStore} = useStore();

    useEffect(() => {
        blogStore.blogRegistry.clear();
        blogStore.loadBlogs(isUserDashboard);
    }, [isUserDashboard]);

    if (blogStore.loadingInitial) return <LoadingComponent content={"Loading Blogs..."} />

    return (
        <Fragment>
            {blogStore.blogsByDate.map(blog => {
                return (
                    <Fragment key={blog.id}>
                        <BlogListItem blog={blog} />
                    </Fragment>
                )
            })
            }
        </Fragment >
    );
})