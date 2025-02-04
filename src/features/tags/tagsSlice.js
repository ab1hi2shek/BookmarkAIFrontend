import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    fetchTags,
    createTag,
    updateTag,
    deleteTag
} from "../../services/tagService";
import { fetchBookmarksThunk, updateBookmarkThunk, deleteBookmarkThunk } from "../bookmarks/bookmarksSlice";
import { auth } from "../../firebaseConfig";

// 🔹 User ID (Replace with actual authentication logic)
const getUserId = () => auth.currentUser?.uid || null;

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
        const fetchedTags = await fetchTags(getUserId());
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
        const newTag = await createTag(tagName, getUserId());
        return newTag; // ✅ Return the created tag, so `extraReducers` can handle the update
    } catch (error) {
        return rejectWithValue(error.response?.data?.error || "Failed to create tag");
    }
});

// 🟢 Update a tag (Preserve selected tags)
export const updateTagThunk = createAsyncThunk("tags/update", async ({ existingTag, tagName }, { rejectWithValue }) => {
    try {
        await updateTag({ tagId: existingTag.tagId, tagName: tagName, userId: getUserId() });
        return { existingTag, tagName }; // ✅ Return updated tag details
    } catch (error) {
        return rejectWithValue(error.response?.data?.error || "Failed to update tag");
    }
});

// 🟢 Delete a tag (Preserve selected tags)
export const deleteTagThunk = createAsyncThunk("tags/delete", async (tagToDelete, { rejectWithValue }) => {
    try {
        await deleteTag(tagToDelete.tagId, getUserId());
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
        },
        sortTags: (state, action) => {
            const { sortBy } = action.payload;
            state.allTags = sortTagsFunction(state.allTags, sortBy);
            localStorage.setItem("tagsSortPreference", sortBy);
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
                const tags = action.payload;

                // 🟢 Get the sorting preference from localStorage
                const sortPreference = localStorage.getItem("tagsSortPreference") || "alphabetical";
                state.allTags = sortTagsFunction(tags, sortPreference);
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
                const { existingTag, tagName } = action.payload;
                console.log("existingTag, tagName", existingTag, tagName)
                state.allTags = state.allTags.map((tag) =>
                    tag.tagId === existingTag.tagId ? { ...tag, tagName } : tag
                );
                console.log(" state.allTags", state.allTags)
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
                state.status = "fetchTags";
            })

            .addCase(deleteBookmarkThunk.fulfilled, (state, action) => {
                state.status = "fetchTags";
            })
    }
});

export const { toggleSelectedTags, clearSelectedTags, sortTags } = tagsSlice.actions;
export default tagsSlice.reducer;
