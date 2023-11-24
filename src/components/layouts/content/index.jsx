import { Col, Layout, Row } from "antd";
import { Outlet } from "react-router-dom";
import AppBreadcrumb from "../breadcrumb";
import { useSelector } from "react-redux";
import defaultTheme from "../../../themes/default-theme";

const { Content } = Layout;

const AppContent = () => {
    // Define variables for margin-left, default collapse width, toggle width, and collapsed state
    let marginLeft;
    const defaultCollapse = 16;
    const toggleWidth = 80;
    const collapsed = useSelector((state) => state.collapsed);
    const breakpoint = useSelector((state) => state.breakpoint);

    // Calculate the margin-left value based on the state
    const expand =
        parseInt(defaultTheme.components.Sider.width) + defaultCollapse;
    const collapse =
        expand - parseInt(defaultTheme.components.Sider.width) + toggleWidth;

    if (!breakpoint) {
        marginLeft = !collapsed ? expand : collapse;
    } else {
        marginLeft = defaultCollapse;
    }

    return (
        <Content
            style={{
                margin: "0 16px",
                marginLeft,
                transition: "margin-left 0.2s", // Add a transition for margin-left
            }}
        >
            <AppBreadcrumb />

            {/* Container for the main content */}
            <Row
                style={{
                    marginBottom: 20,
                }}
            >
                <Col span={24}>
                    <Outlet /> {/* Render the main content */}
                </Col>
            </Row>
        </Content>
    );
};

export default AppContent;
