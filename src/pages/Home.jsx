import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Header from '../components/others/Header';
import SideBar from '../components/sidebar/Sidebar';
import RightSideBar from '../components/sidebar/RightSideBar';
import MainLayout from '../components/MainLayout';
import SocialLogin from '../components/others/SocialLogin';
import styles from './HomeStyles';
import { auth } from '../firebaseConfig';
import { createUser } from '../services/userService';

const Home = () => {
    const isRightSideBarOpen = useSelector((state) => state.sidebar.isRightSidebarOpen);
    const { user, loading } = useSelector((state) => state.user);

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

                <div style={styles.mainContent(isRightSideBarOpen)}>
                    <MainLayout />
                </div>

                {/* Right Sidebar */}
                {isRightSideBarOpen && <RightSideBar />}
            </div>
        </div>
    );
};

export default Home;