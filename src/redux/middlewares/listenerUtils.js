import { fetchBookmarksThunk } from '../features/bookmarksSlice';
import { fetchDirectoryBookmarksThunk } from '../features/directorySlice';
import { fetchBookmarksByFilterThunk } from '../features/filterBookmarksSlice';
import { fetchBookmarksByTagThunk } from '../features/tagsSlice';

export const fetchBookmarksThunkBySelection = (getState, dispatch, user) => {
    const currentSelection = getState().urlSelection.selectedItem;
    const pathname = window.location.pathname;

    // FIX TODO: fix for current issue. Fetch all bookmarks for now to update filter state.
    dispatch(fetchBookmarksThunk({ userId: user.uid }));
    if ("tag" === currentSelection.type) {
        dispatch(fetchBookmarksByTagThunk({ userId: user.uid, tagId: currentSelection.value }));
    } else if ("directory" === currentSelection.type) {
        dispatch(fetchDirectoryBookmarksThunk({ userId: user.uid, directoryId: currentSelection.value }));
    } else if ("filter" === currentSelection.type) {
        dispatch(fetchBookmarksByFilterThunk({ userId: user.uid, filterType: currentSelection.value }));
    } else {

        // Extracting IDs dynamically from pathname
        const pathSegments = pathname.split("/"); // Example: ['','bookmarks','filter','uncategorized']

        if (pathSegments[2] === "filter" && pathSegments[3]) {
            dispatch(fetchBookmarksByFilterThunk({ userId: user.uid, filterType: pathSegments[3] }));
        } else if (pathSegments[2] === "directory" && pathSegments[3]) {
            dispatch(fetchDirectoryBookmarksThunk({ userId: user.uid, directoryId: pathSegments[3] }));
        } else if (pathSegments[2] === "tag" && pathSegments[3]) {
            dispatch(fetchBookmarksByTagThunk({ userId: user.uid, tagId: pathSegments[3] }));
        }
    }
}