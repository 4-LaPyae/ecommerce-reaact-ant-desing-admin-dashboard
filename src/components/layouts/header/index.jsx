import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Flex, Layout, theme } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { toggleCollapsed } from "../../../features/collapsedSlice";
import Language from "./language";
import SwitchMode from "./switch-mode";
import Logo from "../sidebar/logo";
import Profile from "./profile";
import Notification from "./notification";
import "./index.css";

const { Header } = Layout;

// Define the AppHeader functional component
const AppHeader = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken(); // Extract colorBgContainer from the theme

    // Get the 'collapsed' state from the Redux store and the 'dispatch' function
    const collapsed = useSelector((state) => state.collapsed);
    const darkMode = useSelector((state) => state.darkMode);
    const dispatch = useDispatch();

    // Define a function to handle the collapse button click
    const handleCollapse = () => {
        dispatch(toggleCollapsed()); // Dispatch the 'toggleCollapsed' action
    };

    return (
        <Header
            style={{
                position: "sticky",
                top: 0,
                zIndex: 2,
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 0,
                background: !darkMode && colorBgContainer,
                // boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
                boxShadow: "rgba(0, 0, 0, 0.08) 0px 4px 12px",
                // background: colorBgContainer, // Set the background color
            }}
        >
            <Flex align="center">
                <Logo collapsed={collapsed} />
                {
                    // !JSON.parse(localStorage.getItem('broken')) ?
                    <Button
                        type="text"
                        icon={
                            collapsed ? (
                                <MenuUnfoldOutlined />
                            ) : (
                                <MenuFoldOutlined />
                            )
                        }
                        onClick={handleCollapse}
                        style={{
                            fontSize: "16px",
                            width: 64,
                            height: "100%",
                            borderRadius: 0,
                            color: darkMode ? "white" : "black",
                            // background: !darkMode && colorBgContainer
                        }}
                    />
                    // : <div></div>
                }
            </Flex>

            <div className="right-side-header">
                <Notification />
                <Language /> {/* Render the Language component */}
                <SwitchMode /> {/* Render the SwitchMode component */}
                <Profile />
            </div>
        </Header>
    );
};

export default AppHeader;
