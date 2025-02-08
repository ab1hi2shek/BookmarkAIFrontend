import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    fetchDirectories,
    createDirectory,
    renameDirectory,
    deleteDirectory
} from "../../services/directoryService";
import { fetchBookmarksThunkByDirectory, fetchBookmarksThunk } from "../bookmarks/bookmarksSlice";
import { toggleSelectedTagsThunk } from "../tags/tagsSlice";

// 🟢 Fetch all directories
export const fetchDirectoriesThunk = createAsyncThunk("directories/fetch", async ({ userId }, { rejectWithValue }) => {
    try {
        const directories = await fetchDirectories(userId);
        return directories;
    } catch (error) {
        return rejectWithValue(error.response?.data?.error || "Failed to fetch directories");
    }
});

// 🟢 Create a new directory
export const createDirectoryThunk = createAsyncThunk("directories/create", async ({ name, userId }, { rejectWithValue }) => {
    try {
        const newDirectory = await createDirectory(name, userId);
        return newDirectory; // ✅ Return the created directory
    } catch (error) {
        return rejectWithValue(error.response?.data?.error || "Failed to create directory");
    }
});

// 🟢 Rename a directory
export const renameDirectoryThunk = createAsyncThunk("directories/rename", async ({ directoryId, name, userId }, { rejectWithValue }) => {
    try {
        await renameDirectory({ directoryId, name, userId });
        return { directoryId, name }; // ✅ Return updated directory details
    } catch (error) {
        return rejectWithValue(error.response?.data?.error || "Failed to rename directory");
    }
});

// 🟢 Delete a directory
export const deleteDirectoryThunk = createAsyncThunk("directories/delete", async ({ directoryId, userId, moveBookmarks = true }, { rejectWithValue }) => {
    try {
        await deleteDirectory(directoryId, userId, moveBookmarks);
        return { directoryId, moveBookmarks }; // ✅ Return deleted directory ID
    } catch (error) {
        return rejectWithValue(error.response?.data?.error || "Failed to delete directory");
    }
});

// 🟢 Select a directory and fetch bookmarks
export const selectDirectoryThunk = createAsyncThunk("directories/select", async ({ directory, userId }, { dispatch }) => {

    console.log("selectDirectoryThunk", directory)
    dispatch(setSelectedDirectory(directory));
    if (Object.keys(directory).length !== 0) {
        dispatch(fetchBookmarksThunkByDirectory({ userId: userId, directoryId: directory.directoryId }));
    } else {
        // fetch all bookmarks
        dispatch(fetchBookmarksThunk({ userId: userId }));
    }
});

const sortDirectoriesFunction = (directories, sortBy) => {
    console.log(directories, sortBy, "hola")
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
        selectedDirectory: {}, // Default value, no localStorage
        status: "idle", // loading, succeeded, failed
        error: null
    },
    reducers: {
        // 🟢 Set selected directory (Reducer should NOT call API)
        setSelectedDirectory: (state, action) => {
            console.log("directory", action.payload)
            state.selectedDirectory = action.payload;
        },
        resetDirectoriesState: (state) => {
            state.allDirectories = [];
            state.selectedDirectory = {};
            state.status = "idle"; // Reset status
            state.error = null;
        },
        sortDirectories: (state, action) => {
            const { sortBy } = action.payload;
            console.log("state.allDirectories", state.allDirectories, sortBy)
            state.allDirectories = sortDirectoriesFunction(state.allDirectories, sortBy);
            localStorage.setItem("directorySortPreference", sortBy);
        },
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

                console.log("action.payload", action.payload)
                // 🟢 Get the sorting preference from localStorage
                const sortPreference = localStorage.getItem("directorySortPreference") || "bookmarks";
                state.allDirectories = sortDirectoriesFunction(directories, sortPreference);
            })
            .addCase(fetchDirectoriesThunk.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })

            // 🟢 Create Directory (Add to state)
            .addCase(createDirectoryThunk.fulfilled, (state, action) => {
                state.allDirectories.push(action.payload);
            })

            // 🟢 Rename Directory (Update specific directory)
            .addCase(renameDirectoryThunk.fulfilled, (state, action) => {
                const { directoryId, name } = action.payload;
                state.allDirectories = state.allDirectories.map((dir) =>
                    dir.directoryId === directoryId ? { ...dir, name } : dir
                );
            })
            .addCase(renameDirectoryThunk.rejected, (state, action) => {
                state.error = action.payload;
            })

            // 🟢 Delete Directory (Remove from state)
            .addCase(deleteDirectoryThunk.fulfilled, (state, action) => {
                const { directoryId } = action.payload;
                state.allDirectories = state.allDirectories.filter((dir) => dir.directoryId !== directoryId);

                // If the deleted directory was selected, reset to "uncategorized"
                if (state.selectedDirectory === directoryId) {
                    state.selectedDirectory = "uncategorized";
                }
            })
            .addCase(deleteDirectoryThunk.rejected, (state, action) => {
                state.error = action.payload;
            })

            .addCase(selectDirectoryThunk.pending, (state) => {
                state.status = "loading";
            })
            .addCase(selectDirectoryThunk.fulfilled, (state, action) => {
                state.status = "succeeded";
            })
            .addCase(selectDirectoryThunk.rejected, (state, action) => {
                state.status = "failed";
            })

            // 🟢 Unselect directory when tag is clicked
            .addCase(toggleSelectedTagsThunk.fulfilled, (state, action) => {
                state.selectedDirectory = {}
            })
    }
});

export const { setSelectedDirectory, resetDirectoriesState, sortDirectories } = directorySlice.actions;
export default directorySlice.reducer;
