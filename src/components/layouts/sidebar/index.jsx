import { useEffect, useState } from "react";
import { Layout, Menu } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { toggleCollapsed } from "../../../features/collapsedSlice";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import formatRoutes from "../../../config/routes/format-routes";
import defaultTheme from "../../../themes/default-theme";
import "./index.css";
import { toggleBreakpoint } from "../../../features/responsiveSlice";
import { styles } from "./styles";
import { selectMenu } from "../../../features/userSlice";

const { Sider } = Layout;

// Define the AppSidebar functional component
const AppSidebar = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const collapsed = useSelector((state) => state.collapsed);
    const { t } = useTranslation("sidebar"); // Initialize translation functions
    const menus = useSelector(selectMenu);
    const routes = formatRoutes(t, menus || []); // Format and retrieve route data
    const isDarkMode = useSelector((state) => state.darkMode);
    const [collapseWidth, setcollapseWidth] = useState(80); // Set the default collapsed width

    const mode = isDarkMode ? "dark" : "light"; // Determine the theme mode (dark or light)

    const pathSegments = location.pathname.split("/");
    const selectedKey = pathSegments[pathSegments.length - 1];
    const [openKeys, setOpenKeys] = useState([]); // Store the open menu keys

    // Update open keys when the location or collapsed state changes
    useEffect(() => {
        const pathSegments = location.pathname.split("/").filter(Boolean);
        setOpenKeys(pathSegments.slice(0, pathSegments.length - 1));
    }, [location.pathname, collapsed]);

    // Handle the collapse trigger
    const handleCollapse = () => {
        dispatch(toggleCollapsed());
    };

    // Handle the sidebar breakpoint
    const handleBreakPoint = (broken) => {
        dispatch(toggleBreakpoint());
        if (!broken) {
            setcollapseWidth(80); // Set the width when not broken
        } else {
            setcollapseWidth(0); // Set the width when broken (collapsed)
        }
    };

    // Handle submenu open state change
    const handleOpenChange = (keys) => {
        setOpenKeys(keys); // Update the open keys state
    };

    return (
        <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            onCollapse={handleCollapse}
            theme={mode}
            width={defaultTheme.components.Sider.width}
            breakpoint="md"
            collapsedWidth={collapseWidth}
            onBreakpoint={handleBreakPoint}
            style={styles.sider}
        >
            <Menu
                openKeys={openKeys}
                defaultSelectedKeys={[selectedKey]}
                selectedKeys={[selectedKey]}
                theme={mode}
                mode="inline"
                items={routes}
                forceSubMenuRender={true}
                onOpenChange={handleOpenChange}
            />
        </Sider>
    );
};

export default AppSidebar;
