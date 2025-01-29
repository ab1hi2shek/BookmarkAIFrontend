import { configureStore } from '@reduxjs/toolkit';
import tagsReducer from '../features/tags/tagsSlice';
import bookmarksReducer from '../features/bookmarks/bookmarksSlice';
import sidebarReducer from '../features/sidebar/sidebarSlice';

export const store = configureStore({
    reducer: {
        bookmarks: bookmarksReducer,
        tags: tagsReducer,
        sidebar: sidebarReducer
    },
});

export default store;
