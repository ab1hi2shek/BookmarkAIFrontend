import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    Drawer, List, ListItem, ListItemText, Collapse, Box, Menu, MenuItem, Typography, Button,
    Divider
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import TagIcon from '@mui/icons-material/Tag';
import TagList from '../tag/TagList';
import DirectoryList from '../directory/DirectoryList';
import { sortTags } from '../../features/tagsSlice';
import { sortDirectories } from '../../features/directorySlice';
import { fetchBookmarksByFilterThunk } from '../../features/filterBookmarksSlice';

const SideBar = ({ directorySelected = null, tagSelected = null, filterSelected = null }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [filtersVisible, setFiltersVisible] = useState(() => JSON.parse(localStorage.getItem("filtersVisible")) ?? true);
    const [tagsVisible, setTagsVisible] = useState(() => JSON.parse(localStorage.getItem("tagsVisible")) ?? true);
    const [directoryVisible, setDirectoryVisible] = useState(() => JSON.parse(localStorage.getItem("directoryVisible")) ?? true);

    const [tagsMenuAnchor, setTagsMenuAnchor] = useState(null);
    const tagsMenuButtonRef = useRef(null); // Ref to track button position

    const [directoryMenuAnchor, setDirectoryMenuAnchor] = useState(null);
    const directoryMenuButtonRef = useRef(null); // Ref to track button position

    const user = useSelector((state) => state.user.user)

    // Optimize it using reselect.
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

    const handleDirectoryMenuOpen = (event) => {
        setDirectoryMenuAnchor(event.currentTarget);
    };

    const handleDirectoryMenuClose = () => {
        setDirectoryMenuAnchor(null);
    };

    const handleToggleDirectory = () => {
        const newState = !directoryVisible;
        setDirectoryVisible(newState);
        localStorage.setItem("directoryVisible", JSON.stringify(newState));
        setDirectoryMenuAnchor(null); // Close menu when toggling
    };

    const handleSortDirectory = (sortBy) => {
        dispatch(sortDirectories({ sortBy }));
        setDirectoryMenuAnchor(null);
    }

    const handleCreateNewDirectory = () => {
        console.log("handleSortDirectory");
        setDirectoryMenuAnchor(null);
    }


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

    const filterBookmarksForUI = (filterType) => {
        navigate(`/bookmarks/filter/${filterType}`);
    }

    const handleTagsMenuOpen = (event) => {
        setTagsMenuAnchor(event.currentTarget);
    };

    const handleTagsMenuClose = () => {
        setTagsMenuAnchor(null);
    };

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
                    right: 0,
                    borderRight: "1px solid rgb(180, 152, 97)"
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
                    <ListItem
                        button
                        onClick={() => filterBookmarksForUI("favorite")}
                        sx={{
                            padding: '4px 8px',
                            backgroundColor: filterSelected === "favorite" ? "rgba(244, 229, 201, 0.8)" : "transparent",
                            '&:hover': {
                                backgroundColor: "rgba(244, 229, 201, 0.8)" // ✅ Same color on hover
                            }
                        }}
                    >
                        <FavoriteBorderIcon sx={{ color: 'red', fontSize: '0.85rem', marginRight: 1 }} />
                        <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                            <ListItemText primary="Favorites" primaryTypographyProps={{ fontSize: '0.85rem' }} />
                            <Typography variant="caption" sx={{ fontSize: '0.75rem', color: 'gray', marginLeft: 1 }}>
                                ({favoriteBookmarksCount})
                            </Typography>
                        </Box>
                    </ListItem>
                    <ListItem
                        button
                        onClick={() => filterBookmarksForUI("with_notes")}
                        sx={{
                            padding: '4px 8px',
                            backgroundColor: filterSelected === "with_notes" ? "rgba(244, 229, 201, 0.8)" : "transparent",
                            '&:hover': {
                                backgroundColor: "rgba(244, 229, 201, 0.8)" // ✅ Same color on hover
                            }
                        }}
                    >
                        <DescriptionOutlinedIcon sx={{ fontSize: '0.85rem', marginRight: 1 }} />
                        <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                            <ListItemText primary="With Notes" primaryTypographyProps={{ fontSize: '0.85rem' }} />
                            <Typography variant="caption" sx={{ fontSize: '0.75rem', color: 'gray', marginLeft: 1 }}>
                                ({bookmarksWithNotesCount})
                            </Typography>
                        </Box>
                    </ListItem>
                    <ListItem
                        button
                        onClick={() => filterBookmarksForUI("without_tags")}
                        sx={{
                            padding: '4px 8px',
                            backgroundColor: filterSelected === "without_tags" ? "rgba(244, 229, 201, 0.8)" : "transparent",
                            '&:hover': {
                                backgroundColor: "rgba(244, 229, 201, 0.8)" // ✅ Same color on hover
                            }
                        }}
                    >
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

            {/* Space Between Filters & Directory */}
            {filtersVisible && <Box sx={{ height: '8px' }} />}

            {/* Directory Section */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '8px 12px',
                    marginTop: filtersVisible ? '0px' : '8px'
                }}
            >
                <Typography variant="subtitle1" sx={{ fontSize: '0.9rem', fontWeight: 500 }}>Directories</Typography>

                <Button
                    size="small"
                    ref={directoryMenuButtonRef}
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
                    onClick={directoryVisible ? handleDirectoryMenuOpen : handleToggleDirectory}
                >
                    {directoryVisible ? "..." : "Show"}
                </Button>
            </Box>

            {/* Directory Menu (Always Opens Bottom-Right of "..." Button) */}
            <Menu
                anchorEl={directoryMenuButtonRef.current} // ✅ Ensure correct positioning
                open={Boolean(directoryMenuAnchor)}
                onClose={handleDirectoryMenuClose}
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
                    onClick={handleToggleDirectory}
                    sx={{
                        fontSize: "0.8rem",
                        padding: "6px 12px",
                        '&:hover': { backgroundColor: "rgba(219, 194, 143, 0.8)" }
                    }}
                >
                    {tagsVisible ? "Hide" : "Show"}
                </MenuItem>
                <MenuItem
                    onClick={() => handleSortDirectory("alphabetical")}
                    sx={{
                        fontSize: "0.8rem",
                        padding: "6px 12px",
                        '&:hover': { backgroundColor: "rgba(219, 194, 143, 0.8)" }
                    }}
                >
                    Sort alphabetically
                </MenuItem>
                <MenuItem
                    onClick={() => handleSortDirectory("bookmarks")}
                    sx={{
                        fontSize: "0.8rem",
                        padding: "6px 12px",
                        '&:hover': { backgroundColor: "rgba(219, 194, 143, 0.8)" }
                    }}
                >
                    Sort by bookmarks
                </MenuItem>
                <Divider />
                <MenuItem
                    onClick={() => handleCreateNewDirectory()}
                    sx={{
                        fontSize: "0.8rem",
                        padding: "6px 12px",
                        '&:hover': { backgroundColor: "rgba(219, 194, 143, 0.8)" }
                    }}
                >
                    Create directory
                </MenuItem>
            </Menu>

            <Collapse in={directoryVisible} timeout="auto" unmountOnExit>
                <DirectoryList directorySelected={directorySelected} />
            </Collapse>

            {/* Space Between Directory & Tags */}
            {directoryVisible && <Box sx={{ height: '8px' }} />}

            {/* Tags Section */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '8px 12px',
                    marginTop: directoryVisible ? '0px' : '8px'
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
        </Drawer>
    );
};

export default SideBar;
