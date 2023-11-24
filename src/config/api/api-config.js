// Define an API configuration object
export const apiConfig = {
	baseUrl: import.meta.env.VITE_API_BASE_URL, // Base URL for the API obtained from environment variables
	prepareHeaders: async (headers) => {
		const token = await JSON.parse(localStorage.getItem('reduxState'))?.user
			?.token;
		const language = await localStorage.getItem('i18nextLng');

		if (token) {
			headers.set('Authorization', `Bearer ${token}`);
			headers.set('Cache-Control', 'no-cache');
			headers.set('Accept-Language', language);
		}
		return headers;
	},
};
