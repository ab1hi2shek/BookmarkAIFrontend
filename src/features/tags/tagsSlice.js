import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    fetchTags,
    createTag,
    updateTag,
    deleteTag
} from "../../services/tagService";
import { fetchBookmarksThunk, updateBookmarkThunk } from "../bookmarks/bookmarksSlice";

// 🔹 User ID (Replace with actual authentication logic)
const USER_ID = "user-7601dd26-64ac-4327-84e2-e2d758701934";

// 🔹 Load selected tags from localStorage
const loadSelectedTags = () => {
    return JSON.parse(localStorage.getItem("selectedTags")) || [];
};

// 🔹 Save selected tags to localStorage
const saveSelectedTags = (tags) => {
    const selectedTagIds = tags.filter((tag) => tag.isSelected).map((tag) => tag.tagId);
    localStorage.setItem("selectedTags", JSON.stringify(selectedTagIds));
};

// 🟢 Fetch all tags (while preserving `isSelected`)
export const fetchTagsThunk = createAsyncThunk("tags/fetch", async (_, { rejectWithValue }) => {
    try {
        const fetchedTags = await fetchTags(USER_ID);
        const selectedTagIds = loadSelectedTags(); // 🔹 Restore previous selection

        const updatedTags = fetchedTags.map((tag) => ({
            ...tag,
            isSelected: selectedTagIds.includes(tag.tagId),
        }));

        return updatedTags;
    } catch (error) {
        return rejectWithValue(error.response?.data?.error || "Failed to fetch tags");
    }
});

// 🟢 Create a new tag
export const createTagThunk = createAsyncThunk("tags/create", async (tagName, { rejectWithValue }) => {
    try {
        const newTag = await createTag(tagName, USER_ID);
        return newTag; // ✅ Return the created tag, so `extraReducers` can handle the update
    } catch (error) {
        return rejectWithValue(error.response?.data?.error || "Failed to create tag");
    }
});

// 🟢 Update a tag (Preserve selected tags)
export const updateTagThunk = createAsyncThunk("tags/update", async ({ tagId, tagName }, { rejectWithValue }) => {
    try {
        await updateTag(tagId, tagName, USER_ID);
        return { tagId, tagName }; // ✅ Return updated tag details
    } catch (error) {
        return rejectWithValue(error.response?.data?.error || "Failed to update tag");
    }
});

// 🟢 Delete a tag (Preserve selected tags)
export const deleteTagThunk = createAsyncThunk("tags/delete", async (tagToDelete, { rejectWithValue }) => {
    try {
        await deleteTag(tagToDelete.tagId, USER_ID);
        return tagToDelete; // ✅ Return the deleted tag ID so we can remove it from Redux state
    } catch (error) {
        return rejectWithValue(error.response?.data?.error || "Failed to delete tag");
    }
});

// 🟢 Toggle a tag and fetch bookmarks
export const toggleSelectedTagsThunk = (selectedTagId) => (dispatch, getState) => {
    dispatch(toggleSelectedTags(selectedTagId)); // 🔹 First, update selection in Redux store

    const selectedTags = getState().tags.allTags
        .filter((tag) => tag.isSelected)
        .map((tag) => tag.tagId);

    dispatch(fetchBookmarksThunk(selectedTags)); // 🔹 Fetch filtered bookmarks after updating selection
};

const tagsSlice = createSlice({
    name: "tags",
    initialState: {
        allTags: [],
        status: "idle", // loading, succeeded, failed
        error: null
    },
    reducers: {
        // 🟢 Toggle a tag (Reducer should NOT call API)
        toggleSelectedTags: (state, action) => {
            const selectedTagId = action.payload;
            state.allTags = state.allTags.map((tag) => ({
                ...tag,
                isSelected: tag.tagId === selectedTagId ? !tag.isSelected : tag.isSelected
            }));

            saveSelectedTags(state.allTags); // 🔹 Save selected tags to localStorage
        },
        clearSelectedTags: (state) => {
            state.allTags = state.allTags.map((tag) => ({
                ...tag,
                isSelected: false
            }));

            saveSelectedTags(state.allTags); // 🔹 Save reset state to localStorage
        }
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
                console.log("hahaha", state.allTags)
            })
            .addCase(fetchTagsThunk.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })

            // 🟢 Create Tag (After creation, fetch updated tags)
            .addCase(createTagThunk.fulfilled, (state, action) => {
                state.allTags.push(action.payload); // ✅ Directly add new tag to state
            })

            // 🟢 Update Tag (Now updates only the edited tag)
            .addCase(updateTagThunk.fulfilled, (state, action) => {
                const { tagId, tagName } = action.payload;
                state.allTags = state.allTags.map((tag) =>
                    tag.tagId === tagId ? { ...tag, tagName } : tag
                );
            })
            .addCase(updateTagThunk.rejected, (state, action) => {
                state.error = action.payload;
            })

            // 🟢 Delete Tag (Now removes only the deleted tag)
            .addCase(deleteTagThunk.fulfilled, (state, action) => {
                state.allTags = state.allTags.filter((tag) => tag.tagId !== action.payload.tagId);
            })
            .addCase(deleteTagThunk.rejected, (state, action) => {
                state.error = action.payload;
            })

            // 🟢 When a bookmark is updated, if tags are updated, update tag list
            .addCase(updateBookmarkThunk.fulfilled, (state, action) => {
                console.log("here I am")
                state.status = "fetchTags";
            })
    }
});

export const { toggleSelectedTags, clearSelectedTags } = tagsSlice.actions;
export default tagsSlice.reducer;
