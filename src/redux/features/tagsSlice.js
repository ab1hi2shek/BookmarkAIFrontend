import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch } from 'react-redux';
import {
    fetchTags,
    createTag,
    updateTag,
    deleteTag
} from "../services/tagService";
import { fetchBookmarksWithTagId } from "../services/bookmarkService";

// 🟢 Fetch all tags
export const fetchTagsThunk = createAsyncThunk("tags/fetch", async ({ userId }, { rejectWithValue }) => {
    try {
        const fetchedTags = await fetchTags(userId);
        return fetchedTags;
    } catch (error) {
        return rejectWithValue(error.response?.data?.error || "Failed to fetch tags");
    }
});

// 🟢 Fetch bookmarks based on tagId
export const fetchBookmarksByTagThunk = createAsyncThunk(
    "tags/fetchBookmarks",
    async ({ userId, tagId }, { rejectWithValue }) => {
        try {
            return await fetchBookmarksWithTagId(userId, tagId);
        } catch (error) {
            return rejectWithValue(error.response?.data?.error || "Failed to fetch bookmarks");
        }
    }
);

// 🟢 Create a new tag
export const createTagThunk = createAsyncThunk("tags/create", async ({ tagName, userId }, { rejectWithValue }) => {
    try {
        const newTag = await createTag(tagName, userId);
        return newTag; // ✅ Return the created tag
    } catch (error) {
        return rejectWithValue(error.response?.data?.error || "Failed to create tag");
    }
});

// 🟢 Update a tag
export const updateTagThunk = createAsyncThunk("tags/update", async ({ existingTag, tagName, userId }, { rejectWithValue }) => {
    try {
        await updateTag({ tagId: existingTag.tagId, tagName, userId });
        return { existingTag, tagName }; // ✅ Return updated tag details
    } catch (error) {
        return rejectWithValue(error.response?.data?.error || "Failed to update tag");
    }
});

// 🟢 Delete a tag
export const deleteTagThunk = createAsyncThunk("tags/delete", async ({ tagToDelete, userId }, { rejectWithValue }) => {
    try {
        await deleteTag(tagToDelete.tagId, userId);
        return tagToDelete; // ✅ Return the deleted tag object so we can remove it from Redux state
    } catch (error) {
        return rejectWithValue(error.response?.data?.error || "Failed to delete tag");
    }
});

const sortTagsFunction = (tags, sortBy) => {
    if (sortBy === "alphabetical") {
        return [...tags].sort((a, b) => a.tagName.localeCompare(b.tagName));
    } else if (sortBy === "bookmarks") {
        return [...tags].sort((a, b) => b.bookmarksCount - a.bookmarksCount);
    }
    return tags;
};

const tagsSlice = createSlice({
    name: "tags",
    initialState: {
        allTags: [],
        tagsBookmarks: [],
        status: "idle", // loading, succeeded, failed
        error: null
    },
    reducers: {
        sortTags: (state, action) => {
            const { sortBy } = action.payload;
            state.allTags = sortTagsFunction(state.allTags, sortBy);
            localStorage.setItem("tagsSortPreference", sortBy);
        },
        resetTagsState: (state) => {
            state.allTags = [];
            state.status = "idle"; // Reset status to ensure refetch on next login
            state.error = null;
        },
        updateTagsBookmarks: (state, action) => {
            state.tagsBookmarks = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            // 🟢 Fetch Tags list
            .addCase(fetchTagsThunk.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchTagsThunk.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.allTags = action.payload;

                // Get the sorting preference from localStorage
                const sortPreference = localStorage.getItem("tagsSortPreference") || "alphabetical";
                state.allTags = sortTagsFunction(action.payload, sortPreference);
            })
            .addCase(fetchTagsThunk.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })

            // 🟢 Fetch Bookmarks by tag
            .addCase(fetchBookmarksByTagThunk.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(fetchBookmarksByTagThunk.fulfilled, (state, action) => {
                state.tagsBookmarks = action.payload;
                state.status = "succeeded";
            })
            .addCase(fetchBookmarksByTagThunk.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })

            // 🟢 matcher for remaining action items
            .addMatcher(
                (action) => [
                    createTagThunk.pending.type,
                    updateTagThunk.pending.type,
                    deleteTagThunk.pending.type,
                ].includes(action.type),
                (state) => {
                    state.status = "loading";
                }
            )
            .addMatcher(
                (action) => [
                    createTagThunk.fulfilled.type,
                    updateTagThunk.fulfilled.type,
                    deleteTagThunk.fulfilled.type,
                ].includes(action.type),
                (state) => {
                    state.status = "succeeded";
                }
            )
            .addMatcher(
                (action) => [
                    createTagThunk.rejected.type,
                    updateTagThunk.rejected.type,
                    deleteTagThunk.rejected.type,
                ].includes(action.type),
                (state) => {
                    state.status = "failed";
                    state.error = action.payload;
                }
            )
    }
});

export const { sortTags, resetTagsState, updateTagsBookmarks } = tagsSlice.actions;
export default tagsSlice.reducer;
