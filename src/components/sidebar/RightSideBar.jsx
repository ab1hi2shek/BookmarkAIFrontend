import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Drawer, Box, Typography, Button, TextField, Chip, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { closeRightSideBar } from '../../features/sidebar/sidebarSlice';
import { editBookmark } from '../../features/bookmarks/bookmarksSlice';

const RightSideBar = () => {
    const dispatch = useDispatch();
    const selectedBookmark = useSelector((state) => state.bookmarks.selectedBookmark);

    const [title, setTitle] = useState(selectedBookmark?.title || '');
    const [notes, setNotes] = useState(selectedBookmark?.notes || '');
    const [tags, setTags] = useState(selectedBookmark?.tags || []);
    const [newTag, setNewTag] = useState('');

    useEffect(() => {
        setTitle(selectedBookmark?.title || '');
        setNotes(selectedBookmark?.notes || '');
        setTags(selectedBookmark?.tags || []);
    }, [selectedBookmark]);

    const handleWhenCloseRightSideBar = () => {
        dispatch(closeRightSideBar());
    };

    const handleSaveClick = () => {
        const updatedBookmark = {
            ...selectedBookmark,
            title,
            notes,
            tags,
        };
        dispatch(editBookmark({ updatedBookmark }));
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
        <Drawer
            anchor="right"
            variant="persistent"
            open={true}
            sx={{
                width: 500,
                flexShrink: 0,
                position: "fixed",
                right: 0,
                '& .MuiDrawer-paper': {
                    width: 500,
                    boxSizing: 'border-box',
                    marginTop: '64px',
                    marginBottom: '64px',
                    paddingRight: '8px',
                    position: 'fixed',
                    right: 0,
                    height: 'calc(100vh - 128px)'
                },
            }}
        >
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: '8px', marginBottom: '10px' }}>
                <IconButton onClick={handleWhenCloseRightSideBar} sx={{ borderRadius: 0 }}>
                    <MenuIcon />
                </IconButton>
            </Box>

            {selectedBookmark ? (
                <Box sx={{ padding: '16px' }}>
                    <Typography variant="h6" sx={{ marginBottom: '16px' }}>
                        Edit Bookmark
                    </Typography>

                    <TextField
                        label="Title"
                        fullWidth
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        sx={{ marginBottom: '8px' }}
                    />
                    <TextField
                        label="Notes"
                        fullWidth
                        multiline
                        rows={4}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        sx={{ marginBottom: '8px' }}
                    />
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, marginBottom: '8px' }}>
                        {tags.map((tag, index) => (
                            <Chip
                                key={index}
                                label={tag}
                                onDelete={() => handleTagDelete(tag)}
                                deleteIcon={<CloseIcon />}
                            />
                        ))}
                    </Box>
                    <TextField
                        label="Add Tag"
                        fullWidth
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyPress={handleTagKeyPress}
                        sx={{ marginBottom: '8px' }}
                    />
                    <Button variant="contained" onClick={handleSaveClick} sx={{ marginRight: '8px' }}>
                        Save
                    </Button>
                    <Button variant="contained" onClick={handleWhenCloseRightSideBar}>
                        Cancel
                    </Button>
                </Box>
            ) : (
                <Typography variant="body1" sx={{ padding: '16px' }}>
                    No bookmark selected.
                </Typography>
            )}
        </Drawer>
    );
};

export default RightSideBar;