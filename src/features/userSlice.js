import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	user: null, // Initial user state
	token: null, // Initial token state
	menus: [], // Initial menu routes  state
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload.user
			state.token = action.payload.token
			state.menus = action.payload.menus
		},
		clearUser: (state) => {
			state.user = null
			state.token = null
			state.menus = []
		},
		clearExceptMenus: (state) => {
			state.user = null
			state.token = null
		},
	},
})

export const { setUser, clearUser, clearExceptMenus } = userSlice.actions

export const selectUser = (state) => state.user.user // Selector to access the user data
export const selectToken = (state) => state.user.token // Selector to access the token
export const selectMenu = (state) => state.user.menus // Selector to access the menu routes

export default userSlice.reducer
