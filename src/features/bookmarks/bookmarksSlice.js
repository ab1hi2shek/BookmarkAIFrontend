import { createSlice } from '@reduxjs/toolkit';
import { getBookmarksList } from '../../data/bookmarkData';

const bookmarksSlice = createSlice({
    name: 'bookmarks',
    initialState: {
        allBookmarks: getBookmarksList(),
        selectedBookmark: null
    },
    reducers: {
        addBookmark: (state, action) => {
            state.push(action.payload);
        },
        editBookmark: (state, action) => {
            let updatedBookmark = action.payload.updatedBookmark;
            console.log("updatedBookmark = ", updatedBookmark);
            state.allBookmarks = state.allBookmarks.map(bookmark => {
                if (bookmark.id === updatedBookmark.id) {
                    console.log("matched for, ", bookmark.id)
                    return updatedBookmark;
                }
                return bookmark;
            });
            console.log("state.allBookmarks; = ", updatedBookmark);
            console.log("state.allBookmarks = ", state.allBookmarks);
        },
        deleteBookmark: (state, action) => {
            state.allBookmarks = state.allBookmarks.filter((b) => b.id !== action.payload);
        },

        //selected bookmark reducers.
        updateSelectedBookmark: (state, action) => {
            state.selectedBookmark = action.payload;
            console.log("selected bookmark = ", state.selectedBookmark)
        }
    },
});

export const { addBookmark, editBookmark, deleteBookmark, updateSelectedBookmark } = bookmarksSlice.actions;
export default bookmarksSlice.reducer;
