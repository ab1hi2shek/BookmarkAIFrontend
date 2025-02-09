import { createListenerMiddleware } from '@reduxjs/toolkit';
import { updateAllBookmarks } from '../features/bookmarksSlice';
import { updateDirectoryBookmarks } from '../features/directorySlice';
import { updateFilteredBookmarks } from '../features/filterBookmarksSlice';
import { updateTagsBookmarks, deleteTagThunk, updateTagThunk } from '../features/tagsSlice';
import { getBookmarkStateToUpdate } from './listenerUtils'

const tagActionsMiddleware = createListenerMiddleware();

tagActionsMiddleware.startListening({
    actionCreator: deleteTagThunk.fulfilled,
    effect: async (action, { dispatch, getState }) => {
        const tagDeleted = action.payload;
        const pathname = window.location.pathname;

        const { key, state: bookmarks } = getBookmarkStateToUpdate(pathname, getState);

        // Utility function to remove the tag from a list of bookmarks
        const removeTagFromBookmarks = (bookmarks) => bookmarks.map(bookmark => ({
            ...bookmark,
            tags: bookmark.tags.filter(tag => tag !== tagDeleted.tagName) // Remove deleted tag
        }));

        const updatedBookmarks = removeTagFromBookmarks(bookmarks);

        // Dispatch update based on current page type
        if (key === "allBookmarks") dispatch(updateAllBookmarks(updatedBookmarks));
        if (key === "directoryBookmarks") dispatch(updateDirectoryBookmarks(updatedBookmarks));
        if (key === "tagsBookmarks") dispatch(updateTagsBookmarks(updatedBookmarks));
        if (key === "filteredBookmarks") dispatch(updateFilteredBookmarks(updatedBookmarks));
    }
});

tagActionsMiddleware.startListening({
    actionCreator: updateTagThunk.fulfilled,
    effect: async (action, { dispatch, getState }) => {
        const { existingTag, tagName } = action.payload;
        const pathname = window.location.pathname;

        const { key, state: bookmarks } = getBookmarkStateToUpdate(pathname, getState);

        // Utility function to rename tag in bookmarks
        const renameTagInBookmarks = (bookmarks) =>
            bookmarks.map(bookmark => ({
                ...bookmark,
                tags: bookmark.tags.map(tag => (tag === existingTag.tagName ? tagName : tag))
            }));

        const updatedBookmarks = renameTagInBookmarks(bookmarks);

        // Dispatch update based on current page type
        if (key === "allBookmarks") dispatch(updateAllBookmarks(updatedBookmarks));
        if (key === "directoryBookmarks") dispatch(updateDirectoryBookmarks(updatedBookmarks));
        if (key === "tagsBookmarks") dispatch(updateTagsBookmarks(updatedBookmarks));
        if (key === "filteredBookmarks") dispatch(updateFilteredBookmarks(updatedBookmarks));
    }
});

export default tagActionsMiddleware;
