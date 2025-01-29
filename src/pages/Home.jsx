import React from 'react';
import { useSelector } from 'react-redux';
import Header from '../components/others/Header';
import SideBar from '../components/sidebar/Sidebar';
import RightSideBar from '../components/sidebar/RightSideBar';
import MainLayout from '../components/MainLayout';
import styles from './HomeStyles';

const Home = () => {
    const isLeftSideBarOpen = useSelector((state) => state.sidebar.isLeftSidebarOpen);
    const isRightSideBarOpen = useSelector((state) => state.sidebar.isRightSidebarOpen);

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