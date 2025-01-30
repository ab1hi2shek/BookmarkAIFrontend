import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

const DeleteConfirmationModal = ({ open, onClose, onConfirm }) => {
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
                <Button onClick={onConfirm} variant="contained" sx={{ bgcolor: '#DFC58B', width: '100%', mb: 1 }}>
                    OK
                </Button>
                <Button onClick={onClose} variant="outlined" sx={{ width: '100%', color: 'white', borderColor: '#444' }}>
                    Cancel
                </Button>
            </Box>
        </Modal>
    );
};

export default DeleteConfirmationModal;
