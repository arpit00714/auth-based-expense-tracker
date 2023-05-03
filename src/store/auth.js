import { createSlice } from '@reduxjs/toolkit';

const initialAuthState = {
    isLogin: false,
    user: JSON.parse(localStorage.getItem('user')) || null,
};

const authSlice = createSlice({
    name: 'authentication',
    initialState: initialAuthState,
    reducers: {
        login(state, action) {
            state.user = action.payload
            state.isLogin = true;
            localStorage.setItem('user',JSON.stringify(action.payload))
        },
        logout(state) {
            state.isLogin = false;
            state.token = ''
            localStorage.removeItem('user')
        },

    },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;