import { configureStore } from '@reduxjs/toolkit';
import tagsReducer from '../redux/features/tagsSlice';
import bookmarksReducer from '../redux/features/bookmarksSlice';
import sidebarReducer from '../redux/features/sidebarSlice';
import userReducer from "../redux/features/userSlice";
import directoriesReducer from "../redux/features/directorySlice";
import filterBookmarksReducer from "../redux/features/filterBookmarksSlice";
import tagActionsMiddleware from "../redux/middlewares/tagActionsListener";
import bookmarkActionsMiddleware from '../redux/middlewares/bookmarkActionsListener';

export const store = configureStore({
    reducer: {
        bookmarks: bookmarksReducer,
        tags: tagsReducer,
        sidebar: sidebarReducer,
        user: userReducer,
        directories: directoriesReducer,
        filterBookmarks: filterBookmarksReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(tagActionsMiddleware.middleware)
            .concat(bookmarkActionsMiddleware.middleware),
});

export default store;
