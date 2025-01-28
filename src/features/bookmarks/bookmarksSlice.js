import { createSlice } from '@reduxjs/toolkit';
import { getBookmarksList } from '../../data/bookmarkData';

const bookmarksSlice = createSlice({
    name: 'bookmarks',
    initialState: {
        allBookmarks: getBookmarksList()
    },
    reducers: {
        addBookmark: (state, action) => {
            state.push(action.payload);
        },
        editBookmark: (state, action) => {
            return state.allBookmarks; //TODO: Implement
        },
        deleteBookmark: (state, action) => {
            console.log(action.payload);
            console.log(JSON.stringify(state.allBookmarks));
            state.allBookmarks = state.allBookmarks.filter((b) => b.id !== action.payload);
            console.log(JSON.stringify(state.allBookmarks));
        },
    },
});

export const { addBookmark, editBookmark, deleteBookmark } = bookmarksSlice.actions;
export default bookmarksSlice.reducer;
