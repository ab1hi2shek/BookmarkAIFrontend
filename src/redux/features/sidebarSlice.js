import { createSlice } from '@reduxjs/toolkit';

const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState: {
        isRightSidebarOpen: false,
        bookmarkToEdit: null
    },
    reducers: {
        openRightSideBar: (state, action) => {
            state.isRightSidebarOpen = true;
            state.bookmarkToEdit = action.payload;
        },
        closeRightSideBar: (state) => {
            state.isRightSidebarOpen = false;
            state.bookmarkToEdit = null;
        }
    },
});

export const { openRightSideBar, closeRightSideBar } = sidebarSlice.actions;

export default sidebarSlice.reducer;
