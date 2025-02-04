import axios from "axios";

// Base API URL (Replace with your actual backend URL)
const BASE_URL = "https://bookmark-ai-backend.vercel.app/api/user";

// 🔹 Create a new user
export const createUser = async ({ userId, name, email = "", avatarUrl = "" }) => {
    try {
        const response = await axios.post(`${BASE_URL}/create`, {
            userId,
            name,
            email,
            avatarUrl,
        });

        return response.data;
    } catch (error) {
        console.error("Create User Error:", error.response?.data || error.message);
        throw error.response?.data || error.message;
    }
};
