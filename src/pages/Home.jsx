import React, { useState } from 'react';
import Header from '../components/Header';
import SideBar from '../components/Sidebar';
import SideBarClosed from '../components/SideBarClosed';
import MainLayout from '../components/MainLayout';

const Home = () => {
    const [selectedBookmark, setSelectedBookmark] = useState(null);
    const [selectedTags, setSelectedTags] = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleBookmarkClick = (bookmark) => {
        setSelectedBookmark(bookmark);
    };

    const handleOpenSidebar = () => {
        setIsSidebarOpen(true);
    };

    const handleCloseSidebar = () => {
        setIsSidebarOpen(false);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <Header />
            <div style={{ display: 'flex', flex: 1, marginTop: '64px' }}> {/* Adjust marginTop to match header height */}
                {isSidebarOpen ? (
                    <SideBar
                        onCloseSidebar={handleCloseSidebar}
                        onBookmarkClick={handleBookmarkClick}
                    />
                ) : (
                    <SideBarClosed onOpenSidebar={handleOpenSidebar} />
                )}
                <MainLayout
                    selectedBookmark={selectedBookmark}
                    isSidebarOpen={isSidebarOpen}
                />
            </div>
        </div>
    );
};

export default Home;