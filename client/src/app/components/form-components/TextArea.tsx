import { Alert, Col, Form, Input, Row } from "antd";
import { useField } from "formik";
import { capitalizeFirstLetter } from "../../..";

interface Props {
    placeholder: string;
    name: string;
    rows: number;
    label?: string;

}

export default function TextArea(props: Props) {
    const [field, meta] = useField(props.name);

    return (
        <Row>
            <Col xs={0} sm={0} md={3}  />
            <Col xs={{span: 1, offset: 1}} md={{span:16}} lg={{span:2, offset:2}} xl={{span:2, offset:2}} span={1}>
                <label className="base-text-color">{props.label}</label>
            </Col>
            <Col md={2} lg={2}></Col>
            <Col xs={{span:24, offset:1}} sm={24} md={{span: 16, offset: 4}} lg={{span: 12, offset: 4}} xl={{span: 12, offset: 5}} >
                <Form.Item validateStatus={meta.touched && !!meta.error ? 'error' : 'success'} help={meta.touched && !!meta.error ? <Alert type="error" message={capitalizeFirstLetter(props.name) + ' is a required field'} style={{ padding: '0', paddingLeft: '10px' }} /> : null}>
                    <Input.TextArea {...field} {...props} />
                </Form.Item>
            </Col>
        </Row>
    )
}