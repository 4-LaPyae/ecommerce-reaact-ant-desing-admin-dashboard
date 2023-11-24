import { useSpring, animated } from "react-spring";
import PropTypes from "prop-types";
import { theme } from "antd";

const AnimatedLayout = ({ children }) => {
    const contentAnimation = useSpring({
        from: { opacity: 0, transform: "translateY(50px)" },
        to: { opacity: 1, transform: "translateY(0)" },
    });

    // Get the color for the content container from the theme
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <animated.div
            style={{
                ...contentAnimation,
                background: colorBgContainer,
                padding: 24,
                // boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                boxShadow: "rgba(0, 0, 0, 0.08) 0px 4px 12px",
                borderRadius: 5,
            }}
        >
            {children}
        </animated.div>
    );
};

AnimatedLayout.propTypes = {
    children: PropTypes.element,
};

export default AnimatedLayout;
