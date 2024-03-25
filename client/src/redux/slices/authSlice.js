import { createSlice } from '@reduxjs/toolkit';

const userAuthFromLocalStorage = () => {
    const isAuth = localStorage.getItem('isAuth');
    if (isAuth && JSON.parse(isAuth) === true) {
        return true;
    }
    return false;
};

const initialState = {
    isAuth: userAuthFromLocalStorage(),
    ssoLogin: false
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authenticateUser: (state) => {
            state.isAuth = true;
        },
        unauthenticateUser: (state) => {
            state.isAuth = false;
        },
        setSSO: (state) => {
            state.ssoLogin = true;
        },
        setNotSSO: (state) => {
            state.ssoLogin = false;
        }
    }
});

export const { authenticateUser, unauthenticateUser, setSSO, setNotSSO } = authSlice.actions;

export default authSlice.reducer;