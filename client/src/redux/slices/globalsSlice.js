import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    clientURL: 'http://localhost:3000',
    serverURL: 'http://localhost:8000'
};

export const globalsSlice = createSlice({
    name: 'glob',
    initialState,
    reducers: { }
});

export default globalsSlice.reducer;