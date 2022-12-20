import { Alert, Col, Form, Row, Select } from "antd";
import { useField } from "formik";
import { capitalizeFirstLetter } from "../../..";


interface Props {
    placeholder: string;
    name: string;
    options: any;
    label?: string;
}

export default function SelectInput(props: Props) {
    const [field, meta, helpers] = useField(props.name);
    return (
        <Row>
            <Col xs={0} sm={0} md={3}  />
            <Col xs={{span:1, offset:1}} md={{span:2}} lg={{span:2, offset:2}} xl={{span:2, offset:2}} span={1}>
                <label style={{ color: "white" }}>{props.label} </label>
            </Col>
            <Col md={2} lg={4}></Col>
            <Col xs={{span: 24, offset: 1}} sm={24} md={{span: 16, offset: 4}} lg={{span: 12, offset: 4}} xl={{span: 12, offset: 5}} >
                <Form.Item help={meta.touched && !!meta.error ? <Alert type="error" message={capitalizeFirstLetter(props.name) + ' is a required field'} style={{ padding: '0', paddingLeft: '10px' }} /> : null}>
                    <Select onChange={(value) => helpers.setValue(value)} value={field.value} options={props.options} onBlur={() => helpers.setTouched(true)} placeholder={props.placeholder} />
                </Form.Item>
            </Col>
        </Row>
    )
}