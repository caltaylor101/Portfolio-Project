import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Col, Popconfirm, Row, Space, Typography, Image } from "antd";
import { format, formatDistanceToNow } from "date-fns";
import { observer } from "mobx-react-lite";
import { Fragment, useEffect } from "react";
import { useStore } from "../../stores/store";
import userStore from "../../stores/userStore";
import ChatForm from "./chat-form";


interface Props {
    blogId: string;
}

export default observer(function CommentBox({ blogId }: Props) {
    const { commentStore } = useStore();

    useEffect(() => {
        if (blogId) {
            commentStore.createHubConnection(blogId);
        }
        return () => {
            commentStore.clearComments();
        }
    }, [commentStore, blogId])

    return (
        <Fragment >
            <ChatForm />
            <div className="blog-list">
                {commentStore.comments.map(comment => (
                    <Col className="blog-list-card" key={comment.id} style={{ marginTop: '1px', padding: '20px' }} xs={{ span: 22, offset: 1 }} sm={{ span: 22, offset: 1 }} md={{ span: 16, offset: 4 }} lg={{ span: 10, offset: 4 }}>
                        <Fragment>
                            <Row >
                                <Col xs={{ span: 24 }} md={{ span: 24 }} span={12}>
                                    <span style={{ color: "white", fontWeight: "lighter" }}>
                                        {/* Published on: {format(new Date(comment.createdAt + 'Z'), 'dd MMM yyyy h:mm aa')} */}

                                        <Typography.Title className='base-text-color' level={5}><Avatar
                                style={{ border: '1px solid teal' }}
                                size={{ xs: 24, sm: 32, md: 30, lg: 30, xl: 50, xxl: 50 }}
                                icon= {
                                    comment.image !== null ? 
                                    <Image
                                        preview={false}
                                        src={comment.image} /> : 
                                    <UserOutlined style={{fontSize: '1.5em'}} />} />&nbsp;&nbsp;&nbsp;{comment.displayName}</Typography.Title>

                                        <p>Commented {formatDistanceToNow(comment.createdAt)} ago</p>
                                    </span>
                                </Col>
                                <Col xs={{ span: 24 }} md={{ span: 24 }} span={12}>
                                </Col>
                            </Row>
                        </Fragment>
                                <p style={{ whiteSpace: 'pre-wrap', fontSize: '1.2em' }}>{comment.body}</p>
                    </Col>
                ))}

            </div >
        </Fragment>
    );

})