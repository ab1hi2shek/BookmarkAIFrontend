import { configureStore } from '@reduxjs/toolkit';
import tagsReducer from '../features/tags/tagsSlice';
import bookmarksReducer from '../features/bookmarks/bookmarksSlice';
import sidebarReducer from '../features/sidebar/sidebarSlice';
import userReducer from "../features/users/userSlice";
import directoriesReducer from "../features/directory/directorySlice";

export const store = configureStore({
    reducer: {
        bookmarks: bookmarksReducer,
        tags: tagsReducer,
        sidebar: sidebarReducer,
        user: userReducer,
        directories: directoriesReducer
    },
});

export default store;
