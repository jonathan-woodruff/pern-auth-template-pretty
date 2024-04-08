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
    ssoLogin: false,
    user_email: null
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
        sso: (state) => {
            state.ssoLogin = true;
        },
        notSSO: (state) => {
            state.ssoLogin = false;
        },
        assignUser: (state, action) => {
            state.user_email = action.payload.user_email;
        }
    }
});

export const { authenticateUser, unauthenticateUser, sso, notSSO, assignUser } = authSlice.actions;

export default authSlice.reducer;