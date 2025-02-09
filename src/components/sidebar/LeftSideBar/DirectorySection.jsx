import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import {
    Collapse, Box, Menu, MenuItem, Typography, Button,
    Divider
} from '@mui/material';
import DirectoryList from './DirectoryList';
import { sortDirectories } from '../../../features/directorySlice';

const DirectorySection = ({ directorySelected = null }) => {
    const dispatch = useDispatch();
    const [directoryVisible, setDirectoryVisible] = useState(() => JSON.parse(localStorage.getItem("directoryVisible")) ?? true);


    const [directoryMenuAnchor, setDirectoryMenuAnchor] = useState(null);
    const directoryMenuButtonRef = useRef(null); // Ref to track button position

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

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '8px 12px',
                    marginTop: directoryVisible ? '0px' : '8px'
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
                    {directoryVisible ? "Hide" : "Show"}
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
        </>
    );
};

export default DirectorySection;
