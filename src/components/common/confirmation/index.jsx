import { useState } from "react";
import { Modal } from "antd";

const Confirmation = ({
    open,
    setOpen,
    modalTitle,
    isLoading,
    confirmAction,
}) => {
    const [confirmLoading, setConfirmLoading] = useState(false);

    const handleOk = () => {
        confirmAction();
        setConfirmLoading(isLoading);
        !isLoading && setOpen(false);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <Modal
            title={modalTitle}
            open={open}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            centered
        />
    );
};
export default Confirmation;
