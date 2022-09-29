import { Col, Typography } from "antd";
import { observer } from "mobx-react-lite";
import { Fragment, useEffect, useState } from "react";
import { Blog as BlogModel } from "../../models/blog";
import { useStore } from "../../stores/store";
import { useParams } from "react-router-dom";
import LoadingComponent from "../loading/loading";

interface Props
{
    blog: BlogModel
}

const BlogDetails = () => {

    const {blogStore} = useStore();
    const {selectedBlog} = blogStore;
    const [currentBlog, setCurrentBlog] = useState<BlogModel | null>(null);
    const {urlSuffix} = useParams();
        
    useEffect(() => {
      if (selectedBlog !== undefined)
      {
        window.sessionStorage.setItem("blog", JSON.stringify(selectedBlog));
        setCurrentBlog(selectedBlog);
      }
    }, [selectedBlog]);

    useEffect(() => {
      try
      {
        if(selectedBlog === undefined)
        {
          let exampleBlog = JSON.parse(window.sessionStorage.getItem("blog")!);
          if (exampleBlog === null || exampleBlog.urlSuffix !== urlSuffix)
          {
            blogStore.getBlog(urlSuffix!);
          }
          setCurrentBlog(exampleBlog);
        }
      } catch (error) 
      {
        console.log(error);
      }
        
      }, []);

    if (blogStore.loading) return <LoadingComponent content={"Loading..."} />

    return (
      <Fragment>
        
            <Col xs={{ span: 24 }} sm={16} md={{ span: 20, offset: 2 }} lg={{ span: 20 }} xl={{ offset: 4, span: 12 }} style={{marginTop: '50px'}}>
                <Typography.Title
                    editable
                    level={1}
                    className='base-text-color'
                    style={{
                        borderBottom: "2px solid white"
                    }}
                >
                    {currentBlog?.title}
                </Typography.Title>

                <Typography.Paragraph className='base-text-color' style={{fontSize: "1.25em"}}>
                    {currentBlog?.body}
                </Typography.Paragraph>

            </Col>
        </Fragment>
    );
  }
  
  export default observer(BlogDetails);