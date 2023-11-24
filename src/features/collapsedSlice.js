import { createSlice } from '@reduxjs/toolkit';

const collapsedSlice = createSlice({
	name: 'collapsed',
	initialState: false,
	reducers: {
		toggleCollapsed: (state) => {
			return !state;
		},
	},
});

export const { toggleCollapsed } = collapsedSlice.actions

export default collapsedSlice.reducer
