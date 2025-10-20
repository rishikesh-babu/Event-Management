import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        userData: {},
    },
    reducers: {
        saveUserData: (state, action) => {
            state.userData = action.payload
        },
        clearUserData: (state) => {
            state.userData = {}
        },

    },
});

export const { saveUserData, clearUserData } = userSlice.actions;
const userReducer = userSlice.reducer;
export default userReducer
