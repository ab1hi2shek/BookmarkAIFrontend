import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, Grid, IconButton, Chip, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EditBookmarkModal from './EditBookmarkModal';

const BookmarkCard = ({ bookmarks, onDelete, onEdit }) => {
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedBookmark, setSelectedBookmark] = useState(null);

    const handleEditClick = (bookmark) => {
        setSelectedBookmark(bookmark);
        setEditModalOpen(true);
    };

    const handleSave = (updatedBookmark) => {
        onEdit(updatedBookmark);
        setEditModalOpen(false);
    };

    return (
        <>
            <Grid container spacing={2}>
                {bookmarks.map((bookmark) => (
                    <Grid item xs={4} key={bookmark.id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5">{bookmark.title}</Typography>
                                <Typography variant="body2">Notes: {bookmark.notes}</Typography>
                                <Box sx={{ mt: 1 }}>
                                    {bookmark.tags.map((tag, index) => (
                                        <Chip key={index} label={tag} sx={{ mr: 1, mb: 1 }} />
                                    ))}
                                </Box>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    target="_blank"
                                    href={bookmark.url}
                                    sx={{ mt: 1 }}
                                >
                                    Visit
                                </Button>
                                <IconButton onClick={() => handleEditClick(bookmark)}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton onClick={() => onDelete(bookmark.id)}>
                                    <DeleteIcon />
                                </IconButton>
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