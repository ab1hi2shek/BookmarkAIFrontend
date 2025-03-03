import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box } from "@mui/material";
import Header from '../components/header/Header';
import MainLayout from '../components/mainLayout/MainLayout';
import RightSideBar from '../components/sidebar/RightSideBar/RightSideBar';
import SocialLogin from '../components/authentication/SocialLogin';
import styles from './styles/HomeStyles';
import { fetchBookmarksThunk } from '../redux/features/bookmarksSlice'
import LeftSideBar from '../components/sidebar/LeftSideBar/LeftSideBar';
import SecondaryHeader from '../components/secondaryHeader/SecondaryHeader';
import LoadingSkeleton from '../components/common/LoadingSkeleton';

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
                <LeftSideBar />

                {/* 🟢 Main Content (Previously in `MainLayout`) */}
                <div style={styles.mainContent(isRightSideBarOpen)}>
                    <SecondaryHeader />
                    <MainLayout bookmarks={allBookmarks} />
                </div>

                {/* Right Sidebar */}
                {isRightSideBarOpen && <RightSideBar />}
            </div>
        </div>
    );
};

export default Home;