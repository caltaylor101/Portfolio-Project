import { Alert, Col, Form, Input, Row } from "antd";
import { useField } from "formik";
import { capitalizeFirstLetter } from "../../..";

interface Props {
    placeholder: string;
    name: string;
    label?: string;

}


export default function TextInput(props: Props) {
    const [field, meta] = useField(props.name);
    return (
        <Row>
            <Col offset={3} span={1}>
                <label style={{ color: "white" }}>{props.label} </label>
            </Col>
            <Col offset={1} span={12}>
                <Form.Item validateStatus={meta.touched && !!meta.error ? 'error' : 'success'} help={meta.touched && !!meta.error ? <Alert type="error" message={capitalizeFirstLetter(props.name) + ' is a required field'} style={{ padding: '0', paddingLeft: '10px' }} /> : null}>
                    <Input {...field} {...props}  />
                </Form.Item>
            </Col>
        </Row>

    )
}