import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Box } from "@mui/material";
import Header from '../components/header/Header';
import SecondaryHeader from '../components/secondaryHeader/SecondaryHeader';
import MainLayout from '../components/mainLayout/MainLayout';
import LeftSideBar from '../components/sidebar/LeftSideBar/LeftSideBar';
import RightSideBar from '../components/sidebar/RightSideBar/RightSideBar';
import SocialLogin from '../components/authentication/SocialLogin';
import styles from './styles/HomeStyles';
import { fetchBookmarksByFilterThunk } from '../redux/features/filterBookmarksSlice';
import { setSelectedItem } from '../redux/features/urlSelectionSlice';
import LoadingSkeleton from '../components/common/LoadingSkeleton';

const BookmarksWithFilters = () => {

    const { filterType } = useParams();
    const dispatch = useDispatch();
    const isRightSideBarOpen = useSelector((state) => state.sidebar.isRightSidebarOpen);
    const { user, loading } = useSelector((state) => state.user);
    const filteredBookmarks = useSelector((state) => state.filterBookmarks.filteredBookmarks);


    useEffect(() => {
        if (filterType && user?.uid) {
            dispatch(fetchBookmarksByFilterThunk({ userId: user.uid, filterType: filterType }));
            dispatch(setSelectedItem({ type: 'filter', value: filterType }));
        }
    }, [filterType, user, dispatch]);

    if (loading) {
        return <LoadingSkeleton />;
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
                    <SecondaryHeader />
                    <MainLayout bookmarks={filteredBookmarks} />
                </div>

                {/* Right Sidebar */}
                {isRightSideBarOpen && <RightSideBar />}
            </div>
        </div>
    );
};

export default BookmarksWithFilters;