import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    fetchBookmarks,
    createBookmark,
    updateBookmark,
    deleteBookmark,
    togglefavoriteBookmark
} from "../../services/bookmarkService";
import { updateTagThunk, deleteTagThunk } from "../tags/tagsSlice";
import { auth } from "../../firebaseConfig";

// 🔹 User ID (Replace with actual authentication logic)
const getUserId = () => auth.currentUser?.uid || null;

// 🟢 Fetch bookmarks (all or filtered by tags)
export const fetchBookmarksThunk = createAsyncThunk(
    "bookmarks/fetch",
    async (selectedTags, { rejectWithValue }) => {
        try {
            const tt = getUserId();
            console.log("getUserId()", getUserId())
            return await fetchBookmarks(getUserId(), selectedTags);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// 🟢 Set bookmark to favorite
export const toggleFavoriteBookmarkThunk = createAsyncThunk(
    "bookmarks/favorite",
    async (bookmarkId, { rejectWithValue }) => {
        try {
            return await togglefavoriteBookmark(bookmarkId, getUserId());
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
            return await createBookmark(bookmark, getUserId());
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
            return await updateBookmark({ updatedBookmark }, getUserId());
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
            return await deleteBookmark(bookmarkId, getUserId());
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const filterBookmarksFunction = (bookmarks, filterBy) => {
    if (filterBy === "favorite") {
        return bookmarks.filter((b) => b.isFavorite);
    } else if (filterBy === "with_notes") {
        return bookmarks.filter((b) => b.notes && b.notes.trim() !== "");
    } else if (filterBy === "without_tags") {
        return bookmarks.filter((b) => !b.tags || b.tags.length === 0)
    }
    return bookmarks;
};

const bookmarksSlice = createSlice({
    name: "bookmarks",
    initialState: {
        allBookmarks: [],
        filteredBookmarks: [],
        useFiltered: "none",
        selectedBookmark: null,
        status: "idle", // "loading" | "succeeded" | "failed"
        error: null,
    },
    reducers: {
        setSelectedBookmark: (state, action) => {
            state.selectedBookmark = action.payload;
        },
        filterBookmarks: (state, action) => {
            const { filterBy } = action.payload;
            if (state.useFiltered === filterBy) {
                state.useFiltered = 'none';
                return;
            }
            state.filteredBookmarks = filterBookmarksFunction(state.allBookmarks, filterBy);
            state.useFiltered = filterBy;
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
                state.filteredBookmarks = action.payload;
                state.useFiltered = "none";
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

            // 🟢 favorite Bookmark
            .addCase(toggleFavoriteBookmarkThunk.fulfilled, (state, action) => {
                const { bookmarkId, isFavorite } = action.payload;
                state.allBookmarks = state.allBookmarks.map((b) =>
                    b.bookmarkId === bookmarkId ? { ...b, isFavorite } : b
                );
                state.status = "succeeded";
            })

            // 🟢 Update Tag (Update tag name inside bookmarks)
            .addCase(updateTagThunk.fulfilled, (state, action) => {
                const { existingTag, tagName } = action.payload;
                state.allBookmarks = state.allBookmarks.map((bookmark) => ({
                    ...bookmark,
                    tags: bookmark.tags.map((tag) =>
                        tag === existingTag.tagName ? tagName : tag
                    )
                }));
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

export const { setSelectedBookmark, filterBookmarks } = bookmarksSlice.actions;
export default bookmarksSlice.reducer;
