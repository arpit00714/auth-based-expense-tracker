import { createSlice } from '@reduxjs/toolkit';

const initialAuthState = {
    isLogin: false,
    token: localStorage.getItem('token') || ''
};

const authSlice = createSlice({
    name: 'authentication',
    initialState: initialAuthState,
    reducers: {
        login(state, action) {
            state.token = action.payload
            state.isLogin = true;
        },
        logout(state) {
            state.isLogin = false;
            state.token = ''
        },

    },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;