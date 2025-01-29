import React, { useState, useEffect } from 'react';
import { Modal, Box, TextField, Button, Chip, Typography } from '@mui/material';

const EditBookmarkModal = ({ open, onClose, bookmark, onSave }) => {
    const [title, setTitle] = useState('');
    const [notes, setNotes] = useState('');
    const [tags, setTags] = useState([]);

    // Sync state with the selectedTagForEdit prop
    useEffect(() => {
        if (bookmark) {
            setTitle(bookmark.title || '');
            setNotes(bookmark.notes || '');
            setTags(bookmark.tags ? bookmark.tags.join(', ') : [])
        }
    }, [bookmark]);

    const handleSave = () => {
        const updatedBookmark = {
            ...bookmark,
            title,
            notes,
            tags: tags.split(',').map((tag) => tag.trim()),
        };
        onSave(updatedBookmark);
        onClose();
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '60vw',
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                }}
            >
                <Typography variant="h5" textAlign="center">Edit Bookmark</Typography>
                <TextField
                    label="URL"
                    fullWidth
                    value={bookmark.url}
                    onChange={(e) => setTitle(e.target.value)}
                    sx={{ mt: 2 }}
                    disabled
                />
                <TextField
                    label="Title"
                    fullWidth
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    sx={{ mt: 2 }}
                />
                <TextField
                    label="Notes"
                    fullWidth
                    multiline
                    rows={6}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    sx={{ mt: 2 }}
                />
                <TextField
                    label="Tags (comma separated)"
                    fullWidth
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    sx={{ mt: 2 }}
                />
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button onClick={onClose} sx={{ mr: 1 }}>
                        Cancel
                    </Button>
                    <Button variant="contained" onClick={handleSave}>
                        Save
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default EditBookmarkModal;