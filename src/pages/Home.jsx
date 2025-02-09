import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box } from "@mui/material";
import Header from '../components/header/Header';
import AddBookmark from '../components/mainLayout/AddBookmark';
import BookmarkCard from '../components/mainLayout/BookmarkCard';
import RightSideBar from '../components/sidebar/RightSideBar/RightSideBar';
import SocialLogin from '../components/authentication/SocialLogin';
import styles from './HomeStyles';
import { fetchBookmarksThunk } from '../features/bookmarksSlice'
import LeftSideBar from '../components/sidebar/LeftSideBar/LeftSideBar';

const Home = () => {
    const dispatch = useDispatch();
    const isRightSideBarOpen = useSelector((state) => state.sidebar.isRightSidebarOpen);
    const { user, loading } = useSelector((state) => state.user);
    const allBookmarks = useSelector((state) => state.bookmarks.allBookmarks);

    useEffect(() => {
        if (user?.uid) {
            dispatch(fetchBookmarksThunk({ userId: user.uid }));
        }
    }, [user, dispatch]);

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
                <LeftSideBar />

                {/* 🟢 Main Content (Previously in `MainLayout`) */}
                <div style={styles.mainContent(isRightSideBarOpen)}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        {/* <Breadcrumbs /> */}
                        <AddBookmark />
                    </Box>
                    <BookmarkCard bookmarks={allBookmarks} />
                </div>

                {/* Right Sidebar */}
                {isRightSideBarOpen && <RightSideBar />}
            </div>
        </div>
    );
};

export default Home;