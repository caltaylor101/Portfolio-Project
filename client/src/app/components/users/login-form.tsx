import { Alert, Button, Col, Row, Typography } from "antd";
import { ErrorMessage, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Fragment } from "react";
import { useStore } from "../../stores/store";
import Submit from "../form-components/Submit";
import TextInput from "../form-components/TextInput";
import RegisterForm from "./register-form";

interface Props {
    isBackRedirect: boolean;
}

export default observer(function LoginForm({ isBackRedirect }: Props) {
    const { userStore, modalStore } = useStore();
    const { Title} = Typography;
    return (
        <Fragment>
            <Typography>
                <Title style={{color: 'white', textAlign: 'center'}}>Login {isBackRedirect && <Fragment> or Register Now:  <Button type='primary' className='success-btn' onClick={() => modalStore.openModal(<RegisterForm />)} >Register</Button></Fragment>}</Title>
            </Typography>
            <Formik
                initialValues={{ email: '', password: '', error: null }}
                onSubmit={(values, { setErrors }) => userStore.login(values, isBackRedirect).catch(error => setErrors({ error: 'Invalid email or password.' }))}
            >
                {({ handleSubmit, isValid, isSubmitting, dirty, errors }) => (
                    <Form style={{ marginTop: '50px' }} className="ant-form ant-form-horizontal ant-form-default" onSubmit={handleSubmit} autoComplete='off'>
                        <TextInput gutterV={32} gutterH={0} label='Email:' name='email' placeholder="Email" />
                        <TextInput gutterV={32} gutterH={0} label='Password:' name='password' placeholder="Password" type="password" />
                        {errors.error &&
                            <Row>
                                <Col offset={6} span={12}>
                                    <Alert type="error" message={errors.error} style={{ padding: '0', paddingLeft: '10px', marginBottom: '10px' }} />
                                </Col>
                            </Row>
                        }
                            <Submit handleSubmit={handleSubmit} isSubmitting={isSubmitting} dirty={dirty} isValid={isValid} />
                    </Form>
                )}

            </Formik>
            
            
        </Fragment>

            )
})