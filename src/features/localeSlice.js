import { createSlice } from '@reduxjs/toolkit';

const localeSlice = createSlice({
	name: 'locale',
	initialState: 'en',
	reducers: {
		setLocale: (state, action) => {
			return action.payload;
		},
	},
});

export const { setLocale } = localeSlice.actions

export default localeSlice.reducer