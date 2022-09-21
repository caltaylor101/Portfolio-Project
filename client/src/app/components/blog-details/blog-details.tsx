import { Col, Typography } from "antd";
import { Fragment, useState } from "react";
import { Blog as BlogModel } from "../../models/blog";

interface Props
{
    blog: BlogModel
}

const BlogDetails = ({blog}: Props) => {
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
                    {blog.title}
                </Typography.Title>

                <Typography.Paragraph className='base-text-color' style={{fontSize: "1.25em"}}>
                    {blog.body}
                </Typography.Paragraph>

            </Col>
        </Fragment>
    );
  }
  
  export default BlogDetails;