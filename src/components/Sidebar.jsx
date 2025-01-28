import React from 'react';
import { Drawer, List, ListItem, ListItemText, IconButton, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import TagList from './TagList';
import BookmarkList from './BookmarkList';

const SideBar = ({ onCloseSidebar, onBookmarkClick, onTagClick, selectedTags, onEditTag, onDeleteTag }) => {
    return (
        <Drawer
            variant="persistent"
            open={true}
            sx={{
                width: 240, // Fixed width for the sidebar
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: 240, // Fixed width for the sidebar
                    boxSizing: 'border-box',
                    marginTop: '64px', // Adjust based on header height
                },
            }}
        >
            <IconButton
                onClick={onCloseSidebar}
                sx={{ position: 'relative', top: 8, left: 8, zIndex: 1200 }}
            >
                <MenuIcon />
            </IconButton>
            <List>
                <ListItem>
                    <ListItemText primary="Tags" />
                </ListItem>
                <TagList
                    onTagClick={onTagClick}
                    selectedTags={selectedTags}
                    onEditTag={onEditTag}
                    onDeleteTag={onDeleteTag}
                />
                <Divider />
                <ListItem>
                    <ListItemText primary="Bookmarks" />
                </ListItem>
                <BookmarkList onBookmarkClick={onBookmarkClick} />
            </List>
        </Drawer>
    );
};

export default SideBar;