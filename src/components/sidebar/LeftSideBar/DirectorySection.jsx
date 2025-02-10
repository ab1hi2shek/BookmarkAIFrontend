import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Collapse, Box, Menu, MenuItem, Typography, Button,
    Divider, TextField, List, ListItem
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DirectoryList from './DirectoryList';
import { sortDirectories, createDirectoryThunk } from '../../../redux/features/directorySlice';

const DirectorySection = ({ directorySelected = null }) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user)
    const [directoryVisible, setDirectoryVisible] = useState(() => JSON.parse(localStorage.getItem("directoryVisible")) ?? true);


    const [directoryMenuAnchor, setDirectoryMenuAnchor] = useState(null);
    const directoryMenuButtonRef = useRef(null); // Ref to track button position

    const [showAddNewDirectoryField, setShowAddNewDirectoryField] = useState(false);
    const [addNewDirectoryName, setAddNewDirectoryName] = useState('');
    const inputRef = useRef(null);

    useEffect(() => {
        console.log("useEffect1")
        const handleClickOutside = (event) => {
            if (inputRef.current && !inputRef.current.contains(event.target)) {
                setShowAddNewDirectoryField(false);
                setAddNewDirectoryName("")
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        console.log("useEffect2")
        if (showAddNewDirectoryField && inputRef.current) {
            inputRef.current.focus();
        }
    }, [showAddNewDirectoryField]);

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
        setDirectoryMenuAnchor(null);
        setShowAddNewDirectoryField(true);
    }

    const handleAddNewDirectory = (e) => {
        if (e.key === 'Enter' && addNewDirectoryName.trim() !== '') {
            setShowAddNewDirectoryField(false);
            console.log(addNewDirectoryName);
            dispatch(createDirectoryThunk({ name: addNewDirectoryName, userId: user.uid }))

            setAddNewDirectoryName("");
        }
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

            {showAddNewDirectoryField && <List sx={{ padding: 1 }}>
                <ListItem
                    key="addNewDirectory"
                    dense
                    sx={{
                        padding: '2px 12px',
                        margin: '4px 0px',
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: 'transparent',
                        '&:hover': {
                            backgroundColor: 'transparent'
                        }
                    }}
                >
                    {/* Add Icon */}
                    <AddIcon sx={{ fontSize: '1rem', color: 'rgba(219, 194, 143, 0.8)', marginRight: '8px' }} />
                    <TextField
                        variant="standard"
                        fullWidth
                        value={addNewDirectoryName}
                        placeholder='New Directory'
                        onChange={(e) => setAddNewDirectoryName(e.target.value)}
                        onKeyDown={handleAddNewDirectory}
                        autoFocus
                        inputRef={inputRef}
                        sx={{ fontSize: '0.5rem', border: 'none', borderBottom: '2px solid rgba(219, 194, 143, 0.8)', pb: 0.5 }}
                        InputProps={{
                            disableUnderline: true,
                            sx: { fontSize: '0.8rem' }
                        }}
                    />
                </ListItem>
            </List >}

            <Collapse in={directoryVisible} timeout="auto" unmountOnExit>
                <DirectoryList directorySelected={directorySelected} />
            </Collapse>
        </>
    );
};

export default DirectorySection;
