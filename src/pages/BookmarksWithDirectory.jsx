import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Box } from "@mui/material";
import Header from '../components/others/Header';
import Breadcrumbs from '../components/others/Breadcrumbs';
import AddBookmark from '../components/bookmark/AddBookmark';
import BookmarkCard from '../components/bookmark/BookmarkCard';
import LeftSideBar from '../components/sidebar/LeftSideBar/LeftSideBar';
import RightSideBar from '../components/sidebar/RightSideBar/RightSideBar';
import SocialLogin from '../components/others/SocialLogin';
import styles from './HomeStyles';
import { fetchDirectoryBookmarksThunk } from '../features/directorySlice';

const BookmarksWithDirectory = () => {
    const { directoryId } = useParams();
    const dispatch = useDispatch();
    const isRightSideBarOpen = useSelector((state) => state.sidebar.isRightSidebarOpen);
    const { user, loading } = useSelector((state) => state.user);
    const directoryBookmarks = useSelector((state) => state.directories.directoryBookmarks);

    useEffect(() => {
        if (directoryId && user?.uid) {
            dispatch(fetchDirectoryBookmarksThunk({ userId: user.uid, directoryId }));
        }
    }, [directoryId, user, dispatch]);

    if (loading) return <div>Loading...</div>;

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
                <LeftSideBar directorySelected={directoryId} />
                <div style={styles.mainContent(isRightSideBarOpen)}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Breadcrumbs />
                        <AddBookmark />
                    </Box>
                    <BookmarkCard bookmarks={directoryBookmarks} />
                </div>
                {isRightSideBarOpen && <RightSideBar />}
            </div>
        </div>
    );
};

export default BookmarksWithDirectory;
