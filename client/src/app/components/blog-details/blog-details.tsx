import { Col, Typography, Image, Anchor } from "antd";
import { observer } from "mobx-react-lite";
import { Fragment, useEffect, useState } from "react";
import { Blog as BlogModel } from "../../models/blog";
import { useStore } from "../../stores/store";
import { useParams } from "react-router-dom";
import LoadingComponent from "../loading/loading";
import Paragraph from "antd/lib/typography/Paragraph";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { nightOwl } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { format } from "date-fns";
import useWindowDimensions from "../window-dimensions/UseWindowDimensions";
import Link from "antd/lib/typography/Link";
import { ArrowUpOutlined } from "@ant-design/icons";
import CommentBox from "../chat/comment-box";


interface Props {
  blog: BlogModel
}

const BlogDetails = () => {

  const [isVisible, setIsVisible] = useState(false);
  const [currentHiddenHeight, setHeight] = useState(0)

  useEffect(() => {
    window.addEventListener("scroll", listenToScroll);
    return () =>
      window.removeEventListener("scroll", listenToScroll);
  }, [])

  const listenToScroll = () => {
    let heightToRevealFrom = 500;
    const winScroll = document.body.scrollTop ||
      document.documentElement.scrollTop;
    setHeight(winScroll);
    if (winScroll > heightToRevealFrom) {
      !isVisible && setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const { blogStore } = useStore();
  const { selectedBlog } = blogStore;
  const { urlSuffix } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (selectedBlog !== undefined) {
      window.sessionStorage.setItem("blog", JSON.stringify(selectedBlog));
    }
  }, []);

  useEffect(() => {
    try {
      if (selectedBlog === undefined) {
        let exampleBlog = JSON.parse(window.sessionStorage.getItem("blog")!);
        if (exampleBlog === null || exampleBlog.urlSuffix !== urlSuffix) {
          blogStore.getBlog(urlSuffix!);
        }
        blogStore.selectedBlog = exampleBlog;
      }
    } catch (error) {
      console.log(error);
    }
  }, []);


  //Find all the <code></code> tags and separate them from the body. 
  let myCode = blogStore.selectedBlog?.body.match(/(?<=<code>\s+).*?(?=\s+<\/code>)/gs);
  //Divide the body by all the new lines
  let myBody = blogStore.selectedBlog?.body.split((/[\n]/));
  let codeCount = -1;
  let isCode = false;

  //Find all pictures
  let myPictures = blogStore.selectedBlog?.body.match(/(<image_\d>)/gs);
  function setCode() {
    isCode = true;
    codeCount += 1;
  }

  const { height, width } = useWindowDimensions();

  if (blogStore.loading) return <LoadingComponent content={"Loading..."} />
  return (
    <Fragment>
      {isVisible &&
        <Anchor offsetTop={height - 100}>
          <Link href="#top" className='base-text-color' style={{ fontSize: '1.5em' }}>&nbsp; Back Up <ArrowUpOutlined className='base-text-color' style={{ fontSize: '1.5em' }} /></Link>
        </Anchor>
      }
      <Col xs={{ span: 22, offset: 1 }} sm={16} md={{ span: 20, offset: 2 }} lg={{ span: 20 }} xl={{ offset: 4, span: 12 }} style={{ marginTop: '50px', paddingBottom: '50px' }}>
        <Typography.Paragraph style={{
          borderBottom: "5px solid white"
        }}>
          <Typography.Title
            level={1}
            className='base-text-color'
          >
            {blogStore.selectedBlog?.title}
          </Typography.Title>
          <Typography.Title
            level={3}
            className='base-text-color'
            style={{ textAlign: 'right', lineHeight: '0' }}
          >
            {blogStore.selectedBlog?.date !== undefined ? format(new Date(blogStore.selectedBlog?.date! + 'Z'), 'dd MMM yyyy h:mm aa') : null}
          </Typography.Title>
        </Typography.Paragraph>

        {myBody?.map((text, key) => {

          if (text.split("<code>").length > 1) {
            setCode();
            //Find the separated code
            let myFormattedCode = myCode?.at(codeCount)?.split((/[\n]/));
            return (
              //Add the separated code here.
              <SyntaxHighlighter key={key} language="javascript" style={nightOwl}>
                {myCode?.at(codeCount)!}
              </SyntaxHighlighter>
            )
          }
          //Close the code tag
          else if (text.split("</code>").length > 1) {
            isCode = false;
          }

          //Continue the paragraph. 
          else if (!isCode) {
            let imageTextSplit: any = text.split(/(<image_\d>)/);
            if (imageTextSplit.length > 1 && blogStore.selectedBlog!.photos !== null) {
              return (imageTextSplit.map((imageText: any, i = 100): any => {
                i += 1;
                let photoMatches = imageText.match(/(<image_\d>)/);
                if (photoMatches !== null) {
                  let photoArray = photoMatches[0].match(/(\d)/) as any;
                  let srcImage = blogStore.selectedBlog?.photos?.filter(x => x.order == photoArray[0].toString());
                  let srcImageReference = srcImage![0];
                  return (
                    <Image key={i} src={`${srcImageReference.url}`} />

                  );
                }
                else {
                  return (
                    <Paragraph key={i} className="base-text-color" style={{ fontSize: "1.5em" }}>
                      {imageText}
                    </Paragraph>
                  )
                }
              }));

            }
            else {
              return (
                <Paragraph key={key} className="base-text-color" style={{ fontSize: "1.5em" }}>
                  {text}
                </Paragraph>
              )
            }

          }
        })}
      </Col>

      {blogStore.selectedBlog?.id &&
        <CommentBox blogId={blogStore.selectedBlog!.id} />
      }

    </Fragment>
  );
}

export default observer(BlogDetails);