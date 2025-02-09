// Utility function to determine which bookmarks state to update based on URL
export const getBookmarkStateToUpdate = (pathname, getState) => {
    if (pathname.includes("/filter/")) {
        return { key: "filteredBookmarks", state: getState().filterBookmarks.filteredBookmarks };
    }
    if (pathname.includes("/directory/")) {
        return { key: "directoryBookmarks", state: getState().directories.directoryBookmarks };
    }
    if (pathname.includes("/tag/")) {
        return { key: "tagsBookmarks", state: getState().tags.tagsBookmarks };
    }
    return { key: "allBookmarks", state: getState().bookmarks.allBookmarks };
};