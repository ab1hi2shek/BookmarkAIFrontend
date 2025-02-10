import React from 'react';
import { Modal, Box, Button, Typography } from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

const DirectoryDeleteConfirmationModal = ({ open, onClose, onMove, onDelete, bookmarkCount }) => {
    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: '#1E1E1E',
                    p: 4,
                    width: 300,
                    borderRadius: '8px',
                    textAlign: 'center',
                    boxShadow: 24
                }}
            >
                <WarningAmberIcon sx={{ color: '#F1C40F', fontSize: '2rem', mb: 1 }} />
                <Typography variant="h6" sx={{ mb: 2, color: 'white' }}>Are you sure?</Typography>
                <Typography variant="h6" sx={{ mb: 2, color: 'white' }}>There are {bookmarkCount} bookmarks in this directory?</Typography>
                <Button onClick={onDelete} variant="contained" sx={{ bgcolor: 'rgba(177, 63, 71, 0.8)', width: '100%', mb: 1 }}>
                    Delete all bookmarks
                </Button>
                <Button onClick={onMove} variant="contained" sx={{ bgcolor: 'rgba(158, 126, 60, 0.8)', width: '100%', mb: 1 }}>
                    Move all bookmarks to Uncategorized
                </Button>
                <Button onClick={onClose} variant="outlined" sx={{ width: '100%', color: 'white', borderColor: '#444' }}>
                    Cancel
                </Button>
            </Box>
        </Modal>
    );
};

export default DirectoryDeleteConfirmationModal;
