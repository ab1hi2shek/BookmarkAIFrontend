import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../firebaseConfig";
import { createUser } from "../services/userService";
import { resetBookmarksState } from "./bookmarksSlice";
import { resetTagsState } from "./tagsSlice";

// 🔹 Async thunk to check authentication status
export const checkAuthStatus = createAsyncThunk("user/checkAuthStatus", async (_, { rejectWithValue }) => {
    return new Promise((resolve) => {
        auth.onAuthStateChanged(async (currentUser) => {
            if (currentUser) {
                const { uid, displayName, email, photoURL } = currentUser;
                // Ensure user is stored in backend
                await createUser({ userId: uid, name: displayName, email, avatarUrl: photoURL });
                resolve({
                    uid,
                    displayName,
                    email,
                    photoURL,
                });
            } else {
                resolve(null);
            }
        });
    });
});

// 🟢 Thunk to handle logout and reset bookmarks state
export const handleLogoutThunk = () => async (dispatch) => {
    try {
        await auth.signOut();
        dispatch(logoutUser());
        dispatch(resetBookmarksState()); // 🟢 Reset bookmarks on logout
        dispatch(resetTagsState()); // 🟢 Reset tags on logout
    } catch (error) {
        console.error("Logout Error:", error);
    }
};

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        loading: true,
        error: null,
    },
    reducers: {
        logoutUser: (state) => {
            state.user = null;
            state.loading = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkAuthStatus.pending, (state) => {
                state.loading = true;
            })
            .addCase(checkAuthStatus.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(checkAuthStatus.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            });
    },
});

export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;
