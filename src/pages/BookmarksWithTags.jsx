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
import styles from './styles/HomeStyles';
import { fetchBookmarksByTagThunk } from '../redux/features/tagsSlice';
import { setSelectedItem } from '../redux/features/urlSelectionSlice';
import LoadingSkeleton from '../components/common/LoadingSkeleton';

const BookmarksWithTags = () => {

    const { tagId } = useParams();
    const dispatch = useDispatch();
    const isRightSideBarOpen = useSelector((state) => state.sidebar.isRightSidebarOpen);
    const { user, loading } = useSelector((state) => state.user);
    const tagsBookmarks = useSelector((state) => state.tags.tagsBookmarks);


    useEffect(() => {
        if (tagId && user?.uid) {
            dispatch(fetchBookmarksByTagThunk({ userId: user.uid, tagId: tagId }));
            dispatch(setSelectedItem({ type: 'tag', value: tagId }));
        }
    }, [tagId, user, dispatch]);

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
                <LeftSideBar tagSelected={tagId} />

                {/* 🟢 Main Content (Previously in `MainLayout`) */}
                <div style={styles.mainContent(isRightSideBarOpen)}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Breadcrumbs />
                        <AddBookmark />
                    </Box>
                    <MainLayout bookmarks={tagsBookmarks} />
                </div>

                {/* Right Sidebar */}
                {isRightSideBarOpen && <RightSideBar />}
            </div>
        </div>
    );
};

export default BookmarksWithTags;