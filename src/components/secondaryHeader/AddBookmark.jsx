import React, { useState, useRef } from 'react';
import { Button, Tooltip, TextField, Box, ClickAwayListener } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import { createBookmarkThunk } from '../../redux/features/bookmarksSlice';

const AddBookmark = () => {
    const [openTooltip, setOpenTooltip] = useState(false);
    const [bookmarkUrl, setBookmarkUrl] = useState('');
    const dispatch = useDispatch();
    const inputRef = useRef(null);

    const { user } = useSelector((state) => state.user)

    const handleOpenTooltip = async () => {
        setOpenTooltip(true);

        try {
            // Read text from clipboard
            const clipboardText = await navigator.clipboard.readText();
            console.log("Clipboard content:", clipboardText);

            if (clipboardText.startsWith('http')) {
                setBookmarkUrl(clipboardText);
            }
        } catch (error) {
            console.error('Error reading clipboard:', error);
        }
    };

    const handleCloseTooltip = () => {
        setOpenTooltip(false);
        setBookmarkUrl('');
    };

    const handleAddBookmark = async () => {
        if (bookmarkUrl.trim()) {
            const newBookmark = {
                url: bookmarkUrl
            };

            // Dispatch Redux Thunk to save in API
            if (user?.uid) {
                dispatch(createBookmarkThunk({ userId: user.uid, bookmark: newBookmark })).then(() => {
                    handleCloseTooltip();
                });
            } else {
                console.log("error while createBookmarkThunk");
                handleCloseTooltip();
            }
        }
    };

    return (
        <ClickAwayListener onClickAway={handleCloseTooltip}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Tooltip
                    open={openTooltip}
                    title={
                        <Box
                            sx={{
                                padding: '20px',
                                width: '30vw',
                                maxWidth: '90vw',
                                border: '2px solid #dbc28f',
                                borderRadius: 1,
                                bgcolor: 'white',
                                position: 'absolute',
                                transform: 'translateX(-100%)'
                            }}
                        >
                            <TextField
                                inputRef={inputRef}
                                fullWidth
                                variant="outlined"
                                placeholder="Enter URL"
                                value={bookmarkUrl}
                                onChange={(e) => setBookmarkUrl(e.target.value)}
                                sx={{
                                    mb: 2,
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: '#dbc28f',
                                        },
                                    },
                                }}
                            />
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Button
                                    variant="contained"
                                    onClick={handleAddBookmark}
                                    sx={{
                                        backgroundColor: '#dbc28f',
                                        color: '#000',
                                        '&:hover': {
                                            backgroundColor: '#d4c4a3',
                                        },
                                    }}
                                >
                                    Save
                                </Button>
                            </Box>
                        </Box>
                    }
                    placement="bottom-end"
                    arrow
                >
                    <Button
                        variant="contained"
                        onClick={handleOpenTooltip}
                        sx={{
                            backgroundColor: '#dbc28f',
                            color: '#000',
                            '&:hover': {
                                backgroundColor: '#d4c4a3',
                            },
                        }}
                        startIcon={<AddIcon />}
                    >
                        Add
                    </Button>
                </Tooltip>
            </Box>
        </ClickAwayListener>
    );
};

export default AddBookmark;
