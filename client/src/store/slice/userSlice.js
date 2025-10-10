import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        id: null,
        name: null,
        isAdmin: false,
        isLoggedIn: false,
    },
    reducers: {
        saveUserData: (state, action) => {
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.isAdmin = action.payload.isAdmin || false;
            state.isLoggedIn = true;
        },
        clearUserData: (state) => {
            state.id = null;
            state.name = null;
            state.isAdmin = false;
            state.isLoggedIn = false;
        },

    },
});

export const { saveUserData, clearUserData } = userSlice.actions;
const userReducer = userSlice.reducer;
export default userReducer
