import React from 'react';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import SideBar from '../components/Sidebar';
import SideBarClosed from '../components/SideBarClosed';
import RightSideBar from '../components/RightSideBar';
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
                {isLeftSideBarOpen ? <SideBar /> : <SideBarClosed />}

                <div style={styles.mainContent(isLeftSideBarOpen, isRightSideBarOpen)}>
                    <MainLayout />
                </div>

                {/* Right Sidebar */}
                {isRightSideBarOpen && <RightSideBar />}
            </div>
        </div>
    );
};

export default Home;