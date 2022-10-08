import { Row, Col, Button} from "antd";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { RouteLinks } from "../../../App-Routes";
import { useStore } from "../../stores/store";

interface Props {
    handleSubmit: any;
    isSubmitting: any
    dirty?: any;
    isValid?: any;
}
const routeLinks = new RouteLinks();



export default observer(function Submit(props: Props) {
    const { modalStore } = useStore();
    const navigate = useNavigate();
    if (props.isValid === null) props.isValid = true;

    return (
        <Row style={{ paddingTop: "50px" }}>
            
            <Col offset={5} xs={3} md={1} span={1}>
                <Button disabled={props.isSubmitting || !props.dirty || !props.isValid} type="primary" size="large" loading={props.isSubmitting} onClick={props.handleSubmit} htmlType='submit' >Submit</Button>
            </Col>


            <Col span={1} style={{ marginLeft: "50px" }}>
                {!modalStore.modal.open ? 
                <Button type="primary" danger={true} size="large" onClick={() => navigate(routeLinks.blogList)} >Cancel</Button>
                :
                <Button type="primary" danger={true} size="large" onClick={() => modalStore.closeModal()} >Cancel</Button>
                
            }
                
            </Col>
        </Row>
    )
})