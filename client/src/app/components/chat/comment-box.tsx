import { Button, Card, Col, Popconfirm, Row, Space, Typography } from "antd";
import { format } from "date-fns";
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
        <Fragment>
            <ChatForm />
        <div className="blog-list">
            {commentStore.comments.map(comment => (
                <Col key={comment.id}>
                    <Card className="blog-list-card">
                        <Card
                            className="blog-list-card"
                            title={
                                <Fragment>
                                    <Row>
                                        <Col xs={{ span: 24 }} md={{ span: 24 }} span={12}><span style={{ color: "white", fontWeight: "lighter" }}><>Published on: {comment.createdAt}</></span></Col>
                                        <Col xs={{ span: 24 }} md={{ span: 24 }} span={12}>
                                            <Typography.Title style={{ textAlign: 'right' }} className='base-text-color' level={4}>By: {comment.displayName}</Typography.Title>
                                        </Col>
                                    </Row>
                                </Fragment>}
                        >
                            <p>{comment.body}</p>

                        </Card>
                    </Card>
                </Col>
            ))}

            <Col>
                <Card className="blog-list-card">
                    <Card
                        className="blog-list-card"
                        title={
                            <Fragment>
                                <Row>
                                    <Col xs={{ span: 24 }} md={{ span: 24 }} span={12}><span style={{ color: "white", fontWeight: "lighter" }}>Publish Date</span></Col>
                                    <Col xs={{ span: 24 }} md={{ span: 24 }} span={12}>
                                        <Typography.Title style={{ textAlign: 'right' }} className='base-text-color' level={4}>By: Display Name</Typography.Title>
                                    </Col>
                                </Row>
                            </Fragment>}
                    >
                        <p>Comment Body</p>

                    </Card>
                </Card>
            </Col>

        </div >



        </Fragment>



    );






})