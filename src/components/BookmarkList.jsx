import React, { useState } from 'react';
import { List, ListItem, ListItemText } from '@mui/material';
import { getBookmarksList } from '../data/bookmarkData';

const BookmarkList = ({ onBookmarkClick }) => {
    const bookmarks = getBookmarksList();

    return (
        <List>
            {bookmarks.map((bookmark) => (
                <ListItem
                    button
                    key={bookmark.id}
                    onClick={() => onBookmarkClick(bookmark)}
                >
                    <ListItemText primary={bookmark.title} />
                </ListItem>
            ))}
        </List>
    );
};

export default BookmarkList;