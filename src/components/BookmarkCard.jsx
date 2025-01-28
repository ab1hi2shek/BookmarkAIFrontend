import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, IconButton, Chip, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EditBookmarkModal from './EditBookmarkModal';
import { deleteBookmark, editBookmark } from '../features/bookmarks/bookmarksSlice';
import { selectFilteredBookmarks } from '../features/bookmarks/bookmarksSelectors';
import { useSelector, useDispatch } from 'react-redux';

const BookmarkCard = () => {
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedBookmark, setSelectedBookmark] = useState(null);

    const dispatch = useDispatch();
    const filteredBookmarks = useSelector(selectFilteredBookmarks);

    const handleSave = (updatedBookmark) => {
        dispatch(editBookmark({ updatedBookmark }));
        setEditModalOpen(false);
    };

    const handleDeleteBookmark = (id) => {
        dispatch(deleteBookmark(id));
    };

    const handleEditBookmark = (updatedBookmark) => {
        setSelectedBookmark(updatedBookmark);
        setEditModalOpen(true);
    };

    return (
        <>
            {/* Masonry Layout */}
            <Box
                sx={{
                    columnCount: { xs: 1, sm: 2, md: 3 }, // Adjust number of columns based on screen size
                    columnGap: '16px',
                }}
            >
                {filteredBookmarks.map((bookmark) => (
                    <Card
                        key={bookmark.id}
                        sx={{
                            display: 'inline-block', // Ensures cards do not break column structure
                            width: '100%', // Full width within column
                            marginBottom: '16px', // Space between cards
                        }}
                    >
                        <CardContent>
                            <Typography variant="h5">{bookmark.title}</Typography>
                            <Typography variant="body2">Notes: {bookmark.notes}</Typography>
                            <Box sx={{ mt: 1 }}>
                                {bookmark.tags.map((tag, index) => (
                                    <Chip key={index} label={tag.split("-")[1]} sx={{ mr: 1, mb: 1 }} />
                                ))}
                            </Box>
                        </CardContent>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: 2,
                            }}
                        >
                            <Button
                                variant="contained"
                                color="primary"
                                target="_blank"
                                href={bookmark.url}
                            >
                                Visit
                            </Button>
                            <Box>
                                <IconButton onClick={() => handleEditBookmark(bookmark)}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton onClick={() => handleDeleteBookmark(bookmark.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </Box>
                        </Box>
                    </Card>
                ))}
            </Box>
            {selectedBookmark && (
                <EditBookmarkModal
                    open={editModalOpen}
                    onClose={() => setEditModalOpen(false)}
                    bookmark={selectedBookmark}
                    onSave={handleSave}
                />
            )}
        </>
    );
};

export default BookmarkCard;
