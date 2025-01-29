import React from 'react';
import { useDispatch } from 'react-redux';
import { List, ListItem, ListItemText, ListItemButton } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectFilteredBookmarks } from '../../features/bookmarks/bookmarksSelectors';
import { updateSelectedBookmark } from '../../features/bookmarks/bookmarksSlice';
import { openRightSideBar } from '../../features/sidebar/sidebarSlice';

const BookmarkList = () => {
    const filteredBookmarks = useSelector(selectFilteredBookmarks);

    const dispatch = useDispatch();

    const handleBookmarkClick = (bookmark) => {
        dispatch(updateSelectedBookmark(bookmark))
        dispatch(openRightSideBar());
    };

    return (
        <List sx={{ padding: 0 }}>
            {filteredBookmarks.map((bookmark) => (
                <ListItem key={bookmark.id} dense sx={{ padding: '2px 0' }}>
                    <ListItemButton onClick={() => handleBookmarkClick(bookmark)}>
                        <ListItemText sx={{ paddingTop: '1px', paddingBottom: '1px', paddingLeft: '0px', paddingRight: '0px' }}
                            primary={bookmark.title}
                            primaryTypographyProps={{
                                fontSize: '0.85rem', // Reduce font size
                                fontWeight: 350, // Reduce font weight
                            }} />
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
    );
};

export default BookmarkList;