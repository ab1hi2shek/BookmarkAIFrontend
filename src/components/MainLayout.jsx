import React, { useState } from 'react';
import { Box } from '@mui/material';
import Breadcrumbs from '../components/others/Breadcrumbs';
import BookmarkCard from '../components/bookmark/BookmarkCard';
import AddBookmark from '../components/bookmark/AddBookmark';

const MainLayout = () => {

    return (
        <div style={{ flex: 1, padding: '16px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Breadcrumbs />
                <AddBookmark />
            </Box>
            <BookmarkCard />
        </div>
    );
};

export default MainLayout;