import { createSlice } from '@reduxjs/toolkit';
import { getTagsList } from '../../data/bookmarkData';

const tagsSlice = createSlice({
    name: 'tags',
    initialState: {
        allTags: getTagsList()
    },
    reducers: {
        // Toggle a tag in the selectedTags array
        toggleSelectedTags: (state, action) => {
            const selectedTagId = action.payload;
            state.allTags = state.allTags.map(tag => ({
                ...tag,
                isSelected: (tag.id === selectedTagId) ? !tag.isSelected : tag.isSelected
            }));
        },

        // Edit an existing tag.
        editTag: (state, action) => {
            const { oldTagId, newTagName } = action.payload;

            state.allTags = state.allTags.map(tag => {
                if (tag.id === oldTagId) {
                    return { ...tag, name: newTagName };
                } else {
                    return tag;
                }
            });
        },

        // Delete a tag from both allTags and selectedTags
        deleteTag: (state, action) => {
            const tagIdToDelete = action.payload;
            state.allTags = state.allTags.filter(tag => tag.id !== tagIdToDelete);
        },

        // Replace allTags with a new set of tags (e.g., from API)
        setTags: (state, action) => {
            state.allTags = action.payload;
        },

        // Clear all selected tags
        clearSelectedTags: (state) => {
            state.allTags = state.allTags.map(tag => {
                return { ...tag, isSelected: false };
            });
        },
    },
});

export const { toggleSelectedTags, editTag, deleteTag, setTags, clearSelectedTags } = tagsSlice.actions;
export default tagsSlice.reducer;
