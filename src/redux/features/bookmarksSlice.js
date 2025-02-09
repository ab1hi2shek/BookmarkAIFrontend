import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    fetchBookmarks,
    createBookmark,
    updateBookmark,
    deleteBookmark,
    togglefavoriteBookmark
} from "../services/bookmarkService";
import { updateTagThunk, deleteTagThunk } from "./tagsSlice";

// 🟢 Fetch all bookmarks
export const fetchBookmarksThunk = createAsyncThunk(
    "bookmarks/fetch",
    async ({ userId }, { rejectWithValue }) => {
        try {
            return await fetchBookmarks(userId);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// 🟢 Set bookmark to favorite
export const toggleFavoriteBookmarkThunk = createAsyncThunk(
    "bookmarks/favorite",
    async ({ userId, bookmarkId }, { rejectWithValue }) => {
        try {
            return await togglefavoriteBookmark(bookmarkId, userId);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// 🟢 Create a bookmark
export const createBookmarkThunk = createAsyncThunk(
    "bookmarks/create",
    async ({ userId, bookmark }, { rejectWithValue }) => {
        try {
            return await createBookmark(bookmark, userId);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// 🟢 Update a bookmark
export const updateBookmarkThunk = createAsyncThunk(
    "bookmarks/update",
    async ({ userId, updatedBookmark }, { rejectWithValue }) => {
        try {
            return await updateBookmark({ updatedBookmark }, userId);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// 🟢 Delete a bookmark
export const deleteBookmarkThunk = createAsyncThunk(
    "bookmarks/delete",
    async ({ userId, bookmarkId }, { rejectWithValue }) => {
        try {
            return await deleteBookmark(bookmarkId, userId);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const bookmarksSlice = createSlice({
    name: "bookmarks",
    initialState: {
        allBookmarks: [],
        status: "idle", // "loading" | "succeeded" | "failed"
        error: null,
    },
    reducers: {
        // 🟢 Reset bookmarks state on logout
        resetBookmarksState: (state) => {
            state.allBookmarks = [];
            state.status = "idle"; // Reset status to ensure refetch on next login
            state.error = null;
        },
        updateAllBookmarks: (state, action) => {
            state.allBookmarks = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            // 🟢 Fetch Bookmarks
            .addCase(fetchBookmarksThunk.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchBookmarksThunk.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.allBookmarks = action.payload;
            })
            .addCase(fetchBookmarksThunk.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || "Failed to fetch bookmarks";
            })

            // 🟢 Create Bookmark
            .addCase(createBookmarkThunk.pending, (state) => {
                state.status = "loading";
            })
            .addCase(createBookmarkThunk.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.allBookmarks.push(action.payload);
            })
            .addCase(createBookmarkThunk.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || "Failed to create bookmark";
            })

            // 🟢 Update Bookmark
            .addCase(updateBookmarkThunk.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updateBookmarkThunk.fulfilled, (state, action) => {
                state.status = "succeeded";
            })
            .addCase(updateBookmarkThunk.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || "Failed to update bookmark";
            })

            // 🟢 Delete Bookmark
            .addCase(deleteBookmarkThunk.pending, (state) => {
                state.status = "loading";
            })
            .addCase(deleteBookmarkThunk.fulfilled, (state, action) => {
                state.status = "succeeded";
            })
            .addCase(deleteBookmarkThunk.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || "Failed to delete bookmark";
            })

            // 🟢 favorite Bookmark
            .addCase(toggleFavoriteBookmarkThunk.fulfilled, (state, action) => {
                state.status = "succeeded";
            })
    },
});

export const { resetBookmarksState, updateAllBookmarks } = bookmarksSlice.actions;
export default bookmarksSlice.reducer;
