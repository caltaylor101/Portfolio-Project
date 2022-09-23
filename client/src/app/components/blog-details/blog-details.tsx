import { Col, Typography } from "antd";
import { observer } from "mobx-react-lite";
import { Fragment, useEffect, useState } from "react";
import { Blog as BlogModel } from "../../models/blog";
import { useStore } from "../../stores/store";

interface Props
{
    blog: BlogModel
}

const BlogDetails = () => {

    const {blogStore} = useStore();
    const {selectedBlog} = blogStore;
    const [count, setCount] = useState(1);
    const [blogId, setBlogId] = useState<string>();
        

    
    useEffect(() => {
      if (selectedBlog !== undefined)
      {
        window.sessionStorage.setItem("blog", selectedBlog!.id);
      }
    }, []);

    useEffect(() => {
        if(selectedBlog === undefined)
        {
          setBlogId(window.sessionStorage.getItem("blog")!);
          
        }
      }, []);
    
    if (blogId) 
    {
        blogStore.getBlog(blogId);
        blogStore.selectBlog(blogId);
    }
    

    // useEffect(() => {
    //     blogStore.getBlog(blogId!);
    //     blogStore.selectBlog(blogId!);
    // })
      
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
                    {selectedBlog?.title}
                </Typography.Title>

                <Typography.Paragraph className='base-text-color' style={{fontSize: "1.25em"}}>
                    {selectedBlog?.body}
                </Typography.Paragraph>

            </Col>
        </Fragment>
    );
  }
  
  export default observer(BlogDetails);