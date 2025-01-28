import { configureStore } from '@reduxjs/toolkit';
import tagsReducer from '../features/tags/tagsSlice';
import bookmarksReducer from '../features/bookmarks/bookmarksSlice';

export const store = configureStore({
    reducer: {
        bookmarks: bookmarksReducer,
        tags: tagsReducer,
    },
});

export default store;
