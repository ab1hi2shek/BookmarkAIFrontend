import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Box } from "@mui/material";
import Header from '../components/header/Header';
import Breadcrumbs from '../components/mainLayout/Breadcrumbs';
import AddBookmark from '../components/mainLayout/AddBookmark';
import MainLayout from '../components/mainLayout/MainLayout';
import LeftSideBar from '../components/sidebar/LeftSideBar/LeftSideBar';
import RightSideBar from '../components/sidebar/RightSideBar/RightSideBar';
import SocialLogin from '../components/authentication/SocialLogin';
import styles from './HomeStyles';
import { fetchBookmarksByFilterThunk } from '../redux/features/filterBookmarksSlice';

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
                    <MainLayout bookmarks={filteredBookmarks} />
                </div>

                {/* Right Sidebar */}
                {isRightSideBarOpen && <RightSideBar />}
            </div>
        </div>
    );
};

export default BookmarksWithFilters;