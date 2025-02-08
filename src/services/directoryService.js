import axios from "axios";

const BASE_URL = "https://bookmark-ai-backend.vercel.app/api/directory";

// Default headers
const getHeaders = (userId) => ({
    "Content-Type": "application/json",
    "userId": userId
});

// 🟢 **Fetch all directories**
export const fetchDirectories = async (userId) => {
    const response = await axios.get(`${BASE_URL}/all`, {
        headers: getHeaders(userId),
    });
    return response.data.data.directories;
};

// 🟢 **Create a directory**
export const createDirectory = async (name, userId) => {
    const response = await axios.post(
        `${BASE_URL}/create`,
        { name },
        { headers: getHeaders(userId) }
    );
    return response.data.data.directory;
};

// 🟢 **Rename a directory**
export const renameDirectory = async ({ directoryId, name, userId }) => {
    const response = await axios.post(
        `${BASE_URL}/rename/${directoryId}`,
        { name },
        { headers: getHeaders(userId) }
    );
    return response.data.data.directory;
};

// 🟢 **Delete a directory**
export const deleteDirectory = async (directoryId, userId, moveBookmarks = true) => {
    await axios.delete(`${BASE_URL}/delete/${directoryId}`, {
        headers: getHeaders(userId),
        data: { moveBookmarks }, // Send moveBookmarks in the request body
    });
};
