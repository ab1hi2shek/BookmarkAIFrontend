import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider, useDispatch } from "react-redux";
import { store } from "./app/store"; // Import Redux store
import { checkAuthStatus } from "./redux/features/userSlice";
import Home from "./pages/Home";
import BookmarksWithDirectory from "./pages/BookmarksWithDirectory";
import BookmarksWithTags from "./pages/BookmarksWithTags";
import BookmarksWithFilters from "./pages/BookmarksWithFilters"

function App() {
    return (
        <Provider store={store}>
            <AppContent />
        </Provider>
    );
}

const AppContent = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkAuthStatus()); // Check Firebase auth status on app load
    }, [dispatch]);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/bookmarks/directory/:directoryId" element={< BookmarksWithDirectory />} />
                <Route path="/bookmarks/tag/:tagId" element={< BookmarksWithTags />} />
                <Route path="/bookmarks/filter/:filterType" element={< BookmarksWithFilters />} />
            </Routes>
        </Router>
    );
};

export default App;
