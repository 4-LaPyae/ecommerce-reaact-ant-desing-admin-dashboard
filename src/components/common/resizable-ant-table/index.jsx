import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Table } from "antd";
import { Resizable } from "react-resizable";
import "./index.css";

// Component for resizable table header cell
const ResizableTitle = ({ onResize, width, ...restProps }) => {
    // If width is not defined, it's not resizable
    if (!width) {
        return <th {...restProps} />;
    }

    return (
        <Resizable
            width={width}
            height={0}
            handle={
                <span
                    className="react-resizable-handle"
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                />
            }
            onResize={onResize}
            draggableOpts={{ enableUserSelectHack: false }}
        >
            <th {...restProps} />
        </Resizable>
    );
};

// Main ResizableAntTable component
const ResizableAntTable = (props) => {
    // State to manage column widths
    const [columns, setColumns] = useState(props.columns);

    // Effect to update columns when props.columns change
    useEffect(() => {
        // Update columns with a minimum width based on content
        const updatedColumns = columns.map((col) => ({
            ...col,
            width: Math.max(getColumnMinWidth(col.title), col.width || 0),
        }));
        setColumns(updatedColumns);
    }, [props.columns]);

    // Handle column resize
    const handleResize =
        (index) =>
        (e, { size }) => {
            setColumns((prevColumns) => {
                const nextColumns = [...prevColumns];
                nextColumns[index] = {
                    ...nextColumns[index],
                    width: size.width,
                };
                return nextColumns;
            });
        };

    // Get the minimum width for a column based on header content
    const getColumnMinWidth = (headerText) => {
        const dummyElement = document.createElement("div");
        dummyElement.style.display = "inline-block";
        dummyElement.style.visibility = "hidden";
        dummyElement.textContent = headerText;
        document.body.appendChild(dummyElement);
        const width = dummyElement.offsetWidth;
        document.body.removeChild(dummyElement);
        return width + 32; // Add some padding to the minimum width
    };

    // Prepare columns for the Ant Design Table
    const resizableColumns = columns.map((col, index) => ({
        ...col,
        onHeaderCell: (column) => ({
            width: column.width,
            onResize: handleResize(index),
        }),
    }));

    return (
        <Table
            bordered
            columns={resizableColumns}
            dataSource={props.data}
            components={{
                header: {
                    cell: ResizableTitle,
                },
            }}
            size={props.size || "small"}
            style={{ ...props.style }}
            scroll={{ x: "max-content" }}
        />
    );
};

// PropTypes for the ResizableAntTable component
ResizableAntTable.propTypes = {
    columns: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
    size: PropTypes.string,
    style: PropTypes.object,
};

// PropTypes for the ResizableTitle component
ResizableTitle.propTypes = {
    onResize: PropTypes.func,
    width: PropTypes.number,
};

export default ResizableAntTable;
