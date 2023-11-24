export const setLocalStorage = (key, data) => {
    return new Promise((resolve) => {
        localStorage.setItem(key, JSON.stringify(data));
        resolve(data);
    });
};

export const getLocalStorage = (key) => {
    return new Promise((resolve) => {
        resolve(JSON.parse(localStorage.getItem(key)));
    });
};

export const clearLocalStorage = (key) => {
    return localStorage.removeItem(key);
};

// Function to concatenate base URL with image paths
export const getImageURL = (path) => {
    const baseURL = import.meta.env.VITE_AWS_BASE_URL;
    return baseURL + "/" + path;
};

export const scrollAction = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
};
