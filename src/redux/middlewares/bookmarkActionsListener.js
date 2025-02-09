import { createListenerMiddleware } from '@reduxjs/toolkit';
import {
    updateAllBookmarks,
    updateBookmarkThunk,
    createBookmarkThunk,
    deleteBookmarkThunk,
    toggleFavoriteBookmarkThunk
} from '../features/bookmarksSlice';
import { updateDirectoryBookmarks, fetchDirectoriesThunk } from '../features/directorySlice';
import { updateFilteredBookmarks } from '../features/filterBookmarksSlice';
import { updateTagsBookmarks, fetchTagsThunk } from '../features/tagsSlice';
import { getBookmarkStateToUpdate } from './listenerUtils'

const bookmarkActionsMiddleware = createListenerMiddleware();

bookmarkActionsMiddleware.startListening({
    actionCreator: updateBookmarkThunk.fulfilled,
    effect: async (action, { dispatch, getState }) => {
        const updatedBookmark = action.payload;
        const pathname = window.location.pathname;
        const { user } = getState().user;
        console.log("user = ", user)

        const { key, state: bookmarks } = getBookmarkStateToUpdate(pathname, getState);

        // Utility function to remove the tag from a list of bookmarks
        const functionToUpdateBookmark = (bookmarks) => bookmarks.map(bookmark =>
            bookmark.bookmarkId === updatedBookmark.bookmarkId ? updatedBookmark : bookmark
        );
        const updatedBookmarks = functionToUpdateBookmark(bookmarks);

        // Dispatch update based on current page type
        dispatch(updateAllBookmarks(updatedBookmarks)); //for now updating AllBookmarks always to update filters.
        if (key === "directoryBookmarks") dispatch(updateDirectoryBookmarks(updatedBookmarks));
        if (key === "tagsBookmarks") dispatch(updateTagsBookmarks(updatedBookmarks));
        if (key === "filteredBookmarks") dispatch(updateFilteredBookmarks(updatedBookmarks));

        dispatch(fetchTagsThunk({ userId: user.uid }))
        dispatch(fetchDirectoriesThunk({ userId: user.uid }))

    }
});

bookmarkActionsMiddleware.startListening({
    actionCreator: createBookmarkThunk.fulfilled,
    effect: async (action, { dispatch, getState }) => {
        const newBookmark = action.payload;
        const pathname = window.location.pathname;
        const { user } = getState().user;

        const { key, state: bookmarks } = getBookmarkStateToUpdate(pathname, getState);

        // Utility function to remove the tag from a list of bookmarks
        const functionToAddBookmark = (bookmarks) => bookmarks.push(newBookmark);
        const updatedBookmarks = functionToAddBookmark(bookmarks);

        // Dispatch update based on current page type
        if (key === "allBookmarks") dispatch(updateAllBookmarks(updatedBookmarks));
        if (key === "directoryBookmarks") dispatch(updateDirectoryBookmarks(updatedBookmarks));
        if (key === "tagsBookmarks") dispatch(updateTagsBookmarks(updatedBookmarks));
        if (key === "filteredBookmarks") dispatch(updateFilteredBookmarks(updatedBookmarks));

        dispatch(fetchTagsThunk({ userId: user.uid }))
        dispatch(fetchDirectoriesThunk({ userId: user.uid }))
    }
});

bookmarkActionsMiddleware.startListening({
    actionCreator: deleteBookmarkThunk.fulfilled,
    effect: async (action, { dispatch, getState }) => {
        const bookmarkId = action.payload;
        const pathname = window.location.pathname;
        const { user } = getState().user;

        const { key, state: bookmarks } = getBookmarkStateToUpdate(pathname, getState);

        // Utility function to remove the tag from a list of bookmarks
        const functionToDeleteABookmarkById = (bookmarks) => bookmarks.filter((b) => b.bookmarkId !== bookmarkId)
        const updatedBookmarks = functionToDeleteABookmarkById(bookmarks);

        // Dispatch update based on current page type
        dispatch(updateAllBookmarks(updatedBookmarks));
        if (key === "directoryBookmarks") dispatch(updateDirectoryBookmarks(updatedBookmarks));
        if (key === "tagsBookmarks") dispatch(updateTagsBookmarks(updatedBookmarks));
        if (key === "filteredBookmarks") dispatch(updateFilteredBookmarks(updatedBookmarks));

        dispatch(fetchTagsThunk({ userId: user.uid }))
        dispatch(fetchDirectoriesThunk({ userId: user.uid }))
    }
});

bookmarkActionsMiddleware.startListening({
    actionCreator: toggleFavoriteBookmarkThunk.fulfilled,
    effect: async (action, { dispatch, getState }) => {
        const { bookmarkId, isFavorite } = action.payload;
        const pathname = window.location.pathname;
        const { key, state: bookmarks } = getBookmarkStateToUpdate(pathname, getState);

        // Utility function to remove the tag from a list of bookmarks
        const functionToDeleteABookmarkById = (bookmarks) => bookmarks.map((b) =>
            b.bookmarkId === bookmarkId ? { ...b, isFavorite } : b
        );
        const updatedBookmarks = functionToDeleteABookmarkById(bookmarks);

        // Dispatch update based on current page type
        dispatch(updateAllBookmarks(updatedBookmarks));
        if (key === "directoryBookmarks") dispatch(updateDirectoryBookmarks(updatedBookmarks));
        if (key === "tagsBookmarks") dispatch(updateTagsBookmarks(updatedBookmarks));
        if (key === "filteredBookmarks") dispatch(updateFilteredBookmarks(updatedBookmarks));
    }
});

export default bookmarkActionsMiddleware;
