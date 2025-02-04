import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    fetchBookmarks,
    createBookmark,
    updateBookmark,
    deleteBookmark,
} from "../../services/bookmarkService";
import { updateTagThunk, deleteTagThunk } from "../tags/tagsSlice";

// 🔹 User ID (Replace with actual authentication logic)
const USER_ID = "user-7601dd26-64ac-4327-84e2-e2d758701934";

// 🟢 Fetch bookmarks (all or filtered by tags)
export const fetchBookmarksThunk = createAsyncThunk(
    "bookmarks/fetch",
    async (selectedTags, { rejectWithValue }) => {
        try {
            return await fetchBookmarks(USER_ID, selectedTags);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// 🟢 Create a bookmark
export const createBookmarkThunk = createAsyncThunk(
    "bookmarks/create",
    async (bookmark, { rejectWithValue }) => {
        try {
            return await createBookmark(bookmark, USER_ID);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// 🟢 Update a bookmark
export const updateBookmarkThunk = createAsyncThunk(
    "bookmarks/update",
    async ({ updatedBookmark }, { rejectWithValue }) => {
        try {
            return await updateBookmark({ updatedBookmark }, USER_ID);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// 🟢 Delete a bookmark
export const deleteBookmarkThunk = createAsyncThunk(
    "bookmarks/delete",
    async (bookmarkId, { rejectWithValue }) => {
        try {
            return await deleteBookmark(bookmarkId, USER_ID);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const bookmarksSlice = createSlice({
    name: "bookmarks",
    initialState: {
        allBookmarks: [],
        selectedBookmark: null,
        status: "idle", // "loading" | "succeeded" | "failed"
        error: null,
    },
    reducers: {
        setSelectedBookmark: (state, action) => {
            state.selectedBookmark = action.payload;
        },
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
                state.allBookmarks = state.allBookmarks.map((bookmark) => {
                    console.log(bookmark.bookmarkId, action.payload.bookmarkId)
                    return bookmark.bookmarkId === action.payload.bookmarkId ? action.payload : bookmark
                });
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
                state.allBookmarks = state.allBookmarks.filter((b) => b.bookmarkId !== action.payload);
            })
            .addCase(deleteBookmarkThunk.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || "Failed to delete bookmark";
            })

            // 🟢 Update Tag (Update tag name inside bookmarks)
            .addCase(updateTagThunk.fulfilled, (state, action) => {
                const { tagId, tagName } = action.payload;
                state.allBookmarks = state.allBookmarks.map((bookmark) => ({
                    ...bookmark,
                    tags: bookmark.tags.map((tag) =>
                        tag.tagId === tagId ? { ...tag, tagName } : tag
                    )
                }));
                console.log("state.allBookmarks", state.allBookmarks)
            })

            // When a tag is deleted, update bookmarks in state.
            .addCase(deleteTagThunk.fulfilled, (state, action) => {
                const tagDeleted = action.payload;
                // Remove the tag from bookmarks
                state.allBookmarks = state.allBookmarks
                    .map((bookmark) => {
                        const updatedTags = bookmark.tags.filter((tag) => tag !== tagDeleted.tagName);
                        // If no tags left, remove the bookmark
                        if (updatedTags.length === 0) {
                            return null;
                        }
                        return {
                            ...bookmark,
                            tags: updatedTags,
                        };
                    })
                    .filter(Boolean);
            })
    },
});

export const { setSelectedBookmark } = bookmarksSlice.actions;
export default bookmarksSlice.reducer;
