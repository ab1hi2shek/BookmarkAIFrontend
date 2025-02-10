import { createListenerMiddleware } from '@reduxjs/toolkit';
import { renameDirectoryThunk, deleteDirectoryThunk, createDirectoryThunk } from '../features/directorySlice';
import { fetchBookmarksThunkBySelection } from './listenerUtils'
import { fetchDirectoriesThunk } from '../features/directorySlice';

const directoryActionsMiddleware = createListenerMiddleware();

/*
Actions:
    renameDirectoryThunk.fulfilled
    deleteDirectoryThunk.fulfilled
Effect:
    1. Fetch bookmarks of current page selection.
    2. Fetch directory list.
*/
directoryActionsMiddleware.startListening({
    matcher: (action) =>
        action.type === renameDirectoryThunk.fulfilled.type ||
        action.type === deleteDirectoryThunk.fulfilled.type,
    effect: async (action, { dispatch, getState }) => {
        const { user } = getState().user;

        fetchBookmarksThunkBySelection(getState, dispatch, user)

        dispatch(fetchDirectoriesThunk({ userId: user.uid }))

    }
});

/*
Actions:
    createDirectoryThunk.fulfilled
Effect:
    1. Fetch directory list.
*/
directoryActionsMiddleware.startListening({
    actionCreator: createDirectoryThunk.fulfilled,
    effect: async (action, { dispatch, getState }) => {
        const { user } = getState().user;

        dispatch(fetchDirectoriesThunk({ userId: user.uid }))

    }
});

export default directoryActionsMiddleware;
