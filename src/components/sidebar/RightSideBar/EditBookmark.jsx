import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, Button, TextField, Chip, IconButton, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { closeRightSideBar } from '../../../redux/features/sidebarSlice';
import { updateBookmarkThunk } from '../../../redux/features/bookmarksSlice';
import { fetchDirectoriesThunk } from '../../../redux/features/directorySlice';

const EditBookmark = () => {
    const dispatch = useDispatch();
    const bookmarkToEdit = useSelector((state) => state.sidebar.bookmarkToEdit);
    const user = useSelector((state) => state.user.user);
    const directories = useSelector((state) => state.directories.allDirectories); // Fetch directories

    const [title, setTitle] = useState(bookmarkToEdit?.title || '');
    const [notes, setNotes] = useState(bookmarkToEdit?.notes || '');
    const [tags, setTags] = useState(bookmarkToEdit?.tags || []);
    const [newTag, setNewTag] = useState('');
    const [selectedDirectory, setSelectedDirectory] = useState(bookmarkToEdit?.directoryId || '');

    useEffect(() => {
        setTitle(bookmarkToEdit?.title || '');
        setNotes(bookmarkToEdit?.notes || '');
        setTags(bookmarkToEdit?.tags || []);
        setSelectedDirectory(bookmarkToEdit?.directoryId || '');

        if (directories.length === 0) {
            dispatch(fetchDirectoriesThunk({ userId: user?.uid }));
        }
    }, [bookmarkToEdit, directories, dispatch, user]);

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
        handleWhenCloseRightSideBar();
    };

    const handleTagDelete = (tagToDelete) => {
        setTags(tags.filter(tag => tag !== tagToDelete));
    };

    const handleTagKeyPress = (e) => {
        if (e.key === 'Enter' && newTag.trim() !== '') {
            if (!tags.includes(newTag.trim())) {
                setTags([...tags, newTag.trim()]);
            }
            setNewTag('');
            e.preventDefault();
        }
    };

    return (
        <Box sx={{ padding: '16px' }}>
            <Typography variant="h6" sx={{ marginBottom: '30px', textAlign: 'center', width: '100%' }}>
                Edit Bookmark
            </Typography>

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
                rows={4}
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
                sx={{
                    marginBottom: '24px',
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: 'rgb(199, 165, 98)' },
                        '&:hover fieldset': { borderColor: 'rgb(231, 162, 24)' },
                        '&.Mui-focused fieldset': { borderColor: 'rgba(192, 137, 27, 1)' },
                    },
                }}
            />

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
