import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Drawer, List, ListItem, ListItemText, Collapse, Box, Menu, MenuItem, Typography, Button
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import TagIcon from '@mui/icons-material/Tag';
import TagList from '../tag/TagList';
import { sortTags } from '../../features/tags/tagsSlice';

const SideBar = () => {
    const dispatch = useDispatch();

    const [filtersVisible, setFiltersVisible] = useState(() => JSON.parse(localStorage.getItem("filtersVisible")) ?? true);
    const [tagsVisible, setTagsVisible] = useState(() => JSON.parse(localStorage.getItem("tagsVisible")) ?? true);

    const [tagsMenuAnchor, setTagsMenuAnchor] = useState(null);
    const tagsMenuButtonRef = useRef(null); // ✅ Ref to track button position

    const { favoriteBookmarksCount, bookmarksWithNotesCount, bookmarksWithNoTags } = useSelector((state) => {
        let favoriteCount = 0;
        let notesCount = 0;
        let noTagsCount = 0;

        state.bookmarks.allBookmarks.forEach((b) => {
            if (b.isFavorite) favoriteCount++;
            if (b.notes && b.notes.trim() !== "") notesCount++;
            if (!b.tags || b.tags.length === 0) noTagsCount++;
        });

        return {
            favoriteBookmarksCount: favoriteCount,
            bookmarksWithNotesCount: notesCount,
            bookmarksWithNoTags: noTagsCount,
        };
    });



    const handleToggleFilters = () => {
        const newState = !filtersVisible;
        setFiltersVisible(newState);
        localStorage.setItem("filtersVisible", JSON.stringify(newState));
    };

    const handleTagsMenuOpen = (event) => {
        setTagsMenuAnchor(event.currentTarget);
    };

    const handleTagsMenuClose = () => {
        setTagsMenuAnchor(null);
    };

    const handleToggleTags = () => {
        const newState = !tagsVisible;
        setTagsVisible(newState);
        localStorage.setItem("tagsVisible", JSON.stringify(newState));
        setTagsMenuAnchor(null); // ✅ Close menu when toggling
    };

    const handleSortTags = (sortBy) => {
        dispatch(sortTags({ sortBy }));
        setTagsMenuAnchor(null);
    }

    return (
        <Drawer
            variant="persistent"
            anchor="left"
            open={true}
            sx={{
                width: 250,
                flexShrink: 0,
                position: "fixed",
                right: 0,
                '& .MuiDrawer-paper': {
                    width: 250,
                    boxSizing: 'border-box',
                    marginTop: '64px',
                    marginBottom: '64px',
                    paddingRight: '8px',
                    position: 'fixed',
                    right: 0
                },
            }}
        >
            {/* Filters Section */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '4px 12px',
                    marginTop: '20px',
                    marginBottom: filtersVisible ? '8px' : '0px'
                }}
            >
                <Typography variant="subtitle1" sx={{ fontSize: '0.9rem', fontWeight: 500 }}>Filters</Typography>
                <Button
                    size="small"
                    sx={{
                        backgroundColor: "rgba(219, 194, 143, 0.8)",
                        fontSize: "0.6rem",
                        padding: "1px 6px",
                        borderRadius: "3px",
                        minWidth: "20px",     // 🔹 Ensures button remains compact
                        height: "20px",
                        color: "black",
                        '&:hover': { backgroundColor: "rgba(219, 194, 143, 1)" }
                    }}
                    onClick={handleToggleFilters}
                >
                    {filtersVisible ? "Hide" : "Show"}
                </Button>
            </Box>

            <Collapse in={filtersVisible} timeout="auto" unmountOnExit>
                <List sx={{ paddingLeft: 1 }}>
                    <ListItem button onClick={() => console.log("Favorites clicked")} sx={{ padding: '4px 8px' }}>
                        <FavoriteBorderIcon sx={{ color: 'red', fontSize: '0.85rem', marginRight: 1 }} />
                        <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                            <ListItemText primary="Favorites" primaryTypographyProps={{ fontSize: '0.85rem' }} />
                            <Typography variant="caption" sx={{ fontSize: '0.75rem', color: 'gray', marginLeft: 1 }}>
                                ({favoriteBookmarksCount})
                            </Typography>
                        </Box>
                    </ListItem>
                    <ListItem button onClick={() => console.log("Notes clicked")} sx={{ padding: '4px 8px' }}>
                        <DescriptionOutlinedIcon sx={{ fontSize: '0.85rem', marginRight: 1 }} />
                        <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                            <ListItemText primary="With Notes" primaryTypographyProps={{ fontSize: '0.85rem' }} />
                            <Typography variant="caption" sx={{ fontSize: '0.75rem', color: 'gray', marginLeft: 1 }}>
                                ({bookmarksWithNotesCount})
                            </Typography>
                        </Box>
                    </ListItem>
                    <ListItem button onClick={() => console.log("Without Tags clicked")} sx={{ padding: '4px 8px' }}>
                        <TagIcon sx={{ fontSize: '0.85rem', marginRight: 1 }} />
                        <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                            <ListItemText primary="Without Tags" primaryTypographyProps={{ fontSize: '0.85rem' }} />
                            <Typography variant="caption" sx={{ fontSize: '0.75rem', color: 'gray', marginLeft: 1 }}>
                                ({bookmarksWithNoTags})
                            </Typography>
                        </Box>
                    </ListItem>
                </List>
            </Collapse>

            {/* Space Between Filters & Tags */}
            {filtersVisible && <Box sx={{ height: '8px' }} />}

            {/* Tags Section */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '8px 12px',
                    marginTop: filtersVisible ? '0px' : '8px'
                }}
            >
                <Typography variant="subtitle1" sx={{ fontSize: '0.9rem', fontWeight: 500 }}>Tags</Typography>

                {/* ✅ Always show "..." button */}
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
                    {tagsVisible ? "Options" : "Show"}
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
                <TagList />
            </Collapse>
        </Drawer>
    );
};

export default SideBar;
