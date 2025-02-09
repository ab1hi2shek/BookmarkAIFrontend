import axios from "axios";

const BASE_URL = "https://bookmark-ai-backend.vercel.app/api/tag";

// Default headers
const getHeaders = (userId) => ({
    "Content-Type": "application/json",
    "userId": userId
});

// 🟢 **Fetch all tags**
export const fetchTags = async (userId) => {
    const response = await axios.get(`${BASE_URL}/all`, {
        headers: getHeaders(userId),
    });
    return response.data.data.tags;
};

// 🟢 **Create a tag**
export const createTag = async (tagName, userId) => {
    const response = await axios.post(
        `${BASE_URL}/create`,
        { tagName },
        { headers: getHeaders(userId) }
    );
    return response.data.data.tag;
};

// 🟢 **Update a tag**
export const updateTag = async ({ tagId, tagName, userId }) => {
    const response = await axios.post(
        `${BASE_URL}/update/${tagId}`,
        { tagName },
        { headers: getHeaders(userId) }
    );
    return response.data.data.tag;
};

// 🟢 **Delete a tag**
export const deleteTag = async (tagId, userId) => {
    await axios.delete(`${BASE_URL}/delete/${tagId}`, {
        headers: getHeaders(userId),
    });
};

