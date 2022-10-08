import { Alert, Col, Row } from "antd";
import { ErrorMessage, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";
import Submit from "../form-components/Submit";
import TextInput from "../form-components/TextInput";


export default observer(function LoginForm() {
    const { userStore } = useStore();
    return (
        <Formik
            initialValues={{ email: '', password: '', error: null }}
            onSubmit={(values, { setErrors }) => userStore.login(values).catch(error => setErrors({ error: 'Invalid email or password.' }))}
        >
            {({ handleSubmit, isValid, isSubmitting, dirty, errors }) => (
                <Form style={{ marginTop: '25px' }} className="ant-form ant-form-horizontal ant-form-default" onSubmit={handleSubmit} autoComplete='off'>
                    <TextInput label='Email:' name='email' placeholder="Email" />
                    <TextInput label='Password:' name='password' placeholder="Password" type="password" />
                    {errors.error &&
                    <Row>
                        <Col offset={5} span={12}>
                             <Alert type="error" message={'Invalid email or password.'} style={{ padding: '0', paddingLeft: '10px', marginBottom:'10px'}} />
                        </Col>
                    </Row>
                    }
                    <Submit handleSubmit={handleSubmit} isSubmitting={isSubmitting} dirty={dirty} isValid={isValid} />
                </Form>
            )}

        </Formik>
    )
})