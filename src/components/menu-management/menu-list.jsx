import PropTypes from "prop-types";
import ResizableAntTable from "../common/resizable-ant-table";

const MenuList = ({ data }) => {
    const columns = [
        {
            title: "Page Name",
            dataIndex: "label",
            key: "label",
            width: 1,
        },
        {
            title: "Page Directory",
            dataIndex: "path",
            key: "path",
            width: 1,
            responsive: ["md"],
        },
        {
            title: "Parent ID",
            dataIndex: "id",
            key: "id",
            width: 1,
            responsive: ["md"],
        },
        {
            title: "Child ID",
            dataIndex: "parent_id",
            key: "parent_id",
            width: 1,
            responsive: ["md"],
        },
    ];

    return (
        <ResizableAntTable
            columns={columns}
            data={data}
            style={{ marginTop: 40 }}
        />
    );
};

MenuList.propTypes = {
    data: PropTypes.array.isRequired,
};

export default MenuList;
