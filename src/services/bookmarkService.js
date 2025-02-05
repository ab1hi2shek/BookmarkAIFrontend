import axios from "axios";

// Base API URL (Replace with your actual backend URL)
const BASE_URL = "https://bookmark-ai-backend.vercel.app/api/bookmark";

// Default headers
const getHeaders = (userId) => ({
    "Content-Type": "application/json",
    "userId": userId
});

// 🟢 Fetch all bookmarks (or filtered by tags)
export const fetchBookmarks = async (userId, tags = []) => {
    const response = await axios.post(
        `${BASE_URL}/filter`,
        tags.length ? { tags } : {}, // If tags exist, send them, else fetch all
        { headers: getHeaders(userId) }
    );
    return response.data.data.bookmarks;
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