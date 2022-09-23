import { Col, Typography } from "antd";
import { observer } from "mobx-react-lite";
import { Fragment, useState } from "react";
import { Blog as BlogModel } from "../../models/blog";
import { useStore } from "../../stores/store";

interface Props
{
    blog: BlogModel
}

const BlogDetails = () => {

    const {blogStore} = useStore();
    const {selectedBlog} = blogStore;

    return (
      <Fragment>
            <Col xs={{ span: 24 }} sm={16} md={{ span: 20, offset: 2 }} lg={{ span: 20 }} xl={{ offset: 4, span: 12 }} >
                <Typography.Title
                    editable
                    level={1}
                    className='base-text-color'
                    style={{
                        borderBottom: "2px solid white"
                    }}
                >
                    {selectedBlog!.title}
                </Typography.Title>

                <Typography.Paragraph className='base-text-color' style={{fontSize: "1.25em"}}>
                    {selectedBlog!.body}
                </Typography.Paragraph>

            </Col>
        </Fragment>
    );
  }
  
  export default observer(BlogDetails);