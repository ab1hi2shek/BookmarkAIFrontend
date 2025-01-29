import React from 'react';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import SideBar from '../components/Sidebar';
import SideBarClosed from '../components/SideBarClosed';
import RightSideBar from '../components/RightSideBar';
import MainLayout from '../components/MainLayout';

const Home = () => {

    const isLeftSideBarOpen = useSelector((state) => state.sidebar.isLeftSidebarOpen);
    const isRightSideBarOpen = useSelector((state) => state.sidebar.isRightSidebarOpen);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <Header />

            <div style={{ display: 'flex', flex: 1, marginTop: '64px', position: 'relative' }}>
                {/* Left Sidebar */}
                {isLeftSideBarOpen ? <SideBar /> : <SideBarClosed />}

                <div style={{
                    flex: 1,
                    transition: 'margin-right 0.3s ease, margin-left 0.3s ease',
                    marginRight: isRightSideBarOpen ? '250px' : '0px',
                    marginLeft: isLeftSideBarOpen ? '250px' : '0px'
                }}>
                    <MainLayout />
                </div>

                {/* Right Sidebar */}
                {isRightSideBarOpen && <RightSideBar />}

            </div>
        </div>
    );
};

export default Home;