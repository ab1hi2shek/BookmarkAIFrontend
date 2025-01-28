import React from 'react';
import { List, ListItem, ListItemText, ListItemButton } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectFilteredBookmarks } from '../features/bookmarks/bookmarksSelectors';

const BookmarkList = ({ onBookmarkClick }) => {
    const filteredBookmarks = useSelector(selectFilteredBookmarks);

    return (
        <List>
            {filteredBookmarks.map((bookmark) => (
                <ListItem key={bookmark.id}>
                    <ListItemButton onClick={() => onBookmarkClick(bookmark)}>
                        <ListItemText primary={bookmark.title} />
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
    );
};

export default BookmarkList;