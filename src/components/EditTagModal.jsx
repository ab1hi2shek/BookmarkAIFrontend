import React, { useState } from 'react';
import { Modal, Box, TextField, Button, Typography } from '@mui/material';

const EditTagModal = ({ open, onClose, tag, onSave }) => {
    const [tagName, setTagName] = useState(tag);

    const handleSave = () => {
        onSave(tagName);
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
                    width: 400,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                }}
            >
                <Typography variant="h6">Edit Tag</Typography>
                <TextField
                    label="Tag Name"
                    fullWidth
                    value={tagName}
                    onChange={(e) => setTagName(e.target.value)}
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

export default EditTagModal;