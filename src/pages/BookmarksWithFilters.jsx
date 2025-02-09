import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Box } from "@mui/material";
import Header from '../components/others/Header';
import Breadcrumbs from '../components/others/Breadcrumbs';
import AddBookmark from '../components/bookmark/AddBookmark';
import BookmarkCard from '../components/bookmark/BookmarkCard';
import LeftSideBar from '../components/sidebar/LeftSideBar/LeftSideBar';
import RightSideBar from '../components/sidebar/RightSideBar';
import SocialLogin from '../components/others/SocialLogin';
import styles from './HomeStyles';
import { fetchBookmarksByFilterThunk } from '../features/filterBookmarksSlice';

const BookmarksWithFilters = () => {

    const { filterType } = useParams();
    const dispatch = useDispatch();
    const isRightSideBarOpen = useSelector((state) => state.sidebar.isRightSidebarOpen);
    const { user, loading } = useSelector((state) => state.user);
    const filteredBookmarks = useSelector((state) => state.filterBookmarks.filteredBookmarks);


    useEffect(() => {
        if (filterType && user?.uid) {
            dispatch(fetchBookmarksByFilterThunk({ userId: user.uid, filterType: filterType }));
        }
    }, [filterType, user, dispatch]);

    if (loading) {
        return <div>Loading...</div>; // Show loading indicator
    }

    // 🔹 If the user is not logged in, show the login component
    if (!user) {
        return (
            <div style={styles.container}>
                <Header />
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <SocialLogin />
                </div>
            </div>
        );
    }

    return (

        <div style={styles.container}>
            <Header />

            <div style={styles.contentWrapper}>
                {/* Left Sidebar */}
                <LeftSideBar filterSelected={filterType} />

                {/* 🟢 Main Content (Previously in `MainLayout`) */}
                <div style={styles.mainContent(isRightSideBarOpen)}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Breadcrumbs />
                        <AddBookmark />
                    </Box>
                    <BookmarkCard bookmarks={filteredBookmarks} />
                </div>

                {/* Right Sidebar */}
                {isRightSideBarOpen && <RightSideBar />}
            </div>
        </div>
    );
};

export default BookmarksWithFilters;