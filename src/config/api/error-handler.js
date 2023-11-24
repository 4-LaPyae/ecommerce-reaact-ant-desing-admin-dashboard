import { isRejectedWithValue } from "@reduxjs/toolkit";
import { clearExceptMenus } from "../../features/userSlice";
import { message } from "antd";

/**
 * Middleware to handle rejected RTK query actions, show an error message, and redirect to login.
 * @param {object} dispatch - Redux dispatch function
 */
export const errorHandler =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        if (isRejectedWithValue(action)) {
            const error = action.payload;

            if (!navigator.onLine) {
                // Handle network error
                console.error("Network error: The device is offline");

                // Show a message or dispatch an action for network errors
                message.open({
                    key: "updatable",
                    type: "error",
                    content:
                        "Network error. Please check your internet connection.",
                });
            } else if (!error.response) {
                // Handle backend server connection error
                console.error(
                    "Backend server connection error:",
                    error.message,
                );

                // Show a message or dispatch an action for backend server connection errors
                message.open({
                    key: "updatable",
                    type: "error",
                    content:
                        "Backend server connection error. Please try again later.",
                });
            } else {
                // Handle other errors (4xx, 5xx, etc.) as you were doing before
                // Set the initial countdown value
                let countdown = 5;

                // Create an interval to update the message and countdown
                const countdownInterval = setInterval(() => {
                    message.open({
                        key: "updatable",
                        type: "error",
                        content: `${
                            error.data.message
                        }. Automatically redirecting to Login in ${countdown} second${
                            countdown === 1 ? "" : "s"
                        }`,
                    });

                    if (countdown === 0) {
                        clearInterval(countdownInterval);
                        // Perform the automatic redirection to the login page
                        window.location.href = "/login";
                    } else {
                        countdown--;
                    }
                }, 1000); // Update the countdown every second

                // Dispatch the clearUser action to log out the user
                dispatch(clearExceptMenus());
            }
        }

        return next(action);
    };
