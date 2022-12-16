import { Button } from "antd";
import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Fragment } from "react";
import { useStore } from "../../stores/store";
import TextArea from "../form-components/TextArea";


export default observer(function ChatForm() {
    const { commentStore } = useStore();


    return (
        <Fragment>
            <Formik
                onSubmit={(values, {resetForm}) => commentStore.addComment(values).then(() => resetForm())}
                initialValues = {{body: ''}}
            >
                {({isSubmitting, isValid}) => (
                    <Form className='ui form'>
                        <TextArea placeholder="Add comment" name='body' rows={2} />
                        <Button
                            loading={isSubmitting}
                            disabled={isSubmitting || !isValid}
                            type={"primary"}
                            htmlType={'submit'}
                        >Add Reply </Button>
                    </Form>
                )}
                
            </Formik>
            
        </Fragment>
    )


})