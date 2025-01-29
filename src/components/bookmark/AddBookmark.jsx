import React, { useState, useRef } from 'react';
import { Button, Tooltip, TextField, Box, ClickAwayListener } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch } from 'react-redux';
import { addBookmark } from '../../features/bookmarks/bookmarksSlice';

const AddBookmark = () => {
    const [openTooltip, setOpenTooltip] = useState(false);
    const [bookmarkUrl, setBookmarkUrl] = useState('');
    const [bookmarkTitle, setBookmarkTitle] = useState('');
    const [bookmarkNotes, setBookmarkNotes] = useState('');
    const [bookmarkImageUrl, setBookmarkImageUrl] = useState('');
    const dispatch = useDispatch();
    const inputRef = useRef(null);

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
        setBookmarkTitle('');
        setBookmarkNotes('');
        setBookmarkImageUrl('');
    };

    // Function to fetch metadata from URL when Save is clicked
    const fetchMetadataFromURL = async (url) => {
        try {
            const new_url = `https://api.linkpreview.net/?key=7d823587f98544c9abe15244156b7a2a&q=${url}`;
            const response = await fetch(new_url);
            const data = await response.json();

            return {
                title: data.title || 'New Bookmark',
                notes: data.description || '',
                imageUrl: data.image || ''
            };
        } catch (error) {
            console.error('Error fetching metadata:', error);
            return {
                title: 'New Bookmark',
                notes: '',
                imageUrl: ''
            };
        }
    };

    const handleAddBookmark = async () => {
        if (bookmarkUrl.trim()) {
            const metadata = await fetchMetadataFromURL(bookmarkUrl);

            const newBookmark = {
                id: `bookmark-${Date.now()}`,
                title: metadata.title,
                url: bookmarkUrl,
                notes: metadata.notes,
                imageUrl: metadata.imageUrl,
                tags: []
            };

            dispatch(addBookmark(newBookmark));
            handleCloseTooltip();
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
