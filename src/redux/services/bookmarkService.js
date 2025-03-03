import axios from "axios";

// Base API URL (Replace with your actual backend URL)
const BASE_URL = "https://bookmark-ai-backend.vercel.app/api/bookmark";

// Default headers
const getHeaders = (userId) => ({
    "Content-Type": "application/json",
    "userId": userId
});

// 🟢 Fetch all bookmarks (or filtered by tags)
export const fetchBookmarks = async (userId) => {
    const response = await axios.get(
        `${BASE_URL}/all`,
        { headers: getHeaders(userId) }
    );
    return response.data.data.bookmarks;
};

// Fetch bookmarks with filters
export const fetchBookmarksWithFilters = async (userId, filterType) => {
    try {
        const response = await axios.get(
            `${BASE_URL}/filter/${filterType}`,
            { headers: getHeaders(userId) }
        );

        return response.data.data.bookmarks; // ✅ Return bookmarks from API response
    } catch (error) {
        console.error("Error fetching bookmarks:", error);
        return []; // Return empty array if there's an error
    }
};

// Fetch bookmarks by directoryId
export const fetchBookmarksWithTagId = async (userId, tagId) => {
    try {
        const response = await axios.get(
            `${BASE_URL}/tag/${tagId}`,
            { headers: getHeaders(userId) }
        );

        return response.data.data.bookmarks; // ✅ Return bookmarks from API response
    } catch (error) {
        console.error("Error fetching bookmarks:", error);
        return []; // Return empty array if there's an error
    }
};

// Fetch bookmarks by directoryId
export const fetchBookmarksWithDirectoryId = async (userId, directoryId) => {
    try {
        const response = await axios.get(
            `${BASE_URL}/directory/${directoryId}`,
            { headers: getHeaders(userId) }
        );

        return response.data.data.bookmarks; // ✅ Return bookmarks from API response
    } catch (error) {
        console.error("Error fetching bookmarks:", error);
        return []; // Return empty array if there's an error
    }
};

// 🟢 Create a new bookmark
export const createBookmark = async (bookmark, userId) => {
    const response = await axios.post(
        `${BASE_URL}/create`,
        bookmark,
        { headers: getHeaders(userId) }
    );
    console.log(response.data.data.bookmark);
    return response.data.data.bookmark;
};

// 🟢 Update a bookmark
export const updateBookmark = async ({ updatedBookmark }, userId) => {
    const response = await axios.post(
        `${BASE_URL}/update/${updatedBookmark.bookmarkId}`,
        updatedBookmark,
        { headers: getHeaders(userId) }
    );
    return response.data.data.bookmark;
};

// 🟢 Delete a bookmark
export const deleteBookmark = async (bookmarkId, userId) => {
    await axios.delete(`${BASE_URL}/delete/${bookmarkId}`, {
        headers: getHeaders(userId),
    });
    return bookmarkId; // Return the deleted bookmark's ID for local state update
};

// 🟢 set a bookmark as favorite
export const togglefavoriteBookmark = async (bookmarkId, userId) => {
    const response = await axios.post(
        `${BASE_URL}/favorite/${bookmarkId}`,
        {},
        { headers: getHeaders(userId) }
    );
    return response.data.data;
};

// 🟢 **generate tags**
// export const generateBookmarkTags = async (bookmarkId, userId) => {
//     const response = await axios.post(
//         `${BASE_URL}/generate`,
//         { bookmarkId },
//         { headers: getHeaders(userId) }
//     );
//     return response.data.data.generatedTags;
// };