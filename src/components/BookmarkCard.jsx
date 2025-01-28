import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, Grid, IconButton, Chip, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EditBookmarkModal from './EditBookmarkModal';
import { deleteBookmark, editBookmark } from '../features/bookmarks/bookmarksSlice';
import { selectFilteredBookmarks } from '../features/bookmarks/bookmarksSelectors';
import { useSelector, useDispatch } from 'react-redux';

const BookmarkCard = () => {
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedBookmark, setSelectedBookmark] = useState(null);

    // Use selectors to get the filtered bookmarks.
    const dispatch = useDispatch();
    const filteredBookmarks = useSelector(selectFilteredBookmarks);

    const handleSave = (updatedBookmark) => {
        dispatch(editBookmark({ updatedBookmark }));
        setEditModalOpen(false);
    };

    // Handle bookmark deletion by dispatching the deleteBookmark action
    const handleDeleteBookmark = (id) => {
        dispatch(deleteBookmark(id));
    };

    // Handle bookmark editing by dispatching the editBookmark action
    const handleEditBookmark = (updatedBookmark) => {
        setSelectedBookmark(updatedBookmark);
        setEditModalOpen(true);
    };

    return (
        <>
            <Grid container spacing={2} marginTop={1}>
                {filteredBookmarks.map((bookmark) => (
                    <Grid item xs={4} key={bookmark.id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5">{bookmark.title}</Typography>
                                <Typography variant="body2">Notes: {bookmark.notes}</Typography>
                                <Box sx={{ mt: 1 }}>
                                    {bookmark.tags.map((tag, index) => (
                                        <Chip key={index} label={tag.split("-")[1]} sx={{ mr: 1, mb: 1 }} />
                                    ))}
                                </Box>
                                <Box
                                    sx={{
                                        mt: 2,
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        target="_blank"
                                        href={bookmark.url}
                                        sx={{ mt: 1 }}
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
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
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