import { createSlice } from '@reduxjs/toolkit'
import { current } from '@reduxjs/toolkit'

const initialState = {
	updatePermission: {
		name: '',
		group: '',
	},
}

const updateSlice = createSlice({
	name: 'update',
	initialState,
	reducers: {
		setUpdateData: (state, { payload }) => {
			console.log(payload)

			state.updatePermission = {
				name: payload.permission,
				group: payload.group,
				key: payload.key,
			}
			console.log(current(state))
		},
		clearUpdateData: (state) => {
			// state?.updatePermission?.name = ''
			// state?.updatePermission?.group = ''
			delete state.updatePermission
		},
	},
})

export const { setUpdateData, clearUpdateData } = updateSlice.actions
export const selectUpdatePermission = (state) => state.update

export default updateSlice.reducer
