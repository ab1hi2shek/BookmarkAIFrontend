import { createListenerMiddleware } from '@reduxjs/toolkit';
import {
    updateBookmarkThunk,
    createBookmarkThunk,
    deleteBookmarkThunk,
    toggleFavoriteBookmarkThunk
} from '../features/bookmarksSlice';
import { fetchDirectoriesThunk } from '../features/directorySlice';
import { fetchTagsThunk } from '../features/tagsSlice';
import { fetchBookmarksThunkBySelection } from './listenerUtils'

const bookmarkActionsMiddleware = createListenerMiddleware();

/*
Actions:
    updateBookmarkThunk.fulfilled
    createBookmarkThunk.fulfilled
    deleteBookmarkThunk.fulfilled
Effect:
    1. Fetch bookmarks of current page selection.
    2. Fetch directory and tags list.
*/
bookmarkActionsMiddleware.startListening({
    matcher: (action) =>
        action.type === updateBookmarkThunk.fulfilled.type ||
        action.type === createBookmarkThunk.fulfilled.type ||
        action.type === deleteBookmarkThunk.fulfilled.type,
    effect: async (action, { dispatch, getState }) => {
        const { user } = getState().user;

        fetchBookmarksThunkBySelection(getState, dispatch, user)

        dispatch(fetchTagsThunk({ userId: user.uid }))
        dispatch(fetchDirectoriesThunk({ userId: user.uid }))

    }
});

/*
Actions:
    toggleFavoriteBookmarkThunk.fulfilled
Effect:
    1. Fetch bookmarks of current page selection.
*/
bookmarkActionsMiddleware.startListening({
    actionCreator: toggleFavoriteBookmarkThunk.fulfilled,
    effect: async (action, { dispatch, getState }) => {
        const { user } = getState().user;

        fetchBookmarksThunkBySelection(getState, dispatch, user)
    }
});

export default bookmarkActionsMiddleware;
