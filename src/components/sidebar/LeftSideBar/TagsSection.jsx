import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import {
    Collapse, Box, Menu, MenuItem, Typography, Button
} from '@mui/material';
import TagList from '../../tag/TagList';
import { sortTags } from '../../../features/tagsSlice';

const TagsSection = ({ tagSelected = null }) => {
    const dispatch = useDispatch();
    const [tagsVisible, setTagsVisible] = useState(() => JSON.parse(localStorage.getItem("tagsVisible")) ?? true);
    const [tagsMenuAnchor, setTagsMenuAnchor] = useState(null);
    const tagsMenuButtonRef = useRef(null); // Ref to track button position


    const handleToggleTags = () => {
        const newState = !tagsVisible;
        setTagsVisible(newState);
        localStorage.setItem("tagsVisible", JSON.stringify(newState));
        setTagsMenuAnchor(null); // Close menu when toggling
    };

    const handleSortTags = (sortBy) => {
        dispatch(sortTags({ sortBy }));
        setTagsMenuAnchor(null);
    }

    const handleTagsMenuOpen = (event) => {
        setTagsMenuAnchor(event.currentTarget);
    };

    const handleTagsMenuClose = () => {
        setTagsMenuAnchor(null);
    };

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '8px 12px',
                    marginBottom: tagsVisible ? '0px' : '8px'
                }}
            >
                <Typography variant="subtitle1" sx={{ fontSize: '0.9rem', fontWeight: 500 }}>Tags</Typography>

                <Button
                    size="small"
                    ref={tagsMenuButtonRef}
                    sx={{
                        backgroundColor: "rgba(219, 194, 143, 0.8)",
                        fontSize: "0.6rem",  // 🔹 Slightly smaller font
                        padding: "1px 6px",   // 🔹 Reduced padding
                        borderRadius: "3px",  // 🔹 Smaller border radius
                        minWidth: "20px",     // 🔹 Ensures button remains compact
                        height: "20px",       // 🔹 Forces a smaller height
                        color: "black",
                        '&:hover': { backgroundColor: "rgba(219, 194, 143, 1)" }
                    }}
                    onClick={tagsVisible ? handleTagsMenuOpen : handleToggleTags}
                >
                    {tagsVisible ? "..." : "Show"}
                </Button>
            </Box>

            {/* Tags Menu (Always Opens Bottom-Right of "..." Button) */}
            <Menu
                anchorEl={tagsMenuButtonRef.current} // ✅ Ensure correct positioning
                open={Boolean(tagsMenuAnchor)}
                onClose={handleTagsMenuClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                PaperProps={{ sx: { mt: 1 } }} // ✅ Small margin to separate from button
                MenuListProps={{ sx: { padding: 0 } }}
            >
                <MenuItem
                    onClick={handleToggleTags}
                    sx={{
                        fontSize: "0.8rem",
                        padding: "6px 12px",
                        '&:hover': { backgroundColor: "rgba(219, 194, 143, 0.8)" }
                    }}
                >
                    {tagsVisible ? "Hide" : "Show"}
                </MenuItem>
                <MenuItem
                    onClick={() => handleSortTags("alphabetical")}
                    sx={{
                        fontSize: "0.8rem",
                        padding: "6px 12px",
                        '&:hover': { backgroundColor: "rgba(219, 194, 143, 0.8)" }
                    }}
                >
                    Sort alphabetically
                </MenuItem>
                <MenuItem
                    onClick={() => handleSortTags("bookmarks")}
                    sx={{
                        fontSize: "0.8rem",
                        padding: "6px 12px",
                        '&:hover': { backgroundColor: "rgba(219, 194, 143, 0.8)" }
                    }}
                >
                    Sort by bookmarks
                </MenuItem>
            </Menu>

            <Collapse in={tagsVisible} timeout="auto" unmountOnExit>
                <TagList tagSelected={tagSelected} />
            </Collapse>
        </>
    );
};

export default TagsSection;
