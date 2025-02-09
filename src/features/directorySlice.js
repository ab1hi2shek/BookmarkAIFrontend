import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    fetchDirectories,
    createDirectory,
    renameDirectory,
    deleteDirectory
} from "../services/directoryService";
import { fetchBookmarksWithDirectoryId } from "../services/bookmarkService";

// 🟢 Fetch all directories
export const fetchDirectoriesThunk = createAsyncThunk(
    "directories/fetch",
    async ({ userId }, { rejectWithValue }) => {
        try {
            return await fetchDirectories(userId);
        } catch (error) {
            return rejectWithValue(error.response?.data?.error || "Failed to fetch directories");
        }
    }
);

// 🟢 Create a new directory
export const createDirectoryThunk = createAsyncThunk(
    "directories/create",
    async ({ name, userId }, { rejectWithValue }) => {
        try {
            return await createDirectory(name, userId);
        } catch (error) {
            return rejectWithValue(error.response?.data?.error || "Failed to create directory");
        }
    }
);

// 🟢 Rename a directory
export const renameDirectoryThunk = createAsyncThunk(
    "directories/rename",
    async ({ directoryId, name, userId }, { rejectWithValue }) => {
        try {
            await renameDirectory(userId, directoryId, name);
            return { directoryId, name };
        } catch (error) {
            return rejectWithValue(error.response?.data?.error || "Failed to rename directory");
        }
    }
);

// 🟢 Delete a directory (Move bookmarks or delete them)
export const deleteDirectoryThunk = createAsyncThunk(
    "directories/delete",
    async ({ directoryId, userId, moveBookmarks = true }, { rejectWithValue }) => {
        try {
            await deleteDirectory(userId, directoryId, moveBookmarks);
            return { directoryId, moveBookmarks };
        } catch (error) {
            return rejectWithValue(error.response?.data?.error || "Failed to delete directory");
        }
    }
);

// 🟢 Fetch bookmarks for a selected directory (Store separately from global bookmarks)
export const fetchDirectoryBookmarksThunk = createAsyncThunk(
    "directories/fetchBookmarks",
    async ({ userId, directoryId }, { rejectWithValue }) => {
        try {
            return await fetchBookmarksWithDirectoryId(userId, directoryId);
        } catch (error) {
            return rejectWithValue(error.response?.data?.error || "Failed to fetch bookmarks");
        }
    }
);

const sortDirectoriesFunction = (directories, sortBy) => {
    if (sortBy === "alphabetical") {
        return [...directories].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "bookmarks") {
        return [...directories].sort((a, b) => b.bookmarksCount - a.bookmarksCount);
    }
    return directories;
};

const directorySlice = createSlice({
    name: "directories",
    initialState: {
        allDirectories: [],
        directoryBookmarks: [], // ✅ Store directory-specific bookmarks separately
        status: "idle",
        error: null
    },
    reducers: {
        resetDirectoriesState: (state) => {
            state.allDirectories = [];
            state.directoryBookmarks = []; // ✅ Reset bookmarks when clearing state
            state.status = "idle";
            state.error = null;
        },
        sortDirectories: (state, action) => {
            const { sortBy } = action.payload;
            state.allDirectories = sortDirectoriesFunction(state.allDirectories, sortBy);
            localStorage.setItem("directorySortPreference", sortBy);
        }
    },
    extraReducers: (builder) => {
        // 🟢 Fetch Directories
        builder
            .addCase(fetchDirectoriesThunk.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchDirectoriesThunk.fulfilled, (state, action) => {
                state.status = "succeeded";
                const directories = action.payload;
                const sortPreference = localStorage.getItem("directorySortPreference") || "bookmarks";
                state.allDirectories = sortDirectoriesFunction(directories, sortPreference);
            })
            .addCase(fetchDirectoriesThunk.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })

            // 🟢 Create Directory
            .addCase(createDirectoryThunk.fulfilled, (state, action) => {
                state.allDirectories.push(action.payload);
            })

            // 🟢 Rename Directory
            .addCase(renameDirectoryThunk.fulfilled, (state, action) => {
                const { directoryId, name } = action.payload;
                state.allDirectories = state.allDirectories.map((dir) =>
                    dir.directoryId === directoryId ? { ...dir, name } : dir
                );
            })
            .addCase(renameDirectoryThunk.rejected, (state, action) => {
                state.error = action.payload;
            })

            // 🟢 Delete Directory
            .addCase(deleteDirectoryThunk.fulfilled, (state, action) => {
                const { directoryId } = action.payload;
                state.allDirectories = state.allDirectories.filter((dir) => dir.directoryId !== directoryId);
            })
            .addCase(deleteDirectoryThunk.rejected, (state, action) => {
                state.error = action.payload;
            })

            // 🟢 Fetch Directory Bookmarks
            .addCase(fetchDirectoryBookmarksThunk.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchDirectoryBookmarksThunk.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.directoryBookmarks = action.payload;
            })
            .addCase(fetchDirectoryBookmarksThunk.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
    }
});

export const { setSelectedDirectory, resetDirectoriesState, sortDirectories } = directorySlice.actions;
export default directorySlice.reducer;
