import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Box } from "@mui/material";
import Header from '../components/header/Header';
import SecondaryHeader from '../components/secondaryHeader/SecondaryHeader';
import MainLayout from '../components/mainLayout/MainLayout';
import LeftSideBar from '../components/sidebar/LeftSideBar/LeftSideBar';
import RightSideBar from '../components/sidebar/RightSideBar/RightSideBar';
import SocialLogin from '../components/authentication/SocialLogin';
import styles from './styles/HomeStyles';
import { fetchDirectoryBookmarksThunk } from '../redux/features/directorySlice';
import { setSelectedItem } from '../redux/features/urlSelectionSlice';
import LoadingSkeleton from '../components/common/LoadingSkeleton';

const BookmarksWithDirectory = () => {
    const { directoryId } = useParams();
    const dispatch = useDispatch();
    const isRightSideBarOpen = useSelector((state) => state.sidebar.isRightSidebarOpen);
    const { user, loading } = useSelector((state) => state.user);
    const directoryBookmarks = useSelector((state) => state.directories.directoryBookmarks);

    useEffect(() => {
        if (directoryId && user?.uid) {
            dispatch(fetchDirectoryBookmarksThunk({ userId: user.uid, directoryId }));
            dispatch(setSelectedItem({ type: 'directory', value: directoryId }));
        }
    }, [directoryId, user, dispatch]);

    if (loading) return <LoadingSkeleton />;

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
                    <SecondaryHeader />
                    <MainLayout bookmarks={directoryBookmarks} />
                </div>
                {isRightSideBarOpen && <RightSideBar />}
            </div>
        </div>
    );
};

export default BookmarksWithDirectory;
