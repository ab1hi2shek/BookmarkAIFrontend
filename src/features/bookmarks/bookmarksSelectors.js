import { createSelector } from '@reduxjs/toolkit';

// Selector to filter bookmarks based on selected tags
export const selectFilteredBookmarks = createSelector(
    [(state) => state.bookmarks.allBookmarks, (state) => state.tags.allTags],
    (allBookmarks, allTags) => {
        const selectedTagIds = allTags.filter((tag) => tag.isSelected).map((tag) => tag.id);


        // If no tags are selected, return all bookmarks
        if (selectedTagIds.length === 0) {
            return allBookmarks;
        }

        return allBookmarks.filter((bookmark) =>
            bookmark.tags.some((tag) => selectedTagIds.includes(tag))
        );
    }
);
