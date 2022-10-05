import { Alert, Col, Form, Row, Select } from "antd";
import { useField, useFormik } from "formik";
import { Fragment } from "react";
import { capitalizeFirstLetter } from "../../..";


interface Props {
    placeholder: string;
    name: string;
    options: any;
    label?: string;
}

// interface IFormik {
//     formik: any;
// }
export default function SelectInput(props: Props) {
    const [field, meta, helpers] = useField(props.name);
    return (
        <Row>
            <Col offset={3} span={1}>
                <label style={{ color: "white" }}>{props.label} </label>
            </Col>
            <Col offset={1} span={12}>
                <Form.Item help={meta.touched && !!meta.error ? <Alert type="error" message={capitalizeFirstLetter(props.name) + ' is a required field'} style={{ padding: '0', paddingLeft: '10px' }} /> : null}>
                    <Select onChange={(value) => helpers.setValue(value)} value={field.value} options={props.options} onBlur={() => helpers.setTouched(true)} placeholder={props.placeholder} />
                </Form.Item>

            </Col>
        </Row>
    )
}