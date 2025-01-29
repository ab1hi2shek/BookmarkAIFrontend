import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemText, IconButton, Divider, Collapse, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TagList from './TagList';
import BookmarkList from './BookmarkList';

const SideBar = ({ onCloseSidebar, onBookmarkClick }) => {

    const [tagsOpen, setTagsOpen] = useState(false); // State to toggle tags section
    const [bookmarksOpen, setBookmarksOpen] = useState(false); // State to toggle bookmark section

    const handleToggleTags = () => {
        setTagsOpen((prev) => !prev);
    };

    const handleToggleBookmarks = () => {
        setBookmarksOpen((prev) => !prev);
    };

    return (
        <Drawer
            variant="persistent"
            open={true}
            sx={{
                width: 250, // Fixed width for the sidebar
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: 250, // Fixed width for the sidebar
                    boxSizing: 'border-box',
                    marginTop: '64px', // Adjust based on header height
                    marginBottom: '64px',
                    paddingRight: '8px',
                },
            }}
        >
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: '8px', marginBottom: '10px' }}>
                <IconButton onClick={onCloseSidebar} sx={{ borderRadius: 0 }}>
                    <MenuIcon />
                </IconButton>
            </Box>

            <List sx={{ marginBottom: '100px' }}>
                {/* Tags Section with Expand/Collapse */}
                <ListItem
                    button
                    onClick={handleToggleTags}
                    sx={{
                        border: '0.2px solid #ccc', // Light border
                        borderRadius: 1,
                        margin: '4px',
                    }}
                >
                    <ListItemText primary="Tags" />
                    {tagsOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </ListItem>
                <Collapse in={tagsOpen} timeout="auto" unmountOnExit>
                    <TagList />
                </Collapse>

                {/* Bookmarks Section with Expand/Collapse */}
                <ListItem
                    button
                    onClick={handleToggleBookmarks}
                    sx={{
                        border: '0.2px solid #ccc', // Light border
                        borderRadius: 1,
                        margin: '4px',
                    }}
                >
                    <ListItemText primary="Bookmarks" />
                    {bookmarksOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </ListItem>
                <Collapse in={bookmarksOpen} timeout="auto" unmountOnExit>
                    <BookmarkList onBookmarkClick={onBookmarkClick} />
                </Collapse>
            </List>
        </Drawer>
    );
};

export default SideBar;