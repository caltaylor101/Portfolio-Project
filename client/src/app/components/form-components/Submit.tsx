import { Row, Col, Button } from "antd";
import { useField } from "formik";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { RouteLinks } from "../../../App-Routes";
import { useStore } from "../../stores/store";

interface Props {
    handleSubmit: any;
    isSubmitting: any
    dirty: any;
    isValid: any;
}
const routeLinks = new RouteLinks();



export default function Submit(props: Props) {
    const { blogStore } = useStore();
    const navigate = useNavigate();


    return (
        <Row style={{ paddingTop: "50px" }}>
            <Col offset={5} span={1}>
                <Button disabled={props.isSubmitting || !props.dirty || !props.isValid} type="primary" size="large" loading={props.isSubmitting} onClick={props.handleSubmit} htmlType='submit' >Submit</Button>
            </Col>


            <Col span={1} style={{ marginLeft: "50px" }}>
                <Button type="primary" danger={true} size="large" onClick={() => navigate(routeLinks.blogList)} >Cancel</Button>
            </Col>
        </Row>
    )
}