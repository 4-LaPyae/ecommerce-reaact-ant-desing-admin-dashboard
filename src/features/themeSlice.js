import { createSlice } from '@reduxjs/toolkit';

const themeSlice = createSlice({
	name: 'collapsed',
	initialState: false,
	reducers: {
		toggleMode: (state) => {
			return !state;
		},
	},
});

export const { toggleMode } = themeSlice.actions

export default themeSlice.reducer
