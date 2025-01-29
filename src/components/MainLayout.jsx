import React, { useState } from 'react';
import Breadcrumbs from './others/Breadcrumbs';
import BookmarkCard from './bookmark/BookmarkCard';

const MainLayout = () => {

    return (
        <div style={{ flex: 1, padding: '16px' }}>
            <Breadcrumbs />
            <BookmarkCard />
        </div>
    );
};

export default MainLayout;