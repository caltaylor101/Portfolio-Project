import { Button, Typography, Form as AntdForm, Input, Popover, Row, Col } from "antd";
import { Field, FieldProps, Form, Formik, useField } from "formik";
import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";
import * as Yup from 'yup';
import { Fragment } from "react";
import { Console } from "console";


export default observer(function ChatForm() {
    const { commentStore, userStore } = useStore();
    return (
        <Row>
            <Col xs={{ span: 22, offset: 1 }} sm={{ span: 22, offset: 1 }} md={{ span: 16, offset: 4 }} lg={{ span: 10, offset: 4 }}>
                {userStore.isLoggedIn
                    ?
                    <Formik
                        onSubmit={(values, { resetForm }) => commentStore.addComment(values).then(() => resetForm())}
                        initialValues={{ body: '' }}
                        validationSchema={Yup.object({
                            body: Yup.string().required()
                        })}
                    >
                        {({ isSubmitting, isValid, dirty }) => (
                            <Form className='ui form'>
                                <Field name='body'>
                                    {(props: FieldProps) => 
                                    (
                                        <Input.TextArea {...props.field} placeholder="Add comment" rows={4} />
                                    )}
                                </Field>
                                    <Button
                                            loading={isSubmitting}
                                            disabled={!isValid || !dirty}
                                            type={"primary"}
                                            htmlType={'submit'}
                                            style={{ marginTop: '10px', float: 'right' }}

                                        >Add Reply </Button>
                            </Form>

                        )}

                    </Formik>
                    :
                    <>
                        <Typography.Title level={5} className='base-text-color'>
                            Please login to post a comment
                        </Typography.Title>
                        <Popover content={
                            'Please login to post a comment.'
                        }>
                            <AntdForm disabled>
                                <Input.TextArea placeholder={"Login to post a comment"} name={"disabled"} rows={2}></Input.TextArea>
                            </AntdForm>
                        </Popover>
                    </>
                }
            </Col>
        </Row>
    )


})