import { Alert, Col, Form, Input, Row } from "antd";
import { Gutter } from "antd/lib/grid/row";
import { useField } from "formik";
import { capitalizeFirstLetter } from "../../..";
import './form.css';

interface Props {
    placeholder: string;
    name: string;
    label?: string;
    type?: string;
    gutterV?: Gutter;
    gutterH?: Gutter;

}


export default function TextInput(props: Props) {
    const [field, meta] = useField(props.name);
    function getWindowDimensions() {
        const { innerWidth: width, innerHeight: height } = window;
        return {
          width,
          height
        };
      }
    
    const gutter = ([props.gutterV, props.gutterH] as Gutter);
    
    return (
        <Row gutter={gutter}>
            <Col xs={0} sm={0} md={3}></Col>
            <Col xs={{span: 3, offset: 1}} md={{span: 3, offset: 1}} lg={{span:2, offset:2}} xl={{span:2, offset:2}} sm={3}>
                <label style={{ color: "white" }}>{props.label} </label>
            </Col>
            <Col md={3} lg={2}></Col>
            <Col xs={{span: 24, offset: 1}} sm={24} md={{span: 16, offset: 4}} lg={{span: 12, offset: 4}} xl={{span: 12, offset: 5}} >
                <Form.Item validateStatus={meta.touched && !!meta.error ? 'error' : 'success'} help={meta.touched && !!meta.error ? <Alert type="error" message={capitalizeFirstLetter(props.name) + ' is a required field'} style={{ padding: '0', paddingLeft: '10px' }} /> : null}>
                    <Input {...field} {...props}  />
                </Form.Item>
            </Col>
        </Row>

    )
}