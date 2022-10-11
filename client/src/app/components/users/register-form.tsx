import { Alert, Col, Row, Typography } from "antd";
import { ErrorMessage, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Fragment } from "react";
import { useStore } from "../../stores/store";
import Submit from "../form-components/Submit";
import TextInput from "../form-components/TextInput";
import * as Yup from 'yup';
import ValidationErrors from "../../errors/ValidationErrors";


export default observer(function RegisterForm() {
    const { userStore } = useStore();
    const { Title } = Typography;
    return (
        <Fragment>
            <Typography>
                <Title style={{ color: 'white', textAlign: 'center' }}>Register</Title>
            </Typography>
            <Formik
                initialValues={{ displayName: '', username: '', email: '', password: '', error: null }}
                onSubmit={(values, { setErrors }) => userStore.register(values).catch(error => setErrors({ error: error }))}
                validationSchema={
                    Yup.object({
                    displayName: Yup.string().required(),
                    username: Yup.string().required(),
                    email: Yup.string().required().email(),
                    password: Yup.string().required(),
                })}
            >
                {({ handleSubmit, isValid, isSubmitting, dirty, errors }) => (
                    <Form className="ant-form ant-form-horizontal ant-form-default" onSubmit={handleSubmit} autoComplete='off'>
                        <ErrorMessage name='error' render={() =>
                            <ValidationErrors errors={errors.error} />
                        }
                        />
                        <TextInput gutterV={32} gutterH={0} label='Display Name:' name='displayName' placeholder="Display Name" />
                        <TextInput gutterV={32} gutterH={0} label='Username:' name='username' placeholder="Username" />
                        <TextInput  gutterV={32} gutterH={0} label='Email:' name='email' placeholder="Email" />
                        <TextInput  gutterV={32} gutterH={0}label='Password:' name='password' placeholder="Password" type="password" />
                        
                        <Submit handleSubmit={handleSubmit} isSubmitting={isSubmitting} dirty={dirty} isValid={isValid} />
                    </Form>
                )}

            </Formik>
        </Fragment>

    )
})