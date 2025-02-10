import { createListenerMiddleware } from '@reduxjs/toolkit';
import { deleteTagThunk, updateTagThunk, createTagThunk } from '../features/tagsSlice';
import { fetchTagsThunk } from '../features/tagsSlice';
import { fetchBookmarksThunkBySelection } from './listenerUtils'

const tagActionsMiddleware = createListenerMiddleware();

/*
Actions:
    deleteTagThunk.fulfilled
    updateTagThunk.fulfilled
Effect:
    2. Fetch tags list.
*/
tagActionsMiddleware.startListening({
    matcher: (action) =>
        action.type === deleteTagThunk.fulfilled.type ||
        action.type === updateTagThunk.fulfilled.type,
    effect: async (action, { dispatch, getState }) => {
        const { user } = getState().user;

        fetchBookmarksThunkBySelection(getState, dispatch, user)

        dispatch(fetchTagsThunk({ userId: user.uid }))
    }
});

/*
Actions:
    createTagThunk.fulfilled
Effect:
    1. Fetch tags list.
*/
tagActionsMiddleware.startListening({
    actionCreator: [
        createTagThunk.fulfilled
    ],
    effect: async (action, { dispatch, getState }) => {
        const { user } = getState().user;

        dispatch(fetchTagsThunk({ userId: user.uid }))
    }
});

export default tagActionsMiddleware;
