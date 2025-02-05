import { configureStore } from '@reduxjs/toolkit';
import tagsReducer from '../features/tags/tagsSlice';
import bookmarksReducer from '../features/bookmarks/bookmarksSlice';
import sidebarReducer from '../features/sidebar/sidebarSlice';
import userReducer from "../features/users/userSlice";

export const store = configureStore({
    reducer: {
        bookmarks: bookmarksReducer,
        tags: tagsReducer,
        sidebar: sidebarReducer,
        user: userReducer,
    },
});

export default store;
