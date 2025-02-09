import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    fetchTags,
    createTag,
    updateTag,
    deleteTag
} from "../services/tagService";
import { fetchBookmarksWithTagId } from "../services/bookmarkService";
import { updateBookmarkThunk, deleteBookmarkThunk } from "./bookmarksSlice";

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
        return tagToDelete; // ✅ Return the deleted tag ID so we can remove it from Redux state
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
    },
    extraReducers: (builder) => {
        // 🟢 Fetch Tags
        builder
            .addCase(fetchTagsThunk.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchTagsThunk.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.allTags = action.payload;

                // 🟢 Get the sorting preference from localStorage
                const sortPreference = localStorage.getItem("tagsSortPreference") || "alphabetical";
                state.allTags = sortTagsFunction(action.payload, sortPreference);
            })
            .addCase(fetchTagsThunk.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })

            // 🟢 Fetch Bookmarks when tags change
            .addCase(fetchBookmarksByTagThunk.fulfilled, (state, action) => {
                state.tagsBookmarks = action.payload;
            })
            .addCase(fetchBookmarksByTagThunk.rejected, (state, action) => {
                state.tagsBookmarks = [];
            })

            // 🟢 Create Tag (After creation, fetch updated tags)
            .addCase(createTagThunk.fulfilled, (state, action) => {
                state.allTags.push(action.payload);
            })

            // 🟢 Update Tag
            .addCase(updateTagThunk.fulfilled, (state, action) => {
                const { existingTag, tagName } = action.payload;
                state.allTags = state.allTags.map((tag) =>
                    tag.tagId === existingTag.tagId ? { ...tag, tagName } : tag
                );
            })
            .addCase(updateTagThunk.rejected, (state, action) => {
                state.error = action.payload;
            })

            // 🟢 Delete Tag
            .addCase(deleteTagThunk.fulfilled, (state, action) => {
                state.allTags = state.allTags.filter((tag) => tag.tagId !== action.payload.tagId);
            })
            .addCase(deleteTagThunk.rejected, (state, action) => {
                state.error = action.payload;
            })

            // 🟢 When a bookmark is updated, if tags are updated, update tag list
            .addCase(updateBookmarkThunk.fulfilled, (state) => {
                state.status = "fetchTags";
            })
            .addCase(deleteBookmarkThunk.fulfilled, (state) => {
                state.status = "fetchTags";
            });
    }
});

export const { sortTags, resetTagsState } = tagsSlice.actions;
export default tagsSlice.reducer;
