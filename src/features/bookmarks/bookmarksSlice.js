import { createSlice } from '@reduxjs/toolkit';
import { getBookmarksList } from '../../data/bookmarkData';

const bookmarksSlice = createSlice({
    name: 'bookmarks',
    initialState: getBookmarksList(),
    reducers: {
        addBookmark: (state, action) => {
            state.push(action.payload);
        },
        editBookmark: (state, action) => {
            const index = state.findIndex((b) => b.id === action.payload.id);
            if (index !== -1) state[index] = action.payload;
        },
        deleteBookmark: (state, action) => {
            return state.filter((b) => b.id !== action.payload);
        },
    },
});

export const { addBookmark, editBookmark, deleteBookmark } = bookmarksSlice.actions;
export default bookmarksSlice.reducer;
