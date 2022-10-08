import { Modal, Typography } from "antd";
import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";


export default observer(function ModalContainer() {
    const { modalStore } = useStore();
    const { Paragraph } = Typography;
    return (
        <Modal open={modalStore.modal.open} onCancel={modalStore.closeModal} centered footer={null}>
                {modalStore.modal.body}
        </Modal>
    )
})