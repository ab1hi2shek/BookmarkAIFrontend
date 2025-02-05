import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider, useDispatch } from "react-redux";
import { store } from "./app/store"; // Import Redux store
import { checkAuthStatus } from "./features/users/userSlice";
import Home from "./pages/Home";

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
            </Routes>
        </Router>
    );
};

export default App;
