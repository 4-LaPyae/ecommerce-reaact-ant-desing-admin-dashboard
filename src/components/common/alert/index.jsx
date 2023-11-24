import PropTypes from "prop-types";
import { Alert } from "antd";

const AppAlert = ({ msg, status, onClose }) => {
    return (
        <Alert
            message={msg}
            type={status ? "success" : "error"}
            closable
            onClose={onClose}
            style={{ marginBottom: 30 }}
        />
    );
};

AppAlert.propTypes = {
    msg: PropTypes.string.isRequired,
    status: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default AppAlert;
