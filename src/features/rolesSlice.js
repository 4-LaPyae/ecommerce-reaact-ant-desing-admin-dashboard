// rolesSlice.js

import { createSlice } from "@reduxjs/toolkit";

const rolesSlice = createSlice({
    name: "roles",
    initialState: {
        selectedRoleData: [],
        allChecked: {
            all: false,
            view: false,
            create: false,
            update: false,
            delete: false,
        },
    },
    reducers: {
        setSelectedRoleData: (state, action) => {
            state.selectedRoleData = action.payload;
        },
        setAllChecked: (state, action) => {
            state.allChecked = action.payload;
        },
        clearSelectedRoleData: (state) => {
            state.selectedRoleData = [];
        },
        clearAllChecked: (state) => {
            state.allChecked = {
                all: false,
                view: false,
                create: false,
                update: false,
                delete: false,
            };
        },
    },
});

export const {
    setSelectedRoleData,
    setAllChecked,
    clearSelectedRoleData,
    clearAllChecked,
} = rolesSlice.actions;
export default rolesSlice.reducer;
