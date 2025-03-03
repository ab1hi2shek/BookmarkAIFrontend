import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, Button, TextField, Chip, List, MenuItem, Select, FormControl, InputLabel, ListItem } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { closeRightSideBar } from '../../../redux/features/sidebarSlice';
import { updateBookmarkThunk } from '../../../redux/features/bookmarksSlice';
import { fetchDirectoriesThunk } from '../../../redux/features/directorySlice';
import AddIcon from '@mui/icons-material/Add';

const EditBookmark = () => {
    const dispatch = useDispatch();
    const bookmarkToEdit = useSelector((state) => state.sidebar.bookmarkToEdit);
    const user = useSelector((state) => state.user.user);
    const directories = useSelector((state) => state.directories.allDirectories); // Fetch directories

    const [title, setTitle] = useState(bookmarkToEdit?.title || '');
    const [notes, setNotes] = useState(bookmarkToEdit?.notes || '');
    const [tags, setTags] = useState(bookmarkToEdit?.tags || []);
    const [newTag, setNewTag] = useState('');
    const [selectedDirectory, setSelectedDirectory] = useState(bookmarkToEdit.directoryId || '');
    const [recentTags, setRecentTags] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const generatedTags = bookmarkToEdit?.generatedTags || [];

    useEffect(() => {
        setTitle(bookmarkToEdit?.title || '');
        setNotes(bookmarkToEdit?.notes || '');
        setTags(bookmarkToEdit?.tags || []);
        setSelectedDirectory(bookmarkToEdit?.directoryId || '');

        if (directories.length === 0) {
            dispatch(fetchDirectoriesThunk({ userId: user?.uid }));
        }
    }, [bookmarkToEdit, dispatch, user]);

    useEffect(() => {
        const storedTags = JSON.parse(localStorage.getItem("recentTags")) || [];
        const recentTagsRemovingCurrent = storedTags.filter(tag => !(bookmarkToEdit?.tags || []).includes(tag));
        setRecentTags(recentTagsRemovingCurrent);
    }, [bookmarkToEdit]);

    const handleWhenCloseRightSideBar = () => {
        dispatch(closeRightSideBar());
    };

    const handleSaveClick = () => {
        const updatedBookmark = {
            ...bookmarkToEdit,
            title,
            notes,
            tags,
            directoryId: selectedDirectory, // ✅ Updated directory ID
        };
        dispatch(updateBookmarkThunk({ userId: user.uid, updatedBookmark }));
        saveRecentTags(tags);
        handleWhenCloseRightSideBar();
    };

    const saveRecentTags = (newTags) => {
        const existingTags = JSON.parse(localStorage.getItem("recentTags")) || [];
        const updatedTags = [...new Set([...newTags, ...existingTags])].slice(0, 5); // Keep only 10 unique tags
        localStorage.setItem("recentTags", JSON.stringify(updatedTags));
    };

    const handleTagDelete = (tagToDelete) => {
        setTags(tags.filter(tag => tag !== tagToDelete));

        // Retrieve stored recent tags
        const storedTags = JSON.parse(localStorage.getItem("recentTags")) || [];

        // If the deleted tag is in storedTags, add it back to recentTags
        if (storedTags.includes(tagToDelete)) {
            setRecentTags(prevRecentTags => {
                const updatedTags = [tagToDelete, ...prevRecentTags.filter(tag => tag !== tagToDelete)];
                return updatedTags.slice(0, 5); // Keep only the top 5 recent tags
            });
        }
    };

    const handleTagKeyPress = (e) => {
        const trimmedNewTag = newTag.trim();
        if (e.key === 'Enter' && trimmedNewTag !== '') {
            if (!tags.includes(trimmedNewTag)) {
                setTags([...tags, trimmedNewTag]);

                setRemoveTagFromSuggestion(trimmedNewTag);
            }
            setNewTag('');
            e.preventDefault();
        }
    };

    const setRemoveTagFromSuggestion = (tag) => {
        const updatedRecentTags = recentTags.filter(t => t !== tag);
        setRecentTags(updatedRecentTags);
    }

    const handleGeneratedTagClick = (tag) => {
        const trimmedTag = tag.trim();
        if (!tags.includes(trimmedTag)) {
            setTags([...tags, trimmedTag]);
        }
    };

    return (
        <Box sx={{ padding: '16px' }}>

            <TextField
                label="Title"
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                sx={{
                    marginBottom: '24px',
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: 'rgb(199, 165, 98)' },
                        '&:hover fieldset': { borderColor: 'rgb(231, 162, 24)' },
                        '&.Mui-focused fieldset': { borderColor: 'rgba(192, 137, 27, 1)' },
                    },
                }}
            />

            <TextField
                label="Notes"
                fullWidth
                multiline
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                sx={{
                    marginBottom: '24px',
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: 'rgb(199, 165, 98)' },
                        '&:hover fieldset': { borderColor: 'rgb(231, 162, 24)' },
                        '&.Mui-focused fieldset': { borderColor: 'rgba(192, 137, 27, 1)' },
                    },
                }}
            />

            {/* ✅ Directory Dropdown */}
            <FormControl fullWidth sx={{ marginBottom: '24px' }}>
                <InputLabel>Directory</InputLabel>
                <Select
                    value={selectedDirectory}
                    onChange={(e) => setSelectedDirectory(e.target.value)}
                    label="Directory"
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': { borderColor: 'rgb(199, 165, 98)' },
                            '&:hover fieldset': { borderColor: 'rgb(231, 162, 24)' },
                            '&.Mui-focused fieldset': { borderColor: 'rgba(192, 137, 27, 1)' },
                        },
                    }}
                >

                    <MenuItem key="uncategorized" value="uncategorized">
                        uncategorized
                    </MenuItem>
                    {directories.map((directory) => (
                        <MenuItem key={directory.directoryId} value={directory.directoryId}>
                            {directory.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            {/* Tags */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, marginBottom: '8px' }}>
                {tags.map((tag, index) => (
                    <Chip
                        key={index}
                        label={tag}
                        onDelete={() => handleTagDelete(tag)}
                        deleteIcon={<CloseIcon />}
                        size="small"
                        sx={{ backgroundColor: 'rgba(219, 194, 143, 0.8)' }}
                    />
                ))}
            </Box>

            <TextField
                label="Add Tag"
                fullWidth
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={handleTagKeyPress}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setShowSuggestions(false)}
                sx={{
                    marginBottom: '0px',
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: 'rgb(199, 165, 98)' },
                        '&:hover fieldset': { borderColor: 'rgb(231, 162, 24)' },
                        '&.Mui-focused fieldset': { borderColor: 'rgba(192, 137, 27, 1)' },
                    },
                }}
            />
            {/* Suggestions Dropdown */}
            {showSuggestions && recentTags.length > 0 && (
                <Box sx={{
                    position: "relative",
                    width: "94%",
                    backgroundColor: "rgba(237, 232, 232, 0)",
                    padding: 1,
                    borderRadius: "4px",
                    border: "1px solid rgb(199, 165, 98)",
                    boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
                    zIndex: 10
                }}>
                    <Typography variant="caption" sx={{ color: "gray" }}>
                        Recently used tags
                    </Typography>
                    <List>
                        {recentTags.map((tag, index) => (
                            <ListItem
                                key={index}
                                button
                                onMouseDown={() => {
                                    setTags([...tags, tag]);
                                    setNewTag('');
                                    setRemoveTagFromSuggestion(tag);
                                }}
                                sx={{ fontSize: "0.85rem", padding: "4px 6px", '&:hover': { backgroundColor: "rgba(244, 229, 201, 0.8)" } }}
                            >
                                {tag}
                            </ListItem>
                        ))}
                    </List>
                </Box>
            )}

            {/* Generated Tags Section */}
            {generatedTags.length > 0 && (
                <Box sx={{ marginTop: '16px' }}>
                    <Typography variant="caption" sx={{ color: "gray" }}>
                        Suggested Tags
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {generatedTags.map((tag, index) => (
                            <Chip
                                key={index}
                                label={tag}
                                icon={<AddIcon />}
                                onClick={() => handleGeneratedTagClick(tag)}
                                size="small"
                                sx={{
                                    cursor: "pointer",
                                    backgroundColor: 'rgba(235, 206, 149, 0.8)',
                                    '&:hover': { backgroundColor: 'rgba(246, 172, 12, 0.8)' }
                                }}
                            />
                        ))}
                    </Box>
                </Box>
            )}

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '24px' }}>
                <Button variant="contained" onClick={handleSaveClick}>
                    Save
                </Button>
                <Button variant="outlined" onClick={handleWhenCloseRightSideBar}>
                    Cancel
                </Button>
            </Box>
        </Box>
    );
};

export default EditBookmark;
