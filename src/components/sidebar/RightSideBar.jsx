import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Drawer, Box, Typography, Button, TextField, Chip, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { closeRightSideBar } from '../../features/sidebar/sidebarSlice';
import { updateBookmarkThunk } from '../../features/bookmarks/bookmarksSlice';

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
        dispatch(updateBookmarkThunk({ updatedBookmark }));
        handleWhenCloseRightSideBar();
    };

    const handleTagDelete = (tagToDelete) => {
        setTags(tags.filter(tag => tag !== tagToDelete));
    };

    const handleTagKeyPress = (e) => {
        if (e.key === 'Enter' && newTag.trim() !== '') {
            console.log(tags)
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
                width: 400,
                flexShrink: 0,
                position: "fixed",
                right: 0,
                '& .MuiDrawer-paper': {
                    width: 400,
                    boxSizing: 'border-box',
                    marginTop: '64px',
                    marginBottom: '64px',
                    paddingRight: '8px',
                    position: 'fixed',
                    right: 0,
                    height: 'calc(100vh - 64px)'
                },
            }}
        >
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', padding: '8px', marginBottom: '10px' }}>
                <IconButton onClick={handleWhenCloseRightSideBar} sx={{ borderRadius: 0 }}>
                    <CloseIcon />
                </IconButton>
            </Box>

            {selectedBookmark ? (
                <Box sx={{ padding: '16px' }}>
                    <Typography variant="h6" sx={{ marginBottom: '30px', textAlign: 'center', width: '100%' }}>
                        Edit Bookmark
                    </Typography>

                    <TextField
                        label="Title"
                        fullWidth
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        sx={{ marginBottom: '24px' }}
                    />
                    <TextField
                        label="Notes"
                        fullWidth
                        multiline
                        rows={4}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        sx={{ marginBottom: '24px' }}
                    />
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, marginBottom: '8px' }}>
                        {tags.map((tag, index) => (
                            <Chip
                                key={index}
                                label={tag}
                                onDelete={() => handleTagDelete(tag)}
                                deleteIcon={<CloseIcon />}
                                size="small"
                            />
                        ))}
                    </Box>
                    <TextField
                        label="Add Tag"
                        fullWidth
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyPress={handleTagKeyPress}
                        sx={{ marginBottom: '24px' }}
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
            ) : (
                <Typography variant="body1" sx={{ padding: '16px' }}>
                    No bookmark selected.
                </Typography>
            )}
        </Drawer>
    );
};

export default RightSideBar;