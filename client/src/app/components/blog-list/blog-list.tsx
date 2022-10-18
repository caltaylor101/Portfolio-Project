import { observer } from "mobx-react-lite";
import { Fragment, useEffect} from "react";
import { useStore } from "../../stores/store";
import BlogListItem from "../blog-list-item/blog-list-item";
import LoadingComponent from "../loading/loading";
import './blog-list.css'

interface Props {
    isUserDashboard: boolean
}


function BlogList({isUserDashboard}: Props){
    const {blogStore} = useStore();
    const {blogsByDate} = blogStore;

    useEffect(() => {
        blogStore.loadBlogs(isUserDashboard);
    }, []);

    if (blogStore.loadingInitial) return <LoadingComponent content={"Loading Blogs..."} />

    return (
        <Fragment>
            {blogsByDate.map(blog => {
                return (
                    <Fragment key={blog.id}>
                        <BlogListItem blog={blog} />
                    </Fragment>
                )
            })
            }
        </Fragment >
    );
}

export default observer(BlogList);