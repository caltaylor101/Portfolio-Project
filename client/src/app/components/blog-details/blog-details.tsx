import { Col, Typography } from "antd";
import { observer } from "mobx-react-lite";
import { Fragment, useEffect, useState } from "react";
import { Blog as BlogModel } from "../../models/blog";
import { useStore } from "../../stores/store";
import { useParams } from "react-router-dom";
import LoadingComponent from "../loading/loading";
import Paragraph from "antd/lib/typography/Paragraph";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark, coy, dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { nightOwl } from "react-syntax-highlighter/dist/cjs/styles/prism";

interface Props {
  blog: BlogModel
}

const BlogDetails = () => {

  const { blogStore } = useStore();
  const { selectedBlog } = blogStore;
  const [currentBlog, setCurrentBlog] = useState<BlogModel | null>(null);
  const { urlSuffix } = useParams();

  useEffect(() => {
    if (selectedBlog !== undefined) {
      window.sessionStorage.setItem("blog", JSON.stringify(selectedBlog));
      setCurrentBlog(selectedBlog);
    }
  }, [selectedBlog]);

  useEffect(() => {
    try {
      if (selectedBlog === undefined) {
        let exampleBlog = JSON.parse(window.sessionStorage.getItem("blog")!);
        if (exampleBlog === null || exampleBlog.urlSuffix !== urlSuffix) {
          blogStore.getBlog(urlSuffix!);
        }
        setCurrentBlog(exampleBlog);
      }
    } catch (error) {
      console.log(error);
    }

  }, []);

  let myCode = currentBlog?.body.match(/(?<=<code>\s+).*?(?=\s+<\/code>)/gs);
  let myBody = currentBlog?.body.split((/[\n]/));
  let codeCount = -1;
  let isCode = false;

  function testFunction() {
    isCode = true;
    codeCount += 1;
  }

  if (blogStore.loading) return <LoadingComponent content={"Loading..."} />
  return (
    <Fragment>
      <Col xs={{ span: 24 }} sm={16} md={{ span: 20, offset: 2 }} lg={{ span: 20 }} xl={{ offset: 4, span: 12 }} style={{ marginTop: '50px' }}>
        <Typography.Title
          level={1}
          className='base-text-color'
          style={{
            borderBottom: "5px solid white"
          }}
        >
          {currentBlog?.title}
        </Typography.Title>
        <Paragraph style={{
          borderBottom: "2px dashed white"
        }}>
          <Typography.Title
            level={3}
            className='base-text-color'
            style={{
              borderBottom: "2px dashed white"
            }}
          >
            Description:
          </Typography.Title>

          <Typography.Text
            className='base-text-color'
            style={{ fontSize: '1.6em' }}
          >
            {currentBlog?.description}
          </Typography.Text>
        </Paragraph>
        {myBody?.map((text, key) => {
          if (text.split("<code>").length > 1)
          {
            testFunction();
            let myFormattedCode = myCode?.at(codeCount)?.split((/[\n]/));
            return (
              <SyntaxHighlighter language="javascript" style={nightOwl}>
                {myCode?.at(codeCount)!}
              </SyntaxHighlighter>
            )
          }
          else if (text.split("</code>").length > 1)
          {
            isCode = false;
          }
          else if (!isCode)
          {
            return (
            <Paragraph key={key} className="base-text-color" style={{ fontSize: "1.5em" }}>
              {text}
            </Paragraph>
            )
          }
      })}
      </Col>
    </Fragment>
  );
}

export default observer(BlogDetails);