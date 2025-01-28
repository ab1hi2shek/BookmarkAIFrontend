import React, { useState } from 'react';
import Breadcrumbs from './Breadcrumbs';
import BookmarkCard from './BookmarkCard';

const MainLayout = () => {

    return (
        <div style={{ flex: 1, padding: '16px' }}>
            <Breadcrumbs />
            <BookmarkCard />
        </div>
    );
};

export default MainLayout;