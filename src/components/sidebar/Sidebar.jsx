import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Drawer, List, ListItem, ListItemText, IconButton, Collapse, Box } from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TagList from '../tag/TagList';
import { closeLeftSideBar } from '../../features/sidebar/sidebarSlice';

const SideBar = () => {

    const [tagsOpen, setTagsOpen] = useState(true); // State to toggle tags section
    const [bookmarksOpen, setBookmarksOpen] = useState(false); // State to toggle bookmark section

    const dispatch = useDispatch();

    const handleWhenCloseLeftSideBar = () => {
        dispatch(closeLeftSideBar());
    }

    const handleToggleTags = () => {
        setTagsOpen((prev) => !prev);
    };

    const handleToggleBookmarks = () => {
        setBookmarksOpen((prev) => !prev);
    };

    return (
        <Drawer
            variant="persistent"
            anchor='left'
            open={true}
            sx={{
                width: 250, // Fixed width for the sidebar
                flexShrink: 0,
                position: "fixed",
                right: 0,
                '& .MuiDrawer-paper': {
                    width: 250, // Fixed width for the sidebar
                    boxSizing: 'border-box',
                    marginTop: '64px', // Adjust based on header height
                    marginBottom: '64px',
                    paddingRight: '8px',
                    position: 'fixed',
                    right: 0
                },
            }}
        >
            {/* <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: '8px', marginBottom: '10px' }}>
                <IconButton onClick={handleWhenCloseLeftSideBar} sx={{ borderRadius: 0 }}>
                    <MenuIcon />
                </IconButton>
            </Box> */}

            <List sx={{ marginBottom: '100px' }}>
                {/* Tags Section with Expand/Collapse */}
                <ListItem
                    button
                    onClick={handleToggleTags}
                    sx={{
                        // border: '0.2px solid #ccc', // Light border
                        // borderRadius: 1,
                        margin: '4px',
                    }}
                >
                    <ListItemText primary="Tags" />
                    {tagsOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </ListItem>
                <Collapse in={tagsOpen} timeout="auto" unmountOnExit>
                    <TagList />
                </Collapse>
            </List>
        </Drawer>
    );
};

export default SideBar;