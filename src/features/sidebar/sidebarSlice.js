import { createSlice } from '@reduxjs/toolkit';

const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState: {
        isLeftSidebarOpen: false,
        isRightSidebarOpen: false,
    },
    reducers: {
        // Left sidebar
        openLeftSideBar: (state) => {
            return { ...state, isLeftSidebarOpen: true };
        },
        closeLeftSideBar: (state) => {
            return { ...state, isLeftSidebarOpen: false };
        },
        toggleLeftSideBar: (state) => {
            return { ...state, isLeftSidebarOpen: !state.isLeftSidebarOpen };
        },

        // Right sidebar
        openRightSideBar: (state) => {
            return { ...state, isRightSidebarOpen: true };
        },
        closeRightSideBar: (state) => {
            return { ...state, isRightSidebarOpen: false };
        },
        toggleRightSideBar: (state) => {
            return { ...state, isRightSidebarOpen: !state.isRightSidebarOpen };
        },
    },
});

export const {
    openLeftSideBar,
    closeLeftSideBar,
    toggleLeftSideBar,
    openRightSideBar,
    closeRightSideBar,
    toggleRightSideBar
} = sidebarSlice.actions;

export default sidebarSlice.reducer;
