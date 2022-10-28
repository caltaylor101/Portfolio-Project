import { Col, Typography, Image } from "antd";
import { observer } from "mobx-react-lite";
import { Fragment, useEffect, useState } from "react";
import { Blog as BlogModel } from "../../models/blog";
import { useStore } from "../../stores/store";
import { useParams } from "react-router-dom";
import LoadingComponent from "../loading/loading";
import Paragraph from "antd/lib/typography/Paragraph";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { nightOwl } from "react-syntax-highlighter/dist/cjs/styles/prism";

interface Props {
  blog: BlogModel
}

const BlogDetails = () => {

  const { blogStore } = useStore();
  const { selectedBlog } = blogStore;
  // const [currentBlog, setCurrentBlog] = useState<BlogModel | null>(null);
  const { urlSuffix } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    console.log('selected blog' + selectedBlog);
    // blogStore.getBlog(urlSuffix!);
    // setCurrentBlog(blogStore.selectedBlog!);
    // console.log(currentBlog);
  }, []);

  useEffect(() => {
    if (selectedBlog !== undefined) {
      console.log('selectedblog');
      console.log(selectedBlog);
      console.log('selectedblog');

      window.sessionStorage.setItem("blog", JSON.stringify(selectedBlog));
      // setCurrentBlog(selectedBlog);

    }
  }, []);

  useEffect(() => {
    try {
      if (selectedBlog === undefined) {
        console.log('test ');
        let exampleBlog = JSON.parse(window.sessionStorage.getItem("blog")!);
        console.log(exampleBlog);
        if (exampleBlog === null || exampleBlog.urlSuffix !== urlSuffix) {
          blogStore.getBlog(urlSuffix!);
          console.log(blogStore.selectedBlog);
        }
        // setCurrentBlog(exampleBlog);
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
          {blogStore.selectedBlog?.title}
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
            {blogStore.selectedBlog?.description}
          </Typography.Text>
        </Paragraph>


        {myBody?.map((text, key) => {

          if (text.split("<code>").length > 1)
          {
            setCode();
            //Find the separated code
            let myFormattedCode = myCode?.at(codeCount)?.split((/[\n]/));
            return (
              //Add the separated code here.
              <SyntaxHighlighter language="javascript" style={nightOwl}>
                {myCode?.at(codeCount)!}
              </SyntaxHighlighter>
            )
          }
          //Close the code tag
          else if (text.split("</code>").length > 1)
          {
            isCode = false;
          }
          
          //Continue the paragraph. 
          else if (!isCode)
          {
            if (text.split(/(<image_\d>)/).length > 1 && blogStore.selectedBlog!.photos !== null)
            {
            let test = text.split(/(<image_\d>)/);
            return (test.map(stuff => {
              let testVar = stuff.match(/(<image_\d>)/);
              if(testVar !== null)
              {
                console.log('testVar ' + testVar);
                let testNumber = testVar[0].match(/(\d)/) as any;
                console.log(blogStore.selectedBlog!.photos);
                console.log(testNumber);
                let srcImage = blogStore.selectedBlog?.photos?.filter(x => x.order == testNumber[0].toString());
                console.log('testvar inside ' + srcImage);
                let srcImageReference = srcImage![0];
                return (
                  <Image src={`${srcImageReference.url}`} />

                );
              }
              else
              {
                return (
                  <Paragraph key={key} className="base-text-color" style={{ fontSize: "1.5em" }}>
                    {stuff}
                  </Paragraph>
                )
              }
            }));

            }
            else
            {
              return (
                <Paragraph key={key} className="base-text-color" style={{ fontSize: "1.5em" }}>
                  {text}
                </Paragraph>
                )
            }
            
          }
          // if (text.split(/(<image_\d>)/).length > 1)
          // {
          //   let test = text.split(/(<image_\d>)/);
          //   console.log(test);
          // }
      })}
      </Col>
    </Fragment>
  );
}

export default observer(BlogDetails);