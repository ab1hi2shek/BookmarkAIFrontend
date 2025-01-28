import { createSlice } from '@reduxjs/toolkit';
import { getTagsList } from '../../data/bookmarkData';

const tagsSlice = createSlice({
    name: 'tags',
    initialState: {
        allTags: getTagsList(),
        selectedTags: [],
    },
    reducers: {
        // Toggle a tag in the selectedTags array
        toggleSelectedTags: (state, action) => {
            const tag = action.payload;
            if (state.selectedTags.includes(tag)) {
                state.selectedTags = state.selectedTags.filter((t) => t !== tag);
            } else {
                state.selectedTags.push(tag);
            }
        },
        // Add a new tag to the allTags
        addTag: (state, action) => {
            const newTag = action.payload;
            if (!state.allTags.includes(newTag)) {
                state.allTags.push(newTag);
            }
        },
        // Edit an existing tag in both allTags and selectedTags
        editTag: (state, action) => {
            const { oldTag, newTag } = action.payload;
            state.allTags = state.allTags.map((tag) => (tag === oldTag ? newTag : tag));
            state.selectedTags = state.selectedTags.map((tag) => (tag === oldTag ? newTag : tag));
        },
        // Delete a tag from both allTags and selectedTags
        deleteTag: (state, action) => {
            const tagToDelete = action.payload;
            state.allTags = state.allTags.filter((tag) => tag !== tagToDelete);
            state.selectedTags = state.selectedTags.filter((tag) => tag !== tagToDelete);
        },
        // Replace allTags with a new set of tags (e.g., from API)
        setTags: (state, action) => {
            state.allTags = action.payload;
        },
        // Clear all selected tags
        clearSelectedTags: (state) => {
            state.selectedTags = [];
        },
    },
});

export const { toggleSelectedTags, addTag, editTag, deleteTag, setTags, clearSelectedTags } = tagsSlice.actions;
export default tagsSlice.reducer;
