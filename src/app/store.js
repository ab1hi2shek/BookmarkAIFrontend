import { configureStore } from '@reduxjs/toolkit';
import tagsReducer from '../features/tagsSlice';
import bookmarksReducer from '../features/bookmarksSlice';
import sidebarReducer from '../features/sidebarSlice';
import userReducer from "../features/userSlice";
import directoriesReducer from "../features/directorySlice";
import filterBookmarksReducer from "../features/filterBookmarksSlice";

export const store = configureStore({
    reducer: {
        bookmarks: bookmarksReducer,
        tags: tagsReducer,
        sidebar: sidebarReducer,
        user: userReducer,
        directories: directoriesReducer,
        filterBookmarks: filterBookmarksReducer
    },
});

export default store;
