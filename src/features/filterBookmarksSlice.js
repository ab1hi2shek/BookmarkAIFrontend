import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchBookmarksWithFilters } from "../services/bookmarkService";

// 🟢 Fetch bookmarks (all or filtered by tags)
export const fetchBookmarksByFilterThunk = createAsyncThunk(
    "filterBookmarks/fetch",
    async ({ userId, filterType }, { rejectWithValue }) => {
        try {
            return await fetchBookmarksWithFilters(userId, filterType);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const filterBookmarksSlice = createSlice({
    name: "filterBookmarks",
    initialState: {
        filteredBookmarks: null,
        status: "idle", // "loading" | "succeeded" | "failed"
        error: null,
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            // 🟢 Fetch Bookmarks
            .addCase(fetchBookmarksByFilterThunk.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchBookmarksByFilterThunk.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.filteredBookmarks = action.payload;
            })
            .addCase(fetchBookmarksByFilterThunk.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || "Failed to fetch bookmarks";
            })
    },
});

export const { } = filterBookmarksSlice.actions;
export default filterBookmarksSlice.reducer;
