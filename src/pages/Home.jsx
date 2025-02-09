import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box } from "@mui/material";
import Header from '../components/others/Header';
import Breadcrumbs from '../components/others/Breadcrumbs';
import AddBookmark from '../components/bookmark/AddBookmark';
import BookmarkCard from '../components/bookmark/BookmarkCard';
import SideBar from '../components/sidebar/Sidebar';
import RightSideBar from '../components/sidebar/RightSideBar';
import SocialLogin from '../components/others/SocialLogin';
import styles from './HomeStyles';
import { fetchBookmarksThunk } from '../features/bookmarksSlice'

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
                <SideBar />

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